import { Module } from '@nestjs/common';
import {PokeApiAdapter} from './adapters/axios.adapter';


@Module({
    providers: [PokeApiAdapter],
    exports: [PokeApiAdapter],
})
export class CommonModule {}
