import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTaskDTO, updateTaskDTO } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDTO: createTaskDTO, userId: string) {
    const { title } = createTaskDTO;
    return this.prisma.task.create({
      data: {
        title,
        user: { connect: { id: userId } },
      },
    });
  }

  async getTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async updateTask(taskId: string, updateTaskDTO: updateTaskDTO) {
    const { newTitle } = updateTaskDTO;
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: newTitle,
      },
    });
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
