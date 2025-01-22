import { IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsString()
  uuid: string;

  @IsUrl()
  url: string;
}