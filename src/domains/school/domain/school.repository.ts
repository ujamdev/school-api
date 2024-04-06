import { InsertResult, Repository } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { CreateSchoolRequest } from './dto/create.school.request';
import { SchoolEntity } from './school.entity';

@CustomRepository(SchoolEntity)
export class SchoolRepository extends Repository<SchoolEntity> {
  async createSchool(request: CreateSchoolRequest): Promise<InsertResult> {
    return await this.createQueryBuilder('school')
      .insert()
      .into(SchoolEntity)
      .values({ regionId: request.regionId, name: request.name })
      .execute();
  }
}
