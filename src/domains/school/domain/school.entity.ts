import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { RegionEntity } from '../../region/domain/region.entity';
import { StudentSchoolEntity } from '../../student/domain/student.school.entity';
import { NotificationEntity } from './notification.entity';

@Entity('school', { schema: 'school_notification' })
export class SchoolEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '학교 인덱스' })
  id: number;

  @Column({ type: 'int', name: 'region_id', comment: '지역 인덱스' })
  regionId: number;

  @Column({ type: 'varchar', name: 'name', comment: '학교 이름', length: 20 })
  name: string;

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

  @OneToMany(() => StudentSchoolEntity, (studentSchool) => studentSchool.school)
  studentSchool: StudentSchoolEntity[];

  @ManyToOne(() => RegionEntity, (region) => region.school, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'region_id', referencedColumnName: 'id' }])
  region: RegionEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.school)
  notification: NotificationEntity[];
}
