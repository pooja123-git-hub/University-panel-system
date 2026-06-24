import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './database/subject.entity';
import { GetSubjectsEntity } from './entities/get-subject.entity';
import { GetSubjectInput } from './dto/get-subject.input';
import { ListSubjectsEntity } from './entities/list-subject.entity';
import { ListSubjectInput } from './dto/list-subject.input';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { AtGuard } from 'src/auth/guards/at.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  // 1.GetSubject
  @Query(() => GetSubjectsEntity, {
    name: 'getSubject',
    description: ' get the subject.',
  })
  async adminGetSubject(
    @Args('get_subject_input') getSubjectInput: GetSubjectInput,
  ): Promise<GetSubjectsEntity> {
    return this.subjectService.getSubject(getSubjectInput);
  }

  //   2.ListSubject
  @Query(() => ListSubjectsEntity, {
    name: 'listSubject',
    description: ' list the subject.',
  })
  async listSubject(
    @Args('list_subject_input')
    listSubjectInput: ListSubjectInput,
  ): Promise<ListSubjectsEntity> {
    return this.subjectService.listSubject(listSubjectInput);
  }
}
