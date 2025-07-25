import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
    /** this is where you will need to add the email service */
) {}

  async create(createContactDto: CreateContactDto): Promise<Record<string, any>> {
    const contact: Contact = new Contact();

    if(!createContactDto.email) {
      throw new BadRequestException(`The email you provided was ${createContactDto.email}`)
    }

    if(!createContactDto.telephone) {
      throw new BadRequestException(`The telephone you provided was ${createContactDto.telephone}`)
    }

    /** this is where you need to call the relay service to send message */
    const relay = true;

    if (!relay) {
      throw new InternalServerErrorException()
    }

    contact.firstname = createContactDto.firstname
    contact.lastname = createContactDto.lastname
    contact.email = createContactDto.email
    contact.telephone = createContactDto.telephone
    contact.message = createContactDto.message

    return this.contactRepository.save(contact);
  }
}
