import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeeService } from './fee.service';
import { FeesStructure } from './database/fee.entity';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { GetFeesInput } from './dto/get-fees.input';
import { GetFeeEntity } from './entities/get-fee.entity';
import { ListsFeeEntity } from './entities/list-fees-entity';
import { ListFeesInput } from './dto/list-fees.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => FeesStructure)
export class FeeResolver {
  constructor(private readonly feeService: FeeService) {}

  // 1.GetFees
  @Query(() => GetFeeEntity, {
    name: 'getFees',
    description: ' get the fees.',
  })
  async getSubject(
    @Args('get_fees_input') getFeesInput: GetFeesInput,
  ): Promise<GetFeeEntity> {
    return this.feeService.getFees(getFeesInput);
  }

  //   2.ListFees
  @Query(() => ListsFeeEntity, {
    name: 'listFees',
    description: ' list the fees.',
  })
  async listSubject(
    @Args('list_fees_input') listFeesInput: ListFeesInput,
  ): Promise<ListsFeeEntity> {
    return this.feeService.listFees(listFeesInput);
  }
}
