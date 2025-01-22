import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class File extends Document {
    @Prop({ required: true})
    uuid: string;

    @Prop({ required: true})
    url: string;

}

export const FileScehma = SchemaFactory.createForClass(File);