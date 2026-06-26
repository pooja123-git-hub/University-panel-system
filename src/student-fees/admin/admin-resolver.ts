import {  UseGuards } from '@nestjs/common';
import { AdminStudentFeeService } from './admin.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentFees } from '../database/student-fee.entity';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateStudentFeeInput } from '../dto/admin/admin-create-student-fees.input';
import { AdminGetStudentFeeInput } from '../dto/admin/admin-get-student-fees.input';
import { AdminGetStudentFeeEntity } from '../entities/admin/admin-get-student-fee.entity';
import { AdminListStudentFeeInput } from '../dto/admin/admin-list-student-fees.input';
import { AdminListStudentFeeEntity } from '../entities/admin/admin-list-student-fee.entity';
import { AdminDeleteStudentFeeInput } from '../dto/admin/admin-delete-student-fees.input';
import { AdminUpdateStudentFeesInput } from '../dto/admin/admin-update-student-fee.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => StudentFees)
export class AdminStudentFeeResolver {
  constructor(
    private readonly adminStudentFeeService: AdminStudentFeeService,
  ) {}

  // 1.AdminCreateStudentFees
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateStudentFees',
    description: 'admin create student fees record',
  })
  async adminCreateStudentFees(
    @Args('admin_create_student_fee_input')
    adminCreateStudentFeeInput: AdminCreateStudentFeeInput,
  ) {
    return this.adminStudentFeeService.adminCreateStudentFee(
      adminCreateStudentFeeInput,
    );
  }

  //   2.AdminGetStudentFees
  @Query(() => AdminGetStudentFeeEntity, {
    name: 'adminGetStudentFees',
    description: 'Admin can view student fees record',
  })
  async adminGetStudentFees(
    @Args('admin_get_student_fee_input')
    adminGetStudentFeesInput: AdminGetStudentFeeInput,
  ) {
    return this.adminStudentFeeService.adminGetStudentFee(
      adminGetStudentFeesInput,
    );
  }

  // 3.AdminListStudentFees
  @Query(() => AdminListStudentFeeEntity, {
    name: 'adminListStudentFees',
    description: 'Admin can list all student fees record',
  })
  async adminListStudentFees(
    @Args('admin_list_student_fee_input')
    adminListStudentFeesInput: AdminListStudentFeeInput,
  ) {
    return this.adminStudentFeeService.adminListStudentFees(
      adminListStudentFeesInput,
    );
  }
  // 4.AdminUpdateStudentFees
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateStudentFees',
    description: 'admin update student fees record',
  })
  async adminUpdateStudentFees(
    @Args('admin_update_student_fee_input')
    adminUpdateStudentFeeInput: AdminUpdateStudentFeesInput,
  ) {
    return this.adminStudentFeeService.adminUpdateStudentFee(
      adminUpdateStudentFeeInput,
    );
  }

  // 5.AdminDeleteStudentFees
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteStudentFees',
    description: 'admin delete student fees record',
  })
  async adminDeleteStudentFees(
    @Args('admin_delete_student_fee_input')
    adminDeleteStudentFeeInput: AdminDeleteStudentFeeInput,
  ) {
    return this.adminStudentFeeService.adminDeleteStudentFees(
      adminDeleteStudentFeeInput,
    );
  }
}
