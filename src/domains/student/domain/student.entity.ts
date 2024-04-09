import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StudentSchoolEntity } from './student.school.entity';

@Entity('student', { schema: 'school_notification' })
export class StudentEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '학생 인덱스' })
  id: number;

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

  @OneToMany(() => StudentSchoolEntity, (studentSchool) => studentSchool.student)
  studentSchool: StudentSchoolEntity[];
}
