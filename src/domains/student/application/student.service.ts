import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { YesNo } from 'src/commons/enum/yes.no';
import { SchoolService } from 'src/domains/school/application/school.service';
import { SchoolEntity } from 'src/domains/school/domain/school.entity';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { DeleteStudentSchoolRequest } from '../domain/dto/delete.student.school.request';
import { StudentSchoolEntity } from '../domain/student.school.entity';
import { StudentSchoolRepository } from '../domain/student.school.repository';
import { PaginationRequest } from 'src/commons/dto/pagination.request';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentSchoolRepository: StudentSchoolRepository,
    private readonly schoolService: SchoolService,
  ) { }

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

      return MessageResponse.of('학교 구독에 성공했습니다.');
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

      return MessageResponse.of('학교 구독에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to update Subscribe to school: ${error}`);
    }
  }

  async deleteStudentSchool(request: DeleteStudentSchoolRequest): Promise<MessageResponse> {
    const schoolStudent = await this.getStudentSchool(request.studentId, request.schoolId);

    if (schoolStudent?.isActive === YesNo.NO)
      throw new BadRequestException('해당 학교는 이미 구독 취소 상태입니다.');

    try {
      const result = await this.studentSchoolRepository.deleteStudentSchool(
        request.studentId,
        request.schoolId,
      );

      if (result.affected === 0) {
        throw new BadRequestException(`Student-School was not successfully deleted`);
      }

      return MessageResponse.of('학교 구독 취소에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to delete Student-School: ${error}`);
    }
  }

  async getSubscribeSchools(
    studentId: number,
    request: PaginationRequest,
  ): Promise<SchoolEntity[]> {
    return await this.schoolService.getSubscribeSchools(studentId, request);
  }
}
