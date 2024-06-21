import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {AxiosInstance} from 'axios';
import { PokemonResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeApiAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  private  readonly  axios: AxiosInstance = axios;
  private apiPokeApi: string;

  constructor ( 
    private readonly configService: ConfigService,
    @InjectModel(Pokemon.name)
      private readonly pokemonModel:Model <Pokemon>,
      private readonly pokeApiAdapter : PokeApiAdapter  ) {
        this.apiPokeApi = configService.get<string>('apiPokeApi') ;
    // console.log({ defaultLimit: configService.get<number>('defaultLimit') })
      }

  async executeSeed() {

    //Delete * from pokemones
    await this.pokemonModel.deleteMany({});


    //Obtiene los datos de la api Axios Adapter
    const data  = await this.pokeApiAdapter
      .get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
    
      //arregloe de pokemon
    const addPokemonArr :{name:string; no:number}[] = [];

    data.results.forEach( async ({name,url}) => {
      const sagments = url.split('/');
      const no:number = +sagments[sagments.length - 2];
      //Almacena los valores en el arreglo
      addPokemonArr.push({name,no});
    });
    //Realiza un insercion multiple 
    await this.pokemonModel.insertMany(addPokemonArr);
    
    
    /********************************* OPCION ALTRNATIVA ************************************ 
    //arregloe que almecenara las promesas
    const addPromisesArr = [];
    data.results.forEach( async ({name,url}) => {
      const sagments = url.split('/');
      const no:number = +sagments[sagments.length - 2];
      //Almacena todas las promesas en el arreglo para despues ser ejecutadas simultanea
      addPromisesArr.push(await this.pokemonModel.create({name,no}));
    });
    //Resuelve toda la promesa y realiza la insercion a la bdd
    await Promise.all(addPromisesArr);
    ***********************************************************************************/


   return 'Seed Execute Seed OK, Revisar table:Pokemos'
  }
 
}
