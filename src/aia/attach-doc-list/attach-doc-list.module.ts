import { Module } from '@nestjs/common';
import { AttachDocListService } from './attach-doc-list.service';
import { AttachDocListController } from './attach-doc-list.controller';

@Module({
  controllers: [AttachDocListController],
  providers: [AttachDocListService],
})
export class AttachDocListModule {}
