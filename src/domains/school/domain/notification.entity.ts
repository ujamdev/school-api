import { adminEntity } from 'src/domains/admin/domain/admin.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Index('FK_school', ['schoolId'], {})
@Index('FK_register', ['registerId'], {})
@Index('FK_modifier', ['modifierId'], {})
@Entity('notification', { schema: 'school_notification' })
export class notificationEntity {
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
  content: number;

  @Column({ type: 'int', name: 'register_id', comment: '등록자 인덱스' })
  registerId: number;

  @Column({ type: 'int', name: 'modifier_id', comment: '수정자 인덱스' })
  modifierId: number;

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

  @ManyToOne(() => adminEntity, (admin) => admin.registrant, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'register_id', referencedColumnName: 'id' }])
  registrant: adminEntity;

  @ManyToOne(() => adminEntity, (admin) => admin.modifier, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'modifier_id', referencedColumnName: 'id' }])
  modifier: adminEntity;
}
