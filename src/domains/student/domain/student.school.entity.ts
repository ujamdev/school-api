import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { YesNo } from '../../../commons/enum/yes.no';
import { SchoolEntity } from '../../school/domain/school.entity';
import { StudentEntity } from './student.entity';

@Entity('student_school', { schema: 'school_notification' })
export class StudentSchoolEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '학생 학교 관계 인덱스',
  })
  id: number;

  @Column({ type: 'int', name: 'student_id', comment: '학생 인덱스' })
  studentId: number;

  @Column({ type: 'int', name: 'school_id', comment: '학교 인덱스' })
  schoolId: number;

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

  @ManyToOne(() => StudentEntity, (student) => student.studentSchool, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: StudentEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.studentSchool, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: SchoolEntity;
}
