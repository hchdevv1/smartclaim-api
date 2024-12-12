import { PartialType } from '@nestjs/mapped-types';
import { CreateIpdDischargeDto } from './create-ipd-discharge.dto';

export class UpdateIpdDischargeDto extends PartialType(CreateIpdDischargeDto) {}
