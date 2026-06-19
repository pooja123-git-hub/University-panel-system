import { Injectable } from '@nestjs/common';
import { CreateFeeInput } from './dto/create-fee.input';
import { UpdateFeeInput } from './dto/update-fee.input';

@Injectable()
export class FeeService {
  create(createFeeInput: CreateFeeInput) {
    return 'This action adds a new fee';
  }

  findAll() {
    return `This action returns all fee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fee`;
  }

  update(id: number, updateFeeInput: UpdateFeeInput) {
    return `This action updates a #${id} fee`;
  }

  remove(id: number) {
    return `This action removes a #${id} fee`;
  }
}
