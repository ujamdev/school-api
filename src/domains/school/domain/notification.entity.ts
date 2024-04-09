import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { YesNo } from '../../../commons/enum/yes.no';
import { AdminEntity } from '../../admin/domain/admin.entity';
import { SchoolEntity } from './school.entity';

@Entity('notification', { schema: 'school_notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '소식 인덱스' })
  id: number;

  @Column({ type: 'int', name: 'school_id', comment: '학교 인덱스' })
  schoolId: number;

  @Column({
    type: 'varchar',
    name: 'content',
    comment: '소식 내용',
    length: 1000,
  })
  content: string;

  @Column({ type: 'int', name: 'register_id', comment: '등록자 인덱스' })
  registerId: number;

  @Column({ type: 'int', name: 'modifier_id', comment: '수정자 인덱스', nullable: true })
  modifierId: number;

  @Column({
    type: 'enum',
    enum: YesNo,
    name: 'is_active',
    comment: '활성화 여부',
    default: YesNo.YES,
  })
  isActive: YesNo;

  @Column('datetime', {
    name: 'created_at',
    comment: '등록일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정 일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.notification, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.registrant, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'register_id', referencedColumnName: 'id' }])
  registrant: AdminEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.modifier, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'modifier_id', referencedColumnName: 'id' }])
  modifier: AdminEntity;
}
