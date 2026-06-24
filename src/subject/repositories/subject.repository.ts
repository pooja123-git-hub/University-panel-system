import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../database/subject.entity';
import { Repository } from 'typeorm';
import { GetSubjectInput } from '../dto/get-subject.input';
import { ListSubjectInput } from '../dto/list-subject.input';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  /**
   * @description  get subject detail with id
   * @param listSubjectInput
   * @returns
   */
  async getSubject(getSubjectInput: GetSubjectInput): Promise<Subject | null> {
    const query = this.subjectRepository
      .createQueryBuilder('subject')
      .select([
        'subject.id',
        'subject.subject_name',
        'subject.subject_code',
        'subject.credits',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('subject.course', 'course')
      .leftJoin('subject.semester', 'semester')
      .where('subject.id=:subjectId', {
        subjectId: getSubjectInput.subjectId,
      });
    const result = await query.getOne();

    return result;
  }

  /**
   * @description  list subject detail
   * @param getSubjectInput
   * @returns
   */
  async listSubject(
    listSubjectInput: ListSubjectInput,
  ): Promise<[Subject[], number]> {
    const query = await this.subjectRepository
      .createQueryBuilder('subject')
      .select([
        'subject.id',
        'subject.subject_name',
        'subject.subject_code',
        'subject.credits',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('subject.course', 'course')
      .leftJoin('subject.semester', 'semester');
    if (listSubjectInput?.search) {
      query.andWhere('LOWER(subject.subject_name) LIKE :search', {
        search: `%${listSubjectInput.search.toLowerCase()}%`,
      });
    }
    if (listSubjectInput.pagination) {
      query.take(listSubjectInput.take).skip(listSubjectInput.skip);
    }
    const list = await query.getManyAndCount();
    return list;
  }
}
