import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import {PokemonModule} from 'src/pokemon/pokemon.module';
import {CommonModule} from  'src/common/common.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService,ConfigModule],
  imports: [
    ConfigModule,
    PokemonModule,
    CommonModule]
})
export class SeedModule {}
