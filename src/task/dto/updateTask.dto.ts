import { IsString, IsNotEmpty } from 'class-validator';

export class updateTaskDTO {
  @IsNotEmpty()
  @IsString()
  newTitle: string;
}
