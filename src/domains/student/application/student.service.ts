import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CachingService } from '../../../commons/caching/caching.service';
import { MessageResponse } from '../../../commons/dto/message.response';
import { PaginationRequest } from '../../../commons/dto/pagination.request';
import { YesNo } from '../../../commons/enum/yes.no';
import { SchoolService } from '../../school/application/school.service';
import { GetNotificationResponse } from '../../school/domain/dto/get.notification.response';
import { GetSubscribeSchoolResponse } from '../../school/domain/dto/get.subscribe.school.response';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { DeleteStudentSchoolRequest } from '../domain/dto/delete.student.school.request';
import { GetSchoolNotificationsRequest } from '../domain/dto/get.school.notifications.request';
import { GetStudentSchoolResponse } from '../domain/dto/get.student.school.response';
import { StudentSchoolRepository } from '../domain/student.school.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentSchoolRepository: StudentSchoolRepository,
    private readonly schoolService: SchoolService,
    private readonly cachingService: CachingService,
  ) { }

  async getStudentSchool(studentId: number, schoolId: number): Promise<GetStudentSchoolResponse> {
    return await this.studentSchoolRepository.getStudentSchool(studentId, schoolId);
  }

  async createStudentSchool(request: CreateStudentSchoolRequest): Promise<MessageResponse> {
    const studentSchool = await this.getStudentSchool(request.studentId, request.schoolId);

    if (studentSchool?.isActive === YesNo.YES)
      throw new BadRequestException('The school is already subscribed.');

    if (studentSchool)
      return await this.updateSubscribeToSchool(request.studentId, request.schoolId);

    try {
      const result = await this.studentSchoolRepository.createStudentSchool(request);

      if (result.raw.affectedRows === 0)
        throw new BadRequestException(`School subscribe was not successfully created`);

      return MessageResponse.of('학교 구독에 성공했습니다.');
    } catch (error) {
      if (error instanceof BadRequestException) throw new BadRequestException(error);

      throw new InternalServerErrorException(`Failed to create school subscribe: ${error}`);
    }
  }

  async updateSubscribeToSchool(studentId: number, schoolId: number): Promise<MessageResponse> {
    try {
      const result = await this.studentSchoolRepository.updateSubscribeToSchool(
        studentId,
        schoolId,
      );

      if (result.affected === 0)
        throw new BadRequestException(`Subscribe to school was not successfully updated`);

      return MessageResponse.of('학교 구독에 성공했습니다.');
    } catch (error) {
      if (error instanceof BadRequestException) throw new BadRequestException(error);

      throw new InternalServerErrorException(`Failed to update Subscribe to school: ${error}`);
    }
  }

  async deleteStudentSchool(request: DeleteStudentSchoolRequest): Promise<MessageResponse> {
    const schoolStudent = await this.getStudentSchool(request.studentId, request.schoolId);

    if (schoolStudent?.isActive === YesNo.NO)
      throw new BadRequestException('The school has already unsubscribed.');

    try {
      const result = await this.studentSchoolRepository.deleteStudentSchool(
        request.studentId,
        request.schoolId,
      );

      if (result.affected === 0)
        throw new BadRequestException(`Student-School was not successfully deleted`);

      return MessageResponse.of('학교 구독 취소에 성공했습니다.');
    } catch (error) {
      if (error instanceof BadRequestException) throw new BadRequestException(error);

      throw new InternalServerErrorException(`Failed to delete Student-School: ${error}`);
    }
  }

  async getSubscribeSchools(
    studentId: number,
    request: PaginationRequest,
  ): Promise<GetSubscribeSchoolResponse[]> {
    return await this.schoolService.getSubscribeSchools(studentId, request);
  }

  async getSchoolNotifications(
    param: GetSchoolNotificationsRequest,
    request: PaginationRequest,
  ): Promise<GetNotificationResponse[]> {
    const cacheKey = `student:${param.studentId}:school:${param.schoolId}:notifications:page:${request.page}`;
    const cacheValue: GetNotificationResponse[] = await this.cachingService.get(cacheKey);

    if (cacheValue) return cacheValue;

    const notifications = await this.schoolService.getSchoolNotifications(param, request);

    await this.cachingService.set(cacheKey, notifications);

    return notifications;
  }

  async getSchoolsNotifications(
    studentId: number,
    request: PaginationRequest,
  ): Promise<GetNotificationResponse[]> {
    const cacheKey = `student:${studentId}:notifications:page:${request.page}`;
    const cacheValue: GetNotificationResponse[] = await this.cachingService.get(cacheKey);

    if (cacheValue) return cacheValue;

    const notifications = await this.schoolService.getSchoolsNotifications(studentId, request);

    await this.cachingService.set(cacheKey, notifications);

    return notifications;
  }
}
