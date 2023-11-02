import { IsString, IsNotEmpty } from 'class-validator';

export class createTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
