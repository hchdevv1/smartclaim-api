import { Injectable } from '@nestjs/common';
import { CreateOpdDischargeDto } from './dto/create-opd-discharge.dto';
import { UpdateOpdDischargeDto } from './dto/update-opd-discharge.dto';

@Injectable()
export class OpdDischargeService {
  create(createOpdDischargeDto: CreateOpdDischargeDto) {
    return 'This action adds a new opdDischarge';
  }

  findAll() {
    return `This action returns all opdDischarge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opdDischarge`;
  }

  update(id: number, updateOpdDischargeDto: UpdateOpdDischargeDto) {
    return `This action updates a #${id} opdDischarge`;
  }

  remove(id: number) {
    return `This action removes a #${id} opdDischarge`;
  }
}
