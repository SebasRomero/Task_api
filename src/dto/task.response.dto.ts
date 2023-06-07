import { Task } from "src/schemas/task.schema";
import { CreateTaskDto } from "./create-task.dto";

export class TaskResponseDto extends CreateTaskDto {
    static mapToResponse(task: Task): TaskResponseDto{
        return {
            title: task.title,
            description: task.description,
            done: task.done
        }
    }
}