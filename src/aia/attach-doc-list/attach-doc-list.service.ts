import { Injectable } from '@nestjs/common';
import { CreateAttachDocListDto } from './dto/create-attach-doc-list.dto';
import { UpdateAttachDocListDto } from './dto/update-attach-doc-list.dto';

@Injectable()
export class AttachDocListService {
  create(createAttachDocListDto: CreateAttachDocListDto) {
    return 'This action adds a new attachDocList';
  }

  findAll() {
    return `This action returns all attachDocList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachDocList`;
  }

  update(id: number, updateAttachDocListDto: UpdateAttachDocListDto) {
    return `This action updates a #${id} attachDocList`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachDocList`;
  }
}
