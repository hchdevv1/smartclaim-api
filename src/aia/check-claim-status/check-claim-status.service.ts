import { Injectable } from '@nestjs/common';
import { CreateCheckClaimStatusDto } from './dto/create-check-claim-status.dto';
import { UpdateCheckClaimStatusDto } from './dto/update-check-claim-status.dto';

@Injectable()
export class CheckClaimStatusService {
  create(createCheckClaimStatusDto: CreateCheckClaimStatusDto) {
    return 'This action adds a new checkClaimStatus';
  }

  findAll() {
    return `This action returns all checkClaimStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkClaimStatus`;
  }

  update(id: number, updateCheckClaimStatusDto: UpdateCheckClaimStatusDto) {
    return `This action updates a #${id} checkClaimStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkClaimStatus`;
  }
}
