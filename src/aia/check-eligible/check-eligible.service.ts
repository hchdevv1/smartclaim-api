import { Injectable } from '@nestjs/common';
import { CreateCheckEligibleDto } from './dto/create-check-eligible.dto';
import { UpdateCheckEligibleDto } from './dto/update-check-eligible.dto';

@Injectable()
export class CheckEligibleService {
  create(createCheckEligibleDto: CreateCheckEligibleDto) {
    return 'This action adds a new checkEligible';
  }

  findAll() {
    return `This action returns all checkEligible`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkEligible`;
  }

  update(id: number, updateCheckEligibleDto: UpdateCheckEligibleDto) {
    return `This action updates a #${id} checkEligible`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkEligible`;
  }
}
