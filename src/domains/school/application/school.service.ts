import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageResponse } from 'src/commons/dto/message.response';
import { createSchoolRequest } from '../domain/dto/create.school.request';
import { schoolRepository } from '../domain/school.repository';

@Injectable()
export class SchoolService {
  constructor(private readonly schoolRepository: schoolRepository) { }

  async createSchool(request: createSchoolRequest): Promise<MessageResponse> {
    try {
      const result = await this.schoolRepository.createSchool(request);

      if (result.raw.affectedRows === 0) {
        throw new BadRequestException(`School was not successfully created`);
      }

      return MessageResponse.of('학교 등록에 성공했습니다.');
    } catch (error) {
      throw new Error(`Failed to create school: ${error}`);
    }
  }
}
