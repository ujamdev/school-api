import { Test, TestingModule } from '@nestjs/testing';
import { InsertResult } from 'typeorm';
import { MessageResponse } from '../../../../src/commons/dto/message.response';
import { SchoolService } from '../../../../src/domains/school/application/school.service';
import { NotificationRepository } from '../../../../src/domains/school/domain/notification.repository';
import { SchoolRepository } from '../../../../src/domains/school/domain/school.repository';

describe('SchoolService', () => {
  let service: SchoolService;
  let notificationRepository: NotificationRepository;
  let schoolRepository: SchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        SchoolRepository,
        {
          provide: NotificationRepository,
          useValue: {
            deleteNotification: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
    notificationRepository = module.get<NotificationRepository>(NotificationRepository);
    schoolRepository = module.get<SchoolRepository>(SchoolRepository);
  });

  describe('createSchool', () => {
    it('should successfully create a school', async () => {
      // given
      const request = { regionId: 1, name: '서울초등학교' };
      jest
        .spyOn(schoolRepository, 'createSchool')
        .mockResolvedValue({ raw: { affectedRows: 1 } } as InsertResult);

      // when
      const result = await service.createSchool(request);

      // then
      expect(result).toEqual(MessageResponse.of('학교 등록에 성공했습니다.'));
    });
  });

  describe('deleteNotification', () => {
    it('should successfully delete a notification', async () => {
      // given
      const notificationId = 1;

      // when
      const result = await service.deleteNotification(notificationId);

      // then
      expect(result).toEqual(MessageResponse.of('소식 삭제에 성공했습니다.'));
      expect(notificationRepository.deleteNotification).toHaveBeenCalledWith(notificationId);
    });
  });
});
