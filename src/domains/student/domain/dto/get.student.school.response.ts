import { YesNo } from 'src/commons/enum/yes.no';

export class GetStudentSchoolResponse {
  id: number;
  studentId: number;
  schoolId: number;
  isActive: YesNo;
  createdAt: Date;
  updatedAt: Date;
}
