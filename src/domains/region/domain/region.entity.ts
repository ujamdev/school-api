import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SchoolEntity } from '../../school/domain/school.entity';

@Entity('region', { schema: 'school_notification' })
export class RegionEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '지역 인덱스' })
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '지역 이름', length: 20 })
  name: string;

  @OneToMany(() => SchoolEntity, (school) => school.region)
  school: SchoolEntity[];
}
