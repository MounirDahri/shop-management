import { IsEmail, IsString } from 'class-validator';

export class AuthenticatedDto {
    @IsString()
    accesToken: string;
}