import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SemesterService } from './semester.service';
import { Semester } from './entities/semester.entity';
import { CreateSemesterInput } from './dto/create-semester.input';
import { UpdateSemesterInput } from './dto/update-semester.input';

@Resolver(() => Semester)
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}

  @Mutation(() => Semester)
  createSemester(@Args('createSemesterInput') createSemesterInput: CreateSemesterInput) {
    return this.semesterService.create(createSemesterInput);
  }

  @Query(() => [Semester], { name: 'semester' })
  findAll() {
    return this.semesterService.findAll();
  }

  @Query(() => Semester, { name: 'semester' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.semesterService.findOne(id);
  }

  @Mutation(() => Semester)
  updateSemester(@Args('updateSemesterInput') updateSemesterInput: UpdateSemesterInput) {
    return this.semesterService.update(updateSemesterInput.id, updateSemesterInput);
  }

  @Mutation(() => Semester)
  removeSemester(@Args('id', { type: () => Int }) id: number) {
    return this.semesterService.remove(id);
  }
}
