import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createSchoolRequest {
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
