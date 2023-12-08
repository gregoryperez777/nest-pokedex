import { IsNumber, IsOptional, isPositive, IsPositive, Min, validate } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;
}