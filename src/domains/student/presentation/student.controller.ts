import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MessageResponse } from '../../../commons/dto/message.response';
import { PaginationRequest } from '../../../commons/dto/pagination.request';
import { GetNotificationResponse } from '../../school/domain/dto/get.notification.response';
import { GetSubscribeSchoolResponse } from '../../school/domain/dto/get.subscribe.school.response';
import { StudentService } from '../application/student.service';
import { CreateStudentSchoolRequest } from '../domain/dto/create.student.school.request';
import { DeleteStudentSchoolRequest } from '../domain/dto/delete.student.school.request';
import { GetSchoolNotificationsRequest } from '../domain/dto/get.school.notifications.request';

@Controller('api')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  /**
   * 학생이 학교 구독
   * @param {CreateStudentSchoolRequest} param
   * @return {Promise<MessageResponse>}
   */
  @Post('/students/:studentId/schools/:schoolId')
  async createStudentSchool(@Param() param: CreateStudentSchoolRequest): Promise<MessageResponse> {
    return await this.studentService.createStudentSchool(param);
  }

  /**
   * 학생이 구독중인 학교 구독 취소
   * @param {DeleteStudentSchoolRequest} param
   * @return {Promise<MessageResponse>}
   */
  @Delete('/students/:studentId/schools/:schoolId')
  async deleteStudentSchool(@Param() param: DeleteStudentSchoolRequest): Promise<MessageResponse> {
    return await this.studentService.deleteStudentSchool(param);
  }

  /**
   * 학생이 구독중인 학교 목록 조회
   * @param {number} studentId
   * @return {Promise<GetSubscribeSchoolResponse[]>}
   */
  @Get('/students/:studentId/schools')
  async getSubscribeSchools(
    @Param('studentId') studentId: number,
    @Query() request: PaginationRequest,
  ): Promise<GetSubscribeSchoolResponse[]> {
    return await this.studentService.getSubscribeSchools(studentId, request);
  }

  /**
   * 학생이 구독중인 학교별 소식 조회
   * @param {GetSchoolNotificationsRequest} param
   * @return {Promise<GetNotificationResponse[]>}
   */
  @Get('/students/:studentId/schools/:schoolId/notifications')
  async getSchoolNotifications(
    @Param() param: GetSchoolNotificationsRequest,
    @Query() request: PaginationRequest,
  ): Promise<GetNotificationResponse[]> {
    return await this.studentService.getSchoolNotifications(param, request);
  }

  /**
   * 학생이 구독중인 학교 소식 조회
   * @param {GetSchoolNotificationsRequest} studentId
   * @return {Promise<GetNotificationResponse[]>}
   */
  @Get('/students/:studentId/schools/notifications')
  async getSchoolsNotifications(
    @Param('studentId') studentId: number,
    @Query() request: PaginationRequest,
  ): Promise<GetNotificationResponse[]> {
    return await this.studentService.getSchoolsNotifications(studentId, request);
  }
}
