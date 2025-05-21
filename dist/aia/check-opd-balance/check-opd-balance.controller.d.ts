import { CheckOpdBalanceService } from './check-opd-balance.service';
import { QuerySubmitOpdDischargeDto } from './dto/result-BillingCheckBalance.dto';
export declare class CheckOpdBalanceController {
    private readonly checkOpdBalanceService;
    constructor(checkOpdBalanceService: CheckOpdBalanceService);
    listBillingCheckBalance(xVN: string): Promise<import("./dto/result-listBillingCheckBalance.dto").ResultlistBillingCheckBalanceDto>;
    SubmitBillingCheckBalance(querySubmitOpdDischargeDto: QuerySubmitOpdDischargeDto): Promise<import("./dto/result-BillingCheckBalance.dto").ResultSubmitOpdDischargeDto>;
}
