import { InsertResult, Repository } from 'typeorm';
import { CustomRepository } from '../../../commons/decorator/typeorm.decorator';
import { PaginationRequest } from '../../../commons/dto/pagination.request';
import { YesNo } from '../../../commons/enum/yes.no';
import { CreateSchoolRequest } from './dto/create.school.request';
import { GetSubscribeSchoolResponse } from './dto/get.subscribe.school.response';
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

  async findSubscribeSchools(
    studentId: number,
    request: PaginationRequest,
  ): Promise<GetSubscribeSchoolResponse[]> {
    const { page, perPage } = request;

    return await this.createQueryBuilder('school')
      .select([`school.id`, `school.name`, `studentSchool.studentId`, `studentSchool.createdAt`])
      .leftJoin('school.studentSchool', 'studentSchool')
      .where('studentSchool.student_id = :studentId', { studentId })
      .andWhere('studentSchool.is_active = :isActive', { isActive: YesNo.YES })
      .take(perPage)
      .skip(perPage * (page - 1))
      .orderBy('studentSchool.createdAt', 'DESC')
      .getMany();
  }
}
