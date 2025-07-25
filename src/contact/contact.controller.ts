import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiGatewayTimeoutResponse } from '@nestjs/swagger';
import { HttpOkDesc, HttpBadRequestDesc, HttpTimeoutDesc } from 'src/utilities/constants/response-descriptions';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ description: 'This POST request for submitting the Contact form via the website'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
}
