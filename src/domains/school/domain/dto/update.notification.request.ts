import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotificationRequest {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  modifierId: number;
}
