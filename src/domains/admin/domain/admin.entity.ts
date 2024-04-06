import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin', { schema: 'school_notification' })
export class adminEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '관리자 인덱스' })
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '관리자 이름', length: 20 })
  name: number;
}
