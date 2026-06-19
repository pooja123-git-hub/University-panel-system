import { Injectable } from '@nestjs/common';
import { CreateSemesterInput } from './dto/create-semester.input';
import { UpdateSemesterInput } from './dto/update-semester.input';

@Injectable()
export class SemesterService {
  create(createSemesterInput: CreateSemesterInput) {
    return 'This action adds a new semester';
  }

  findAll() {
    return `This action returns all semester`;
  }

  findOne(id: number) {
    return `This action returns a #${id} semester`;
  }

  update(id: number, updateSemesterInput: UpdateSemesterInput) {
    return `This action updates a #${id} semester`;
  }

  remove(id: number) {
    return `This action removes a #${id} semester`;
  }
}
