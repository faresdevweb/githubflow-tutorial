import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class createTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsBoolean()
  readonly completed: boolean;
}
