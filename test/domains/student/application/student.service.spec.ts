import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResult } from 'typeorm';
import { MessageResponse } from '../../../../src/commons/dto/message.response';
import { PaginationRequest } from '../../../../src/commons/dto/pagination.request';
import { YesNo } from '../../../../src/commons/enum/yes.no';
import { SchoolService } from '../../../../src/domains/school/application/school.service';
import { GetNotificationResponse } from '../../../../src/domains/school/domain/dto/get.notification.response';
import { GetSubscribeSchoolResponse } from '../../../../src/domains/school/domain/dto/get.subscribe.school.response';
import { NotificationRepository } from '../../../../src/domains/school/domain/notification.repository';
import { SchoolRepository } from '../../../../src/domains/school/domain/school.repository';
import { StudentService } from '../../../../src/domains/student/application/student.service';
import { GetStudentSchoolResponse } from '../../../../src/domains/student/domain/dto/get.student.school.response';
import { StudentSchoolRepository } from '../../../../src/domains/student/domain/student.school.repository';

describe('StudentService', () => {
  let service: StudentService;
  let studentSchoolRepository: StudentSchoolRepository;
  let schoolService: SchoolService;

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
    schoolService = module.get<SchoolService>(SchoolService);
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

  describe('getSubscribeSchools', () => {
    it('should return subscribed schools for a student', async () => {
      //given
      const studentId = 1;
      const paginationRequest: PaginationRequest = { page: 1, perPage: 10 };

      const mockSchools: GetSubscribeSchoolResponse[] = [
        {
          id: 1,
          name: '서울초등학교',
          studentSchool: [{ studentId: 1, createdAt: new Date('2024-04-06T16:09:59.000Z') }],
        },
        {
          id: 2,
          name: '경기초등학교',
          studentSchool: [{ studentId: 1, createdAt: new Date('2024-04-06T16:09:59.000Z') }],
        },
      ];
      jest.spyOn(schoolService, 'getSubscribeSchools').mockResolvedValue(mockSchools);

      //when
      const result = await service.getSubscribeSchools(studentId, paginationRequest);

      //then
      expect(result).toEqual(mockSchools);
    });
  });

  describe('getSchoolNotifications', () => {
    it('should return school notifications', async () => {
      //given
      const param = { schoolId: 1, studentId: 1 };
      const paginationRequest: PaginationRequest = { page: 1, perPage: 10 };

      const mockNotifications: GetNotificationResponse[] = [
        {
          id: 1,
          schoolId: 1,
          content: '서울초등학교 소식1입니다.',
          registerId: 1,
          modifierId: null,
          isActive: YesNo.YES,
          createdAt: new Date('2024-04-06T16:09:59.000Z'),
          updatedAt: new Date('2024-04-06T16:09:59.000Z'),
        },
        {
          id: 1,
          schoolId: 1,
          content: '서울초등학교 소식2입니다.',
          registerId: 1,
          modifierId: null,
          isActive: YesNo.YES,
          createdAt: new Date('2024-04-07T12:14:34.000Z'),
          updatedAt: new Date('2024-04-07T12:14:34.000Z'),
        },
      ];

      jest.spyOn(schoolService, 'getSchoolNotifications').mockResolvedValue(mockNotifications);

      //when
      const result = await service.getSchoolNotifications(param, paginationRequest);

      //then
      expect(result).toEqual(mockNotifications);
    });
  });
});
