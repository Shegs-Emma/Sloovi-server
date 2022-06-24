import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsOptional()
  assigned_user: string;

  @IsOptional()
  @IsString()
  task_date: string;

  // @IsNotEmpty()
  // @IsNumber()
  // task_time: number;
  @IsOptional()
  @IsString()
  task_time: string;

  // @IsNotEmpty()
  // @IsNumber()
  // isCompleted: number;
  @IsOptional()
  @IsString()
  is_completed: string;

  // @IsNotEmpty()
  // @IsNumber()
  // time_zone: number;
  @IsOptional()
  @IsString()
  time_zone: string;

  @IsOptional()
  @IsString()
  task_msg: string;
}
