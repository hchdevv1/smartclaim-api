import { Injectable } from '@nestjs/common';
import { CreateClaimCancelDto } from './dto/create-claim-cancel.dto';
import { UpdateClaimCancelDto } from './dto/update-claim-cancel.dto';

@Injectable()
export class ClaimCancelService {
  create(createClaimCancelDto: CreateClaimCancelDto) {
    return 'This action adds a new claimCancel';
  }

  findAll() {
    return `This action returns all claimCancel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claimCancel`;
  }

  update(id: number, updateClaimCancelDto: UpdateClaimCancelDto) {
    return `This action updates a #${id} claimCancel`;
  }

  remove(id: number) {
    return `This action removes a #${id} claimCancel`;
  }
}
