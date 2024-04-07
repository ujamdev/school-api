import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { SchoolService } from '../application/school.service';
import { CreateNotificationRequest } from '../domain/dto/create.notification.request';
import { CreateSchoolRequest } from '../domain/dto/create.school.request';
import { UpdateNotificationRequest } from '../domain/dto/update.notification.request';

@Controller('api')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  /**
   * 학교 관리자가 지역, 학교 명으로 학교 생성
   * @param {CreateSchoolRequest} request
   * @return {Promise<MessageResponse>}
   */
  @Post('/schools')
  async createSchool(@Body() request: CreateSchoolRequest): Promise<MessageResponse> {
    return await this.schoolService.createSchool(request);
  }

  /**
   * 학교 관리자는 학교 페이지 내에 소식 생성
   * @param {CreateNotificationRequest} request
   * @return {Promise<MessageResponse>}
   */
  @Post('/notifications')
  async createNotification(@Body() request: CreateNotificationRequest): Promise<MessageResponse> {
    return await this.schoolService.createNotification(request);
  }

  /**
   * 학교 관리자는 학교 페이지 내에 소식 수정
   * @param {number} notificationId
   * @param {UpdateNotificationRequest} request
   * @return {Promise<MessageResponse>}
   */
  @Patch('/notifications/:notificationId')
  async updateNotification(
    @Param('notificationId') notificationId: number,
    @Body() request: UpdateNotificationRequest,
  ): Promise<MessageResponse> {
    return await this.schoolService.updateNotification(notificationId, request);
  }

  /**
   * 학교 관리자는 학교 페이지 내에 소식 삭제
   * @param {number} notificationId
   * @return {Promise<MessageResponse>}
   */
  @Delete('/notifications/:notificationId')
  async deleteNotification(
    @Param('notificationId') notificationId: number,
  ): Promise<MessageResponse> {
    return await this.schoolService.deleteNotification(notificationId);
  }
}
