import { IsString, IsNotEmpty } from 'class-validator';

export class registerDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
