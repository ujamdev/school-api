import { YesNo } from 'src/commons/enum/yes.no';

export class GetNotificationResponse {
  id: number;
  schoolId: number;
  content: string;
  registerId: number;
  modifierId: number;
  isActive: YesNo;
  createdAt: Date;
  updatedAt: Date;
}
