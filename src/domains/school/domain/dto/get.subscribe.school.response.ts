export class GetSubscribeSchoolResponse {
  id: number;
  name: string;
  studentSchool: StudentSchool[];
}

class StudentSchool {
  studentId: number;
  createdAt: Date;
}
