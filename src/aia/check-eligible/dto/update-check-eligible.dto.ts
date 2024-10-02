import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckEligibleDto } from './create-check-eligible.dto';

export class UpdateCheckEligibleDto extends PartialType(CreateCheckEligibleDto) {}
