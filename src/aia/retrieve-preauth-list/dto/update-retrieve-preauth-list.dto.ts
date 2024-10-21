import { PartialType } from '@nestjs/mapped-types';
import { CreateRetrievePreauthListDto } from './create-retrieve-preauth-list.dto';

export class UpdateRetrievePreauthListDto extends PartialType(CreateRetrievePreauthListDto) {}
