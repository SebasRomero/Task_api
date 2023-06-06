import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Task} from '../schemas/task.schema'
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}


    findAll(): Promise<Task[]> {
        return this.taskModel.find();
    }

    create(createTask: any) {
        new this.taskModel(createTask).save
    }
}
