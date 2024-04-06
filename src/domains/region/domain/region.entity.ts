import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region', { schema: 'school_notification' })
export class regionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '지역 인덱스' })
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '지역 이름', length: 20 })
  name: number;
}
