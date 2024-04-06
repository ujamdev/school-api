import { InsertResult, Repository } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { createSchoolRequest } from './dto/create.school.request';
import { schoolEntity } from './school.entity';

@CustomRepository(schoolEntity)
export class schoolRepository extends Repository<schoolEntity> {
  async createSchool(request: createSchoolRequest): Promise<InsertResult> {
    return await this.createQueryBuilder('school')
      .insert()
      .into(schoolEntity)
      .values({ regionId: request.regionId, name: request.name })
      .execute();
  }
}
