import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { Email } from './email/email.entities';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',  
        port: Number(587),  
        secure: false,  
        auth: {  
          user: '931dec001@smtp-brevo.com',  
          pass: 'nGZX4Dx7bW80YmUF',  
        },  
      },
      defaults: {
        from: '"Phil Teasdale" <phil.teasdale@outlook.com>',  
      },
      template: {
        dir: join(__dirname, 'email/templates'),  
        adapter: new EjsAdapter(),  
        options: {  
          strict: true,  
        },  
      }
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string),
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [Contact, Email],
      database: process.env.DATABASE_TABLE,
      synchronize: true,
      logging: true,
    }),
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
