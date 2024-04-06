import { Body, Controller, Post } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { SchoolService } from '../application/school.service';
import { CreateNotificationRequest } from '../domain/dto/create.notification.request';
import { CreateSchoolRequest } from '../domain/dto/create.school.request';

@Controller('api')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  /**
   * 학교 관리자가 지역, 학교 명으로 학교 생성
   * @param {CreatePushRequest} request
   * @return {Promise<MessageResponse>}
   */
  @Post('/schools')
  async createSchool(@Body() request: CreateSchoolRequest): Promise<MessageResponse> {
    return await this.schoolService.createSchool(request);
  }

  /**
   * 학교 관리자는 학교 페이지 내에 소식 생성
   * @param {createNotificationRequest} request
   * @return {Promise<MessageResponse>}
   */
  @Post('/notifications')
  async createNotification(@Body() request: CreateNotificationRequest): Promise<MessageResponse> {
    return await this.schoolService.createNotification(request);
  }
}
