import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { YesNo } from 'src/commons/enum/yes.no';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { StudentSchoolEntity } from '../domain/student.school.entity';
import { StudentSchoolRepository } from '../domain/student.school.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentSchoolRepository: StudentSchoolRepository) { }

  async getStudentSchool(studentId: number, schoolId: number): Promise<StudentSchoolEntity> {
    return await this.studentSchoolRepository.getStudentSchool(studentId, schoolId);
  }

  async createStudentSchool(request: CreateStudentSchoolRequest): Promise<MessageResponse> {
    const studentSchool = await this.getStudentSchool(request.studentId, request.schoolId);

    if (studentSchool?.isActive === YesNo.YES)
      throw new BadRequestException('해당 학교는 이미 구독이 되어있습니다.');

    if (studentSchool)
      return await this.updateSubscribeToSchool(request.studentId, request.schoolId);

    try {
      const result = await this.studentSchoolRepository.createStudentSchool(request);

      if (result.raw.affectedRows === 0) {
        throw new BadRequestException(`School subscribe was not successfully created`);
      }

      return MessageResponse.of('학생이 학교 구독에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to create school subscribe: ${error}`);
    }
  }

  async updateSubscribeToSchool(studentId: number, schoolId: number): Promise<MessageResponse> {
    try {
      const result = await this.studentSchoolRepository.updateSubscribeToSchool(
        studentId,
        schoolId,
      );

      if (result.affected === 0) {
        throw new BadRequestException(`Subscribe to school was not successfully updated`);
      }

      return MessageResponse.of('학생이 학교 구독에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to update Subscribe to school: ${error}`);
    }
  }
}
