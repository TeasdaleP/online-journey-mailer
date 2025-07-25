import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { Mailer } from 'src/utilities/interface/mailer.interface';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/email.entities';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly emailService: EmailService
) {}

  async create(createContactDto: CreateContactDto): Promise<Record<string, any>> {
    const contact: Contact = new Contact();

    if(!createContactDto.email) {
      throw new BadRequestException(`The email you provided was ${createContactDto.email}`)
    }

    if(!createContactDto.telephone) {
      throw new BadRequestException(`The telephone you provided was ${createContactDto.telephone}`)
    }

    const recipent: Mailer = {
      recipent: 'pteasdale55@gmail.com',
      subject: `${createContactDto.firstname} has contacted you via the website.`,
      template: './contact',
      context: {
        firstname: createContactDto.firstname,
        lastname: createContactDto.lastname,
        email: createContactDto.email,
        telephone: createContactDto.telephone,
        message: createContactDto.message
      }
    }
    
    const emailRelay = await this.emailService.sendEmail(recipent);

    if (!emailRelay) {
      throw new InternalServerErrorException()
    }

    contact.firstname = createContactDto.firstname
    contact.lastname = createContactDto.lastname
    contact.email = createContactDto.email
    contact.telephone = createContactDto.telephone
    contact.message = createContactDto.message
    contact.notification = emailRelay

    return this.contactRepository.save(contact);
  }
}
