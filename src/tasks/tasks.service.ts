import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTaskDto } from './dto/createTask.dto';
import { EditTaskDto } from './dto/editTask.dto';

@Injectable()
export class TasksService {
  constructor(private readonly httpService: HttpService) {}

  async getCredentials() {
    const data = {
      email: 'smithwills1989@gmail.com',
      password: '12345678',
    };

    const response = await lastValueFrom(
      this.httpService
        .post('https://stage.api.sloovi.com/login', data)
        .pipe(map((resp: any) => resp.data)),
    );

    return response;
  }

  async getUserDetails() {
    let cred = await this.getCredentials();

    const { company_id, token } = cred.results;

    if (!company_id) {
      throw new ForbiddenException('Access Denied.');
    }

    try {
      const requestConfig = {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const userDetails = await lastValueFrom(
        this.httpService
          .get(
            `https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`,
            requestConfig,
          )
          .pipe(map((resp: any) => resp.data)),
      );

      return userDetails;
    } catch (error) {
      console.log('err', error);
      return error;
    }
  }

  async createTask(dto: CreateTaskDto) {
    const payload = {
      assigned_user: dto.assigned_user,
      task_date: dto.task_date,
      task_time: +dto.task_time,
      is_completed: +dto.is_completed,
      time_zone: +dto.time_zone,
      task_msg: dto.task_msg,
    };

    let cred = await this.getCredentials();

    const { token, company_id } = cred.results;

    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const createTaskResponse = await lastValueFrom(
      this.httpService
        .post(
          `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
          payload,
          requestConfig,
        )
        .pipe(map((resp: any) => resp.data)),
    );

    return createTaskResponse;
  }

  async updateTask(taskId: string, dto: EditTaskDto) {
    const payload = {
      assigned_user: dto.assigned_user,
      task_date: dto.task_date,
      task_time: +dto.task_time,
      is_completed: +dto.is_completed,
      time_zone: +dto.time_zone,
      task_msg: dto.task_msg,
    };

    let cred = await this.getCredentials();

    const { token, company_id } = cred.results;

    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const editTaskResponse = await lastValueFrom(
      this.httpService
        .put(
          `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${company_id}`,
          payload,
          requestConfig,
        )
        .pipe(map((resp: any) => resp.data)),
    );

    return editTaskResponse;
  }

  async getTasks() {
    let cred = await this.getCredentials();

    const { token, company_id } = cred.results;

    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const getTasksResponse = await lastValueFrom(
      this.httpService
        .get(
          `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
          requestConfig,
        )
        .pipe(map((resp: any) => resp.data)),
    );

    return getTasksResponse;
  }

  async getTask(taskId: string) {
    let cred = await this.getCredentials();

    const { token, company_id } = cred.results;

    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const getTaskResponse = await lastValueFrom(
      this.httpService
        .get(
          `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${company_id}`,
          requestConfig,
        )
        .pipe(map((resp: any) => resp.data)),
    );

    return getTaskResponse;
  }

  async deleteTask(taskId: string) {
    let cred = await this.getCredentials();

    const { token, company_id } = cred.results;

    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const deleteTaskResponse = await lastValueFrom(
      this.httpService
        .delete(
          `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${company_id}`,
          requestConfig,
        )
        .pipe(map((resp: any) => resp.data)),
    );

    return deleteTaskResponse;
  }
}
