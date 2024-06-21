import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import {CreatePokemonDto,UpdatePokemonDto} from './dto/';
import {PaginationDto} from 'src/common/dto/pagination.dto';
import {ParseMongoIdPipe} from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
 // @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':arg')
  findOne(@Param('arg') arg: string) {
    return this.pokemonService.findOne(arg);
  }

  @Patch(':arg')
  update(@Param('arg') arg: string, @Body() updatePokemonDto: UpdatePokemonDto) {

    return this.pokemonService.update(arg, updatePokemonDto);
  }

  @Delete('all/:arg')
  removeAll(@Param('arg') arg: string) {
    return this.pokemonService.removeAll(arg);
  }
  @Delete(':id')
  removeId(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.removeId(id);
  }
}
