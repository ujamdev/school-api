import { Test, TestingModule } from '@nestjs/testing';
import { MessageResponse } from '../../../../src/commons/dto/message.response';
import { SchoolService } from '../../../../src/domains/school/application/school.service';
import { NotificationRepository } from '../../../../src/domains/school/domain/notification.repository';
import { SchoolRepository } from '../../../../src/domains/school/domain/school.repository';

describe('SchoolService', () => {
  let service: SchoolService;
  let notificationRepository: NotificationRepository;

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
