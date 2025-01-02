import { Controller, Get } from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';


@Controller('preauth-submission')
export class PreauthSubmissionController {
  constructor(private readonly preauthSubmissionService: PreauthSubmissionService) {}

 

  @Get()
  findAll() {
    return 'preauthSubmissionService';
  }



}
