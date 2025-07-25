import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Online Journey Mailer Service')
  .setDescription('The Mail service ')
  .setVersion('1.0')
  .addServer(`http://localhost:${process.env.APP_PORT}`, 'Local Environment')
  .build()

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('', app, document);

app.enableCors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});

app.enableVersioning({
  type: VersioningType.URI
})

  await app.listen(parseInt(process.env.APP_PORT as string));
}
bootstrap();
