import { UseGuards } from '@nestjs/common';
import { FeesStructure } from '../database/fee.entity';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminFeesService } from './admin.service';
import { AtGuard } from 'src/auth/guards/at.guard';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateFeesInput } from '../dto/admin/admin-create-fees-input';
import { AdminUpdateFeesInput } from '../dto/admin/admin-update-fees.input';
import { AdminGetFeeEntity } from '../entities/admin/admin-get-fees.entity';
import { AdminGetFeesInput } from '../dto/admin/admin-get-fees.input';
import { AdminListFeeEntity } from '../entities/admin/admin-list-fees.entity';
import { AdminListFeesInput } from '../dto/admin/admin-list-fees.input';
import { AdminDeleteFeesInput } from '../dto/admin/admin-delete-fees.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => FeesStructure)
export class AdminFeesResolver {
  constructor(private readonly adminFeesService: AdminFeesService) {}

  // 1.AdminCreateFees
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateFees',
    description: 'Create fees by admin',
  })
  async adminCreateFees(
    @Args('admin_create_fees_input')
    adminCreateFeesInput: AdminCreateFeesInput,
  ) {
    return this.adminFeesService.adminCreateFees(adminCreateFeesInput);
  }

  // 2.AdminUpdateFees
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateFees',
    description: 'update fees by admin',
  })
  async adminUpdateFees(
    @Args('admin_update_fees_input')
    adminUpdateFeesInput: AdminUpdateFeesInput,
  ) {
    return this.adminFeesService.adminUpdateFees(adminUpdateFeesInput);
  }

  // 3.AdminGetFees

  @Query(() => AdminGetFeeEntity, {
    name: 'adminGetFees',
    description: 'admin get the fees.',
  })
  async adminGetSubject(
    @Args('admin_get_fees_input') adminGetFeesInput: AdminGetFeesInput,
  ): Promise<AdminGetFeeEntity> {
    return this.adminFeesService.adminGetFees(adminGetFeesInput);
  }

  //   4.AdminListFees
  @Query(() => AdminListFeeEntity, {
    name: 'adminListFees',
    description: 'admin list the fees.',
  })
  async adminListSubject(
    @Args('admin_list_fees_input') adminListFeesInput: AdminListFeesInput,
  ): Promise<AdminListFeeEntity> {
    return this.adminFeesService.adminListFees(adminListFeesInput);
  }

  //   5.AdminDeleteFees
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteFees',
    description: 'Delete fees by admin',
  })
  async adminDeleteFees(
    @Args('admin_delete_fees_input')
    adminDeleteFeesInput: AdminDeleteFeesInput,
  ) {
    return this.adminFeesService.adminDeleteFees(adminDeleteFeesInput);
  }
}
