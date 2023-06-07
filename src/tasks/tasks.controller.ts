import { Controller, Get, Post, Delete, Put, Param, Query, Body, HttpStatus, ConflictException, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { CreateTaskResponse } from './response/create-task.response';
import { ListTaskResponse } from './response/list-task.response';
import { TaskResponseDto } from 'src/dto/task.response.dto';
import { GetTaskResponse } from './response/get-task.response';
import { UpdateTaskResponse } from './response/update-task.response';
import { DeleteTaskResponse } from './response/delete-task.response';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
        const task = await this.taskService.findOne(id)
        if (!task) throw new NotFoundException('Task not found')
        return {
            statusCode: HttpStatus.OK,
            message: 'Task obtained succesfully',
            data: task
        }
    }

    @Post()
    async createTask(@Body() body: CreateTaskDto): Promise<CreateTaskResponse>{
        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Task created succesfully',
                data: await this.taskService.create(body)
            }
        } catch (error) {
            if (error.code === 11000){
                throw new ConflictException('Task already exist')
            }
            throw new error
        }
    }

    @Put(':id')
    async updateTask(@Param('id')id:string, @Body() body: UpdateTaskDto): Promise<UpdateTaskResponse>{
        const updatedTask = await this.taskService.update(id, body)
        if (!updatedTask) throw new NotFoundException('Task not found')
        return {
            statusCode: HttpStatus.OK,
            message: 'Task updated succesfully',
            data: updatedTask
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id:string): Promise<DeleteTaskResponse>{
        if (id.length != 24) throw new NotFoundException('The id must have a specific lenght.')
        const task = await this.taskService.delete(id)
        if (!task) throw new NotFoundException('Task not found')

        return {
            statusCode: HttpStatus.OK,
            message: 'Task succesfully deleted.',
            data: id
        }
    }
}
