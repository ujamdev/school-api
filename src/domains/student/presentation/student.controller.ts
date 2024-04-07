import { Controller, Param, Post } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { StudentService } from '../application/student.service';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';

@Controller('api')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  /**
   * 학생이 학교 구독
   * @param {CreateStudentSchoolRequest} param
   * @return {Promise<MessageResponse>}
   */
  @Post('/students/:studentId/schools/:schoolId')
  async createStudentSchool(@Param() param: CreateStudentSchoolRequest): Promise<MessageResponse> {
    return await this.studentService.createStudentSchool(param);
  }
}
