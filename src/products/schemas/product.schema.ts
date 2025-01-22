import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Product extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    category: string;
    
    @Prop({ required: true})
    price: number;

    @Prop({ required: false})
    image?: string;

}

export const ProductScehma = SchemaFactory.createForClass(Product);