import { HttpStatus } from "@nestjs/common";


export interface IGeneralResponse<T> {
    statusCode: HttpStatus
    message: string
    data: T
}