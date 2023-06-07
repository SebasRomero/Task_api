import { Controller, Get, Post, Delete, Put, Param, Query, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    findAllTasks(){
        return this.taskService.findAll()
    }

    @Get(':id')
    findOneTask(){
        return 'Get one task'
    }

    @Post()
    createTask(@Body() body: CreateTaskDto){
        console.log("Hola")
        return this.taskService.create(body)
    }

    @Put(':id')
    updateTask(){
        return 'Task updated'
    }
}
