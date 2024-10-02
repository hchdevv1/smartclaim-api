import { Injectable } from '@nestjs/common';
import { CreateBillingSubmissionDto } from './dto/create-billing-submission.dto';
import { UpdateBillingSubmissionDto } from './dto/update-billing-submission.dto';

@Injectable()
export class BillingSubmissionService {
  create(createBillingSubmissionDto: CreateBillingSubmissionDto) {
    return 'This action adds a new billingSubmission';
  }

  findAll() {
    return `This action returns all billingSubmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billingSubmission`;
  }

  update(id: number, updateBillingSubmissionDto: UpdateBillingSubmissionDto) {
    return `This action updates a #${id} billingSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} billingSubmission`;
  }
}
