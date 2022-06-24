import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  assigned_user: string;

  @IsNotEmpty()
  @IsString()
  task_date: string;

  // @IsNotEmpty()
  // @IsNumber()
  // task_time: number;
  @IsNotEmpty()
  @IsString()
  task_time: string;

  // @IsNotEmpty()
  // @IsNumber()
  // isCompleted: number;
  @IsNotEmpty()
  @IsString()
  is_completed: string;

  // @IsNotEmpty()
  // @IsNumber()
  // time_zone: number;
  @IsNotEmpty()
  @IsString()
  time_zone: string;

  @IsNotEmpty()
  @IsString()
  task_msg: string;
}
