import { Injectable } from '@nestjs/common';
import { CreatePreauthSubmissionDto } from './dto/create-preauth-submission.dto';
import { UpdatePreauthSubmissionDto } from './dto/update-preauth-submission.dto';

@Injectable()
export class PreauthSubmissionService {
  create(createPreauthSubmissionDto: CreatePreauthSubmissionDto) {
    return 'This action adds a new preauthSubmission';
  }

  findAll() {
    return `This action returns all preauthSubmission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preauthSubmission`;
  }

  update(id: number, updatePreauthSubmissionDto: UpdatePreauthSubmissionDto) {
    return `This action updates a #${id} preauthSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} preauthSubmission`;
  }
}
