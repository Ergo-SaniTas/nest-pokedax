import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {
   
   @IsOptional()
   @IsPositive({message :'El valor debe ser positivo'})
   @Min(1,{message :'No Cumple con minimo Permitido'})
    limit?: number;

    @IsOptional()
    @IsPositive()
    offset?: number;
   
}