import { Injectable } from '@nestjs/common';
import { CreateRetrievePreauthListDto } from './dto/create-retrieve-preauth-list.dto';
import { UpdateRetrievePreauthListDto } from './dto/update-retrieve-preauth-list.dto';

@Injectable()
export class RetrievePreauthListService {
  create(createRetrievePreauthListDto: CreateRetrievePreauthListDto) {
    return 'This action adds a new retrievePreauthList';
  }

  findAll() {
    return `This action returns all retrievePreauthList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retrievePreauthList`;
  }

  update(id: number, updateRetrievePreauthListDto: UpdateRetrievePreauthListDto) {
    return `This action updates a #${id} retrievePreauthList`;
  }

  remove(id: number) {
    return `This action removes a #${id} retrievePreauthList`;
  }
}
