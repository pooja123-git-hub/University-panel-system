import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentFeesService } from './student-fees.service';
import { StudentFees } from './database/student-fee.entity';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { GetsStudentFeeEntity } from './entities/get-student-fee.entity';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/database/user.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => StudentFees)
export class StudentFeesResolver {
  constructor(private readonly studentFeesService: StudentFeesService) {}

  // 1.GetStudentFeeDetail
  @Query(() => GetsStudentFeeEntity, {
    name: 'getStudentFees',
    description: 'Admin can view student fees record',
  })
  async adminGetStudentFees(@CurrentUser() user: User) {
    return this.studentFeesService.getStudentFee(user);
  }
}
