import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimCancelDto } from './create-claim-cancel.dto';

export class UpdateClaimCancelDto extends PartialType(CreateClaimCancelDto) {}
