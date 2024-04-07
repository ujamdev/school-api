import { Controller, Delete, Param, Post } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { StudentService } from '../application/student.service';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { DeleteStudentSchoolRequest } from '../domain/dto/delete.student.school.request';

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

  /**
   * 학생이 구독중인 학교 구독 취소
   * @param {DeleteStudentSchoolRequest} param
   * @return {Promise<MessageResponse>}
   */
  @Delete('/students/:studentId/schools/:schoolId')
  async deleteStudentSchool(@Param() param: DeleteStudentSchoolRequest): Promise<MessageResponse> {
    return await this.studentService.deleteStudentSchool(param);
  }
}
