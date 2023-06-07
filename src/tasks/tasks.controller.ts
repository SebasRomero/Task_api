import { Controller, Get, Post, Delete, Put, Param, Query, Body, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { CreateTaskResponse } from './response/create-task.response';
import { ListTaskResponse } from './response/list-task.response';
import { TaskResponseDto } from 'src/dto/task.response.dto';
import { GetTaskResponse } from './response/get-task.response';
import { UpdateTaskResponse } from './response/update-task.response';
import { DeleteTaskResponse } from './response/delete-task.response';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    async findAllTasks(): Promise<ListTaskResponse>{
        return {
            statusCode: HttpStatus.OK,
            message: 'Tasks obtained succesfully',
            data: await this.taskService.findAll()
        }
    }

    @Get(':id')
    async findOneTask(@Param('id')id:string): Promise<GetTaskResponse>{
        return {
            statusCode: HttpStatus.OK,
            message: 'Task obtained succesfully',
            data: await this.taskService.findOne(id)
        }
    }

    @Post()
    async createTask(@Body() body: CreateTaskDto): Promise<CreateTaskResponse>{
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Task created succesfully',
            data: await this.taskService.create(body)
        }
    }

    @Put(':id')
    async updateTask(@Param('id')id:string, @Body() body: UpdateTaskDto): Promise<UpdateTaskResponse>{
        return {
            statusCode: HttpStatus.OK,
            message: 'Task updated succesfully',
            data: await this.taskService.update(id, body)
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id:string): Promise<DeleteTaskResponse>{
        this.taskService.delete(id)
        return {
            statusCode: HttpStatus.OK,
            message: 'Task succesfully deleted.',
            data: id
        }
    }
}
