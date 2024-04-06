import { NotificationEntity } from 'src/domains/school/domain/notification.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin', { schema: 'school_notification' })
export class AdminEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '관리자 인덱스' })
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '관리자 이름', length: 20 })
  name: string;

  @OneToMany(() => NotificationEntity, (notification) => notification.registrant)
  registrant: NotificationEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.modifier)
  modifier: NotificationEntity[];
}
