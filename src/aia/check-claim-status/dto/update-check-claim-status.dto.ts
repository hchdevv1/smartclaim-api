import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckClaimStatusDto } from './create-check-claim-status.dto';

export class UpdateCheckClaimStatusDto extends PartialType(CreateCheckClaimStatusDto) {}
