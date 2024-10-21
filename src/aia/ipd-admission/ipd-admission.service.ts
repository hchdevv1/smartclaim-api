import { Injectable } from '@nestjs/common';
import { CreateIpdAdmissionDto } from './dto/create-ipd-admission.dto';
import { UpdateIpdAdmissionDto } from './dto/update-ipd-admission.dto';

@Injectable()
export class IpdAdmissionService {
  create(createIpdAdmissionDto: CreateIpdAdmissionDto) {
    return 'This action adds a new ipdAdmission';
  }

  findAll() {
    return `This action returns all ipdAdmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipdAdmission`;
  }

  update(id: number, updateIpdAdmissionDto: UpdateIpdAdmissionDto) {
    return `This action updates a #${id} ipdAdmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipdAdmission`;
  }
}
