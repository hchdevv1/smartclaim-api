import { CheckClaimStatusService } from './check-claim-status.service';
import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';
import { QueryCheckClaimStatusListAllBodyDto } from './dto/query-check-claim-status-listall.dto';
export declare class CheckClaimStatusController {
    private readonly checkClaimStatusService;
    constructor(checkClaimStatusService: CheckClaimStatusService);
    getcheckclaimstatus(queryCheckClaimStatusBodyDto: QueryCheckClaimStatusBodyDto): Promise<import("./dto/result-check-claim-status.dto").ResultCheckClaimStatusDto>;
    getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto: QueryCheckClaimStatusListAllBodyDto): Promise<import("./dto/result-check-claim-status-listall.dto").ResultCheckClaimStatusListAllDto>;
}
