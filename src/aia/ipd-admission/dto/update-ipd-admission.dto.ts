import { PartialType } from '@nestjs/mapped-types';
import { CreateIpdAdmissionDto } from './create-ipd-admission.dto';

export class UpdateIpdAdmissionDto extends PartialType(CreateIpdAdmissionDto) {}
