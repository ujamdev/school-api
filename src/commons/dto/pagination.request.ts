import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationRequest {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  perPage: number;
}
