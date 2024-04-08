import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResult } from 'typeorm';
import { MessageResponse } from '../../../../src/commons/dto/message.response';
import { YesNo } from '../../../../src/commons/enum/yes.no';
import { SchoolService } from '../../../../src/domains/school/application/school.service';
import { NotificationRepository } from '../../../../src/domains/school/domain/notification.repository';
import { SchoolRepository } from '../../../../src/domains/school/domain/school.repository';
import { StudentService } from '../../../../src/domains/student/application/student.service';
import { GetStudentSchoolResponse } from '../../../../src/domains/student/domain/dto/get.student.school.response';
import { StudentSchoolRepository } from '../../../../src/domains/student/domain/student.school.repository';

describe('StudentService', () => {
  let service: StudentService;
  let studentSchoolRepository: StudentSchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        StudentSchoolRepository,
        SchoolService,
        SchoolRepository,
        NotificationRepository,
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentSchoolRepository = module.get<StudentSchoolRepository>(StudentSchoolRepository);
  });

  describe('deleteStudentSchool', () => {
    it('should delete student-school relationship successfully', async () => {
      //given
      const mockStudentSchool: GetStudentSchoolResponse = {
        id: 1,
        studentId: 1,
        schoolId: 1,
        isActive: YesNo.YES,
        createdAt: new Date('2024-04-07T12:01:25.000Z'),
        updatedAt: new Date('2024-04-07T12:01:25.000Z'),
      };
      jest.spyOn(studentSchoolRepository, 'getStudentSchool').mockResolvedValue(mockStudentSchool);

      jest
        .spyOn(studentSchoolRepository, 'deleteStudentSchool')
        .mockResolvedValue({ affected: 1 } as UpdateResult);

      //when
      const result = await service.deleteStudentSchool({ studentId: 1, schoolId: 1 });

      //then
      expect(result).toEqual(MessageResponse.of('학교 구독 취소에 성공했습니다.'));
    });
  });
});
