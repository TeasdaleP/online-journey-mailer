import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty({ title: 'firstname', type: 'string', description: 'The customers firstname' })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({ title: 'lastname', type: 'string', description: 'The customers lastname' })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({ title: 'email', type: 'string', description: 'The customers email address' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ title: 'telephone', type: 'string', description: 'The customers phone number' })
    @IsNotEmpty()
    @IsString()
    telephone: string;

    @ApiProperty({ title: 'message', type: 'string', description: 'The customers contact you message' })
    @IsNotEmpty()
    @IsString()
    message: string;
}
