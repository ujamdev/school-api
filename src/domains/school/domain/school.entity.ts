import { regionEntity } from 'src/domains/region/domain/region.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { notificationEntity } from './notification.entity';

@Index('FK_region', ['regionId'], {})
@Entity('school', { schema: 'school_notification' })
export class schoolEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '학교 인덱스' })
  id: number;

  @Column({ type: 'int', name: 'region_id', comment: '지역 인덱스' })
  regionId: number;

  @Column({ type: 'varchar', name: 'name', comment: '학교 이름', length: 20 })
  name: number;

  @Column('datetime', {
    name: 'created_at',
    comment: '등록일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    comment: '수정 일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => regionEntity, (region) => region.school, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'id' }])
  region: regionEntity;

  @OneToMany(() => notificationEntity, (notification) => notification.school)
  notification: notificationEntity[];
}
