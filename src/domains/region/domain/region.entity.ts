import { schoolEntity } from 'src/domains/school/domain/school.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region', { schema: 'school_notification' })
export class regionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '지역 인덱스' })
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '지역 이름', length: 20 })
  name: string;

  @OneToMany(() => schoolEntity, (school) => school.region)
  school: schoolEntity[];
}
