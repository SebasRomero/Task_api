import { HttpStatus } from "@nestjs/common";
import { TaskResponseDto } from "src/dto/task.response.dto";
import { IGeneralResponse } from "src/responses/general.response";

export class GetTaskResponse implements IGeneralResponse<TaskResponseDto>{
    statusCode: HttpStatus;
    message: string;
    data: TaskResponseDto;
}