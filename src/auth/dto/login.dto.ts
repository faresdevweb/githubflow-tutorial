import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class loginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
