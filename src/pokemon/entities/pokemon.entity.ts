//https://docs.nestjs.com/techniques/mongodb

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() //Esto indica que es un esquema de bdd 
export class Pokemon extends Document {

    // id: string // Mongo me lo da
    //@Prop => Indica que es property
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );