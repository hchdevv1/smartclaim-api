import { Injectable } from '@nestjs/common';
import { CreateIpdDischargeDto } from './dto/create-ipd-discharge.dto';
import { UpdateIpdDischargeDto } from './dto/update-ipd-discharge.dto';

@Injectable()
export class IpdDischargeService {
  create(createIpdDischargeDto: CreateIpdDischargeDto) {
    return 'This action adds a new ipdDischarge';
  }

  findAll() {
    return `This action returns all ipdDischarge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipdDischarge`;
  }

  update(id: number, updateIpdDischargeDto: UpdateIpdDischargeDto) {
    return `This action updates a #${id} ipdDischarge`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipdDischarge`;
  }
}
