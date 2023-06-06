import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"


@Schema({
    timestamps: true
})

class Task {
    @Prop({unique: true, required: true, trim: true})
    title: string;
    @Prop({trim: true})
    description: string;
    @Prop({default:false})
    done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task)