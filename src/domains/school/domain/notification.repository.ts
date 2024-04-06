import { InsertResult, Repository } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { CreateNotificationRequest } from './dto/create.notification.request';
import { NotificationEntity } from './notification.entity';

@CustomRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
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
}
