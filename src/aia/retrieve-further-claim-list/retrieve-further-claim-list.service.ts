import { Injectable } from '@nestjs/common';
import { CreateRetrieveFurtherClaimListDto } from './dto/create-retrieve-further-claim-list.dto';
import { UpdateRetrieveFurtherClaimListDto } from './dto/update-retrieve-further-claim-list.dto';

@Injectable()
export class RetrieveFurtherClaimListService {
  create(createRetrieveFurtherClaimListDto: CreateRetrieveFurtherClaimListDto) {
    return 'This action adds a new retrieveFurtherClaimList';
  }

  findAll() {
    return `This action returns all retrieveFurtherClaimList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retrieveFurtherClaimList`;
  }

  update(id: number, updateRetrieveFurtherClaimListDto: UpdateRetrieveFurtherClaimListDto) {
    return `This action updates a #${id} retrieveFurtherClaimList`;
  }

  remove(id: number) {
    return `This action removes a #${id} retrieveFurtherClaimList`;
  }
}
