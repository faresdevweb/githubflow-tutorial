import { Body, Controller, Post, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDTO } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post('/createTask')
  async createTask(@Body() createTaskDTO: createTaskDTO, @Req() req: any) {
    return this.taskService.createTask(createTaskDTO, req.user.id);
  }
}
