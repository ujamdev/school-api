import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteStudentSchoolRequest {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;
}
