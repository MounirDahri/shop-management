import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class ValidatedDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  role?: string;
  
}