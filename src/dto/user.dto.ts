import { IsEmail, IsNumber, IsString } from 'class-validator';

export class userDto {
  @IsNumber()
  userId: number;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
