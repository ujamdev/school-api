import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentSchoolRequest {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;
}
