import { Test, TestingModule } from '@nestjs/testing';
import { InsertResult, UpdateResult } from 'typeorm';
import { MessageResponse } from '../../../../src/commons/dto/message.response';
import { SchoolService } from '../../../../src/domains/school/application/school.service';
import { CreateNotificationRequest } from '../../../../src/domains/school/domain/dto/create.notification.request';
import { CreateSchoolRequest } from '../../../../src/domains/school/domain/dto/create.school.request';
import { NotificationRepository } from '../../../../src/domains/school/domain/notification.repository';
import { SchoolRepository } from '../../../../src/domains/school/domain/school.repository';

describe('SchoolService', () => {
  let service: SchoolService;
  let notificationRepository: NotificationRepository;
  let schoolRepository: SchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolService, SchoolRepository, NotificationRepository],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
    notificationRepository = module.get<NotificationRepository>(NotificationRepository);
    schoolRepository = module.get<SchoolRepository>(SchoolRepository);
  });

  describe('createSchool', () => {
    it('should successfully create a school', async () => {
      // given
      const request = { regionId: 1, name: '서울초등학교' } as CreateSchoolRequest;

      jest
        .spyOn(schoolRepository, 'createSchool')
        .mockResolvedValue({ raw: { affectedRows: 1 } } as InsertResult);

      // when
      const result = await service.createSchool(request);

      // then
      expect(result).toEqual(MessageResponse.of('학교 등록에 성공했습니다.'));
    });
  });

  describe('createNotification', () => {
    it('should successfully create a notification', async () => {
      // given
      const request = {
        schoolId: 1,
        content: '서울초등학교 소식입니다',
        registerId: 1,
      } as CreateNotificationRequest;

      jest
        .spyOn(notificationRepository, 'createNotification')
        .mockResolvedValue({ raw: { affectedRows: 1 } } as InsertResult);

      // when
      const result = await service.createNotification(request);

      // then
      expect(result).toEqual(MessageResponse.of('소식 등록에 성공했습니다.'));
    });
  });

  describe('deleteNotification', () => {
    it('should successfully delete a notification', async () => {
      // given
      const notificationId = 1;

      jest
        .spyOn(notificationRepository, 'deleteNotification')
        .mockResolvedValue({ affected: 1 } as UpdateResult);

      // when
      const result = await service.deleteNotification(notificationId);

      // then
      expect(result).toEqual(MessageResponse.of('소식 삭제에 성공했습니다.'));
      expect(notificationRepository.deleteNotification).toHaveBeenCalledWith(notificationId);
    });
  });
});