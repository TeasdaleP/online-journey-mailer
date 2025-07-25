import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Email } from "src/email/email.entities";
import { Mailer } from "src/utilities/interface/mailer.interface";
import { DataSource } from "typeorm";

@Injectable()
export class EmailService {
    
    constructor(
        private mailer: MailerService,
        @InjectDataSource() private database: DataSource
    ) {}

    async sendEmail(mailer: Mailer) {
        const email: Email = new Email()
        
        const send = await this.mailer.sendMail({ to: mailer.recipent, subject: mailer.subject, template: mailer.template, context: mailer.context })

        if (!send) {
            throw new InternalServerErrorException()
        }

        email.recipent = mailer.recipent,
        email.subject = mailer.subject,
        email.template = mailer.template
        email.context = mailer.context,
        email.response = send

        return this.database.getRepository(Email).save(email);
    }
}