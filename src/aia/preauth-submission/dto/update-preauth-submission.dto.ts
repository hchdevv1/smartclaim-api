import { PartialType } from '@nestjs/mapped-types';
import { CreatePreauthSubmissionDto } from './create-preauth-submission.dto';

export class UpdatePreauthSubmissionDto extends PartialType(CreatePreauthSubmissionDto) {}
