import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // OJO esto hace referencia al nombre de la clase que extiende de document no a la property name dentro del schema
        schema: PokemonSchema // Este es el nombre de la variable que se exporta
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
