import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { CreateNotificationRequest } from '../domain/dto/create.notification.request';
import { CreateSchoolRequest } from '../domain/dto/create.school.request';
import { NotificationRepository } from '../domain/notification.repository';
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
}
