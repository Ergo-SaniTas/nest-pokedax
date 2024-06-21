import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  private defaultLimit: number;

constructor ( 
  private readonly configService: ConfigService,
  @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model <Pokemon> ) {
      this.defaultLimit = configService.get<number>('defaultLimit');
    }

  async findAll(paginationDto : PaginationDto) {

    const {limit = this.defaultLimit, offset = 0} = paginationDto;
    
    return this.pokemonModel.find()
     .limit(limit)
     .skip(offset)
     .sort({ no : 1})
     .select('-__v');  
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try{
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemonDb = await this.pokemonModel.create(createPokemonDto);
      return pokemonDb;
    }
    catch(error){
      this.handleExceptions(error);
    }
  }

  async findOne(arg: string) {
    let pokemon:Pokemon;

      /*
        *Si logra convertirlo a n°, lo busca
        +arg : lo convierte en numero en ese momento, en este caso solo para la validacion
      */
      if ( !isNaN(+arg))
          pokemon = await this.pokemonModel.findOne({no:arg});
      
      //Valida y busca por el campo MongoId
      if (!pokemon && isValidObjectId(arg))
          pokemon = await this.pokemonModel.findById(arg);

      //Busca por Nombre
      if (!pokemon)
          pokemon = await this.pokemonModel.findOne({ name: arg.toLocaleLowerCase().trim()});

      //Nombre
      if (!pokemon)
          throw new NotFoundException(`Pokemon with id, name or no ${arg} not found`);

      return pokemon;
      

  }

  async update(arg: string, updatePokemonDto: UpdatePokemonDto) {

    //Valida si existe pokemon
    const pokemon:Pokemon = await this.findOne(arg);

    //Comvierte mayuscula
    updatePokemonDto.name? updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim() : null;

    try{
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(),...updatePokemonDto};
    }
    catch(err ){
      this.handleExceptions(err);
    }
  }

  async removeAll(arg: string) {
    const Pokemon = await this.findOne(arg);
    await Pokemon.deleteOne();
    return arg;
  }
  async removeId(id: string) {
    
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({_id : id});

    if(deletedCount === 0)
        throw new BadRequestException(`Pokemon with id ${ id } not found`);

    return id;
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
