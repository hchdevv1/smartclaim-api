import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingSubmissionDto } from './create-billing-submission.dto';

export class UpdateBillingSubmissionDto extends PartialType(CreateBillingSubmissionDto) {}
