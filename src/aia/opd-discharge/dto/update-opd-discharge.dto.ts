import { PartialType } from '@nestjs/mapped-types';
import { CreateOpdDischargeDto } from './create-opd-discharge.dto';

export class UpdateOpdDischargeDto extends PartialType(CreateOpdDischargeDto) {}
