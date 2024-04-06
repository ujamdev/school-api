import { Body, Controller, Post } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { SchoolService } from '../application/school.service';
import { createSchoolRequest } from '../domain/dto/create.school.request';

@Controller('api')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  /**
   * 학교 관리자가 지역, 학교 명으로 학교 생성
   * @param {CreatePushRequest} request
   * @return {Promise<InsertResult>}
   */
  @Post('/schools')
  async createSchool(@Body() request: createSchoolRequest): Promise<MessageResponse> {
    return await this.schoolService.createSchool(request);
  }
}
