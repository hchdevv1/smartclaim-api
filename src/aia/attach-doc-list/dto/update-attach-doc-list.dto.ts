import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachDocListDto } from './create-attach-doc-list.dto';

export class UpdateAttachDocListDto extends PartialType(CreateAttachDocListDto) {}
