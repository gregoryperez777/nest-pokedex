/**
 *  Las entidades hacen referencias exactas de la forma en la que 
 *  queremos guardar en la DB 
 * 
 *  Es decir aqui se define la estructura de la tabla o collection
 *  que queremos crear. Ademas se recomienda que las entidades siempre
 *  sean clases ya que con esto podemos implementar validaciones para 
 *  logica de negocios
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
    // id: string // Mongo lo da que es el mongoID

    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
