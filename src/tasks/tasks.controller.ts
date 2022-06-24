import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUserDetails() {
    return this.tasksService.getUserDetails();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTask(@Param('id') taskId: string) {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  updateTask(@Param('id') taskId: string, @Body() dto: EditTaskDto) {
    return this.tasksService.updateTask(taskId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
