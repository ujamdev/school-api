import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSchoolNotificationsRequest {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;
}
