import { Injectable, NotFoundException } from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';
import { GetSubjectInput } from './dto/get-subject.input';
import { GetSubjectsEntity } from './entities/get-subject.entity';
import { GetSubjectsResponse } from './response/get-subject.response';
import { I18nService } from 'nestjs-i18n';
import { ListSubjectInput } from './dto/list-subject.input';
import { ListSubjectsEntity } from './entities/list-subject.entity';
import { ListSubjectsResponse } from './response/list-subject.response';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description getSubject by id
   * @param getSubjectInput
   * @returns
   */
  async getSubject(
    getSubjectInput: GetSubjectInput,
  ): Promise<GetSubjectsEntity> {
    const subject = await this.subjectRepository.getSubject(getSubjectInput);

    if (!subject) {
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));
    }
    return GetSubjectsResponse.decode({ subject: subject });
  }

  /**
   * @description listing all subject
   * @param listSubjectInput
   * @returns
   */
  async listSubject(
    listSubjectInput: ListSubjectInput,
  ): Promise<ListSubjectsEntity> {
    const [subject, count] =
      await this.subjectRepository.listSubject(listSubjectInput);

    if (!subject.length)
      throw new NotFoundException(this.i18n.t('subject.SUBJECT_NOT_FOUND'));
    return ListSubjectsResponse.decode({
      subject: subject,
      count: count,
    });
  }
}
