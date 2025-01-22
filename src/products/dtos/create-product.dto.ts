import { IsString, IsPositive, IsUrl, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category: string;
  
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsUrl()
  image?: string;
}