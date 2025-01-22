import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/auth/dtos/signup.dto";


@Schema()
export class User extends Document {
    @Prop({ required: false})
    name: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop({ required: true, enum: Role, immutable: true})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);