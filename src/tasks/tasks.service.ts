import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Task} from '../schemas/task.schema'
import { Model } from 'mongoose';
import { ICreateTaskDto } from 'src/dto/create-task.dto';
import { IUpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}


    findAll(): Promise<Task[]> {
        return this.taskModel.find();
    }

    create(createTask: ICreateTaskDto) {
        new this.taskModel(createTask).save
    }

    async findOne(id: string) {
        return this.taskModel.findById(id)
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id)
    }
    
    async update(id: string, task: IUpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id)
    }

}
