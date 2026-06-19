import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeeService } from './fee.service';
import { Fee } from './entities/fee.entity';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.input';

@Resolver(() => Fee)
export class FeeResolver {
  constructor(private readonly feeService: FeeService) {}

  @Mutation(() => Fee)
  createFee(@Args('createFeeInput') createFeeInput: CreateFeeInput) {
    return this.feeService.create(createFeeInput);
  }

  @Query(() => [Fee], { name: 'fee' })
  findAll() {
    return this.feeService.findAll();
  }

  @Query(() => Fee, { name: 'fee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feeService.findOne(id);
  }

  @Mutation(() => Fee)
  updateFee(@Args('updateFeeInput') updateFeeInput: UpdateFeeInput) {
    return this.feeService.update(updateFeeInput.id, updateFeeInput);
  }

  @Mutation(() => Fee)
  removeFee(@Args('id', { type: () => Int }) id: number) {
    return this.feeService.remove(id);
  }
}
