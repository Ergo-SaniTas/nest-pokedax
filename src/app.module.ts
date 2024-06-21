import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import {EnvConfiguration} from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
    //Es una propiedad que acepta una lista de funciones que devuelven objetos de configuración.
      load: [EnvConfiguration],
      /*Asegura que varaible de entorno cumplan con ciertos criterios antes de que la aplicación 
      se inicie*/
      validationSchema : JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot(process.env.MONGO_DB,{
      dbName : 'pokemonsdb'
    }),  
    PokemonModule, CommonModule, SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
