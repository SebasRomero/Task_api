import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Task} from '../schemas/task.schema'
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskResponseDto } from 'src/dto/task.response.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    findAll(): Promise<Task[]> {
        return this.taskModel.find();
    }

    async create(createTask: CreateTaskDto): Promise<TaskResponseDto> {
        const newTask = new this.taskModel(createTask)
        await newTask.save()
        return TaskResponseDto.mapToResponse(newTask)
    }

    async findOne(id: string): Promise<TaskResponseDto> {
        return this.taskModel.findById(id)
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id)
    }
    
    async update(id: string, task: UpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, task, {new: true})
    }

}
