import { YesNo } from 'src/commons/enum/yes.no';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { CreateNotificationRequest } from './dto/create.notification.request';
import { NotificationEntity } from './notification.entity';

@CustomRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
  async getNotification(notificationId: number): Promise<NotificationEntity> {
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

  async deleteNotification(notificationId: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('notification')
      .update(NotificationEntity)
      .set({
        isActive: YesNo.NO,
      })
      .where('id = :notificationId', { notificationId })
      .execute();
  }
}
