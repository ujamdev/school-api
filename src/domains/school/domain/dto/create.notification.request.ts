import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationRequest {
  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  registerId: number;
}
