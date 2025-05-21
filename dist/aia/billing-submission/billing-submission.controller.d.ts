import { BillingSubmissionService } from './billing-submission.service';
import { QueryBillingSubmissionBodyDto } from './dto/query-billing-submission.dto';
export declare class BillingSubmissionController {
    private readonly billingSubmissionService;
    constructor(billingSubmissionService: BillingSubmissionService);
    getbillingsubmission(queryBillingSubmissionBodyDto: QueryBillingSubmissionBodyDto): Promise<import("./dto/result-billing-submission.dto").ResultBillingSubmissionDto>;
}
