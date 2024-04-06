import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student', { schema: 'school_notification' })
export class studentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '학생 인덱스' })
  id: number;

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
}
