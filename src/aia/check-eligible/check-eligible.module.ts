import { Module } from '@nestjs/common';
import { CheckEligibleService } from './check-eligible.service';
import { CheckEligibleController } from './check-eligible.controller';

@Module({
  controllers: [CheckEligibleController],
  providers: [CheckEligibleService],
})
export class CheckEligibleModule {}
