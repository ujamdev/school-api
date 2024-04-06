import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSchoolRequest {
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
