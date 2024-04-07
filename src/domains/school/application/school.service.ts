import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { GetStudentSchoolsRequest } from 'src/domains/student/domain/dto/get.student.schools.request';
import { CreateNotificationRequest } from '../domain/dto/create.notification.request';
import { CreateSchoolRequest } from '../domain/dto/create.school.request';
import { UpdateNotificationRequest } from '../domain/dto/update.notification.request';
import { NotificationRepository } from '../domain/notification.repository';
import { SchoolEntity } from '../domain/school.entity';
import { SchoolRepository } from '../domain/school.repository';

@Injectable()
export class SchoolService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly notificationRepository: NotificationRepository,
  ) { }

  async createSchool(request: CreateSchoolRequest): Promise<MessageResponse> {
    try {
      const result = await this.schoolRepository.createSchool(request);

      if (result.raw.affectedRows === 0) {
        throw new BadRequestException(`School was not successfully created`);
      }

      return MessageResponse.of('학교 등록에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to create school: ${error}`);
    }
  }

  async getNotification(notificationId: number) {
    const result = await this.notificationRepository.getNotification(notificationId);

    if (!result)
      throw new BadRequestException(
        `Notification does not exist for notificationId: ${notificationId}`,
      );

    return result;
  }

  async createNotification(request: CreateNotificationRequest): Promise<MessageResponse> {
    try {
      const result = await this.notificationRepository.createNotification(request);

      if (result.raw.affectedRows === 0) {
        throw new BadRequestException(`Notification was not successfully created`);
      }

      return MessageResponse.of('소식 등록에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to create notification: ${error}`);
    }
  }

  async updateNotification(
    notificationId: number,
    request: UpdateNotificationRequest,
  ): Promise<MessageResponse> {
    await this.getNotification(notificationId);

    try {
      const result = await this.notificationRepository.updateNotification(notificationId, request);

      if (result.affected === 0) {
        throw new BadRequestException(`Notification was not successfully updated`);
      }

      return MessageResponse.of('소식 수정에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to update notification: ${error}`);
    }
  }

  async deleteNotification(notificationId: number): Promise<MessageResponse> {
    try {
      const result = await this.notificationRepository.deleteNotification(notificationId);

      if (result.affected === 0) {
        throw new BadRequestException(`Notification was not successfully deleted`);
      }

      return MessageResponse.of('소식 삭제에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error}`);
    }
  }

  async getSubscribeSchools(
    studentId: number,
    request: GetStudentSchoolsRequest,
  ): Promise<SchoolEntity[]> {
    return await this.schoolRepository.findSubscribeSchools(studentId, request);
  }
}
