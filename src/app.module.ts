// Importaciones de Node
import { join } from 'path';

// Importaciones de Nestjs
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

// Importaciones de nuestro proyecto
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // Importante el orden si importa por eso colocar de primero
    // basicamente esto lee las variables de entorno y las agrega a
    // process.env

    // load y validationSchema pueden trabajar juntos
    // load hace conversiones y mapeos
    // validationSchema realiza validaciones y crea variables de entornos con valores por defectos
    // para que cuando lleguen al archivo EnvConfiguration ya se encuentre un valor 
    // en la variable de entorno
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    // aqui usamos proccess.env.MONGODB
    // porque no podemos inyectar dependecias 
    // dentro de este imports (o por lo menos eso es lo que entendi)

    /**
     * NOTA: 
     *  - Dentro de los building blocks (guards, interceptors, pipes, controllers, decoradores, services, exceptions filters, ... ver pdf) podemos usar ConfigService para obtener las variables de entornos 
     *  - Fuera de los building blocks podemos tomar las variables de entornos del proccess.env
     **/
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb'
    }),
    
    PokemonModule,
    
    CommonModule,
    
    SeedModule,

  ],
})
export class AppModule {}
