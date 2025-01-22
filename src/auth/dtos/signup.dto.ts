import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsEnum } from 'class-validator';

export enum Role {
    CLIENT= 'client',
    OWNER= 'owner'
}
export class SignupDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {message: 'Password must have a minimum length of 8 with at least a symbol, upper and lower case letters and a number'})
  password: string;

  @IsEnum(Role)
  role: string
}
