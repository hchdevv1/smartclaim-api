import { PartialType } from '@nestjs/mapped-types';
import { CreateRetrieveFurtherClaimListDto } from './create-retrieve-further-claim-list.dto';

export class UpdateRetrieveFurtherClaimListDto extends PartialType(CreateRetrieveFurtherClaimListDto) {}
