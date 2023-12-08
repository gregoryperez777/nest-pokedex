import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=650');

    // FORMA 1 DE insertar muchos registros 
    // Aqui se espera insertar cada registro por iteracción 
    // Esto es muy ineficiente para cuando haya muchos registros

    // data.results.forEach( async ({ name, url }) => {
      
    //   const segments = url.split('/');
    //   const no: number = +segments[ segments.length - 2 ];

    //   const result = await this.pokemonModel.create({ name, no });
    // });

    // FORMA 2 DE insertar muchos registros
    // Aqui creamos un array que contendra las promesas de creacion de registro
    // una vez ejecutado todo el forEach llamamos a Promise.all
    // que realizara las inserciones en simultaneo
    // const insertPromiseArray = [];

    // data.results.forEach( async ({ name, url }) => {
    //   const segments = url.split('/');
    //   const no: number = +segments[ segments.length - 2 ];
      
    //   insertPromiseArray.push(this.pokemonModel.create({ name, no }))
    // });

    // await Promise.all(insertPromiseArray);

    // FORMA 3 DE insertar muchos registros
    // usando insertMany

    const pokemonToInsert: { name: string, no: number }[] = [];
    data.results.forEach( ({ name, url }) => {
      
      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
