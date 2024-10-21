import { Module } from '@nestjs/common';
import { PreauthSubmissionService } from './preauth-submission.service';
import { PreauthSubmissionController } from './preauth-submission.controller';

@Module({
  controllers: [PreauthSubmissionController],
  providers: [PreauthSubmissionService],
})
export class PreauthSubmissionModule {}
