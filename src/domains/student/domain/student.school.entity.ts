import { schoolEntity } from 'src/domains/school/domain/school.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { studentEntity } from './student.entity';

@Index('FK_student', ['studentId'], {})
@Index('FK_school', ['schoolId'], {})
@Entity('student_school', { schema: 'school_notification' })
export class studentSchoolEntity {
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

  @ManyToOne(() => studentEntity, (student) => student.studentSchool, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: studentEntity;

  @ManyToOne(() => schoolEntity, (school) => school.studentSchool, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'school_id', referencedColumnName: 'id' }])
  school: schoolEntity;
}
