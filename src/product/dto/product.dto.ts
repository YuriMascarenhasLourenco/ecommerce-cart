import { IsNumber, IsString } from 'class-validator';

export class productDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  stock: number;
}
