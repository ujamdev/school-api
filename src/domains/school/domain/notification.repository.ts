import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { PaginationRequest } from '../../../commons/dto/pagination.request';
import { YesNo } from '../../../commons/enum/yes.no';
import { GetSchoolNotificationsRequest } from '../../student/domain/dto/get.school.notifications.request';
import { CreateNotificationRequest } from './dto/create.notification.request';
import { GetNotificationResponse } from './dto/get.notification.response';
import { UpdateNotificationRequest } from './dto/update.notification.request';
import { NotificationEntity } from './notification.entity';

@CustomRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
  async getNotification(notificationId: number): Promise<GetNotificationResponse> {
    return await this.createQueryBuilder('notification')
      .where('id = :notificationId', { notificationId })
      .andWhere('is_active = :isActive', { isActive: YesNo.YES })
      .getOne();
  }

  async createNotification(request: CreateNotificationRequest): Promise<InsertResult> {
    return await this.createQueryBuilder('notification')
      .insert()
      .into(NotificationEntity)
      .values({
        schoolId: request.schoolId,
        content: request.content,
        registerId: request.registerId,
      })
      .execute();
  }

  async updateNotification(
    notificationId: number,
    request: UpdateNotificationRequest,
  ): Promise<UpdateResult> {
    return await this.createQueryBuilder('notification')
      .update(NotificationEntity)
      .set({
        content: request.content,
        modifierId: request.modifierId,
      })
      .where('id = :notificationId', { notificationId })
      .andWhere('is_active = :isActive', { isActive: YesNo.YES })
      .execute();
  }

  async deleteNotification(notificationId: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('notification')
      .update(NotificationEntity)
      .set({
        isActive: YesNo.NO,
      })
      .where('id = :notificationId', { notificationId })
      .execute();
  }

  async findSchoolNotifications(
    param: GetSchoolNotificationsRequest,
    request: PaginationRequest,
  ): Promise<GetNotificationResponse[]> {
    const { studentId, schoolId } = param;
    const { page, perPage } = request;

    return await this.createQueryBuilder('notification')
      .leftJoin('notification.school', 'school')
      .leftJoin('school.studentSchool', 'studentSchool')
      .where('notification.school_id = :schoolId', { schoolId })
      .andWhere('studentSchool.student_id = :studentId', { studentId })
      .andWhere('notification.is_active = :isActive', { isActive: YesNo.YES })
      .andWhere('studentSchool.is_active = :isActive', { isActive: YesNo.YES })
      .take(perPage)
      .skip(perPage * (page - 1))
      .orderBy('notification.createdAt', 'DESC')
      .getMany();
  }
}
