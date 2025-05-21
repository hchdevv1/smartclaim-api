import { ClaimCancelService } from './claim-cancel.service';
import { QueryClaimCancelBodyDto } from './dto/query-claim-cancel.dto';
export declare class ClaimCancelController {
    private readonly claimCancelService;
    constructor(claimCancelService: ClaimCancelService);
    getclaimcancel(queryClaimCancelBodyDto: QueryClaimCancelBodyDto): Promise<import("./dto/result-claim-cancel.dto").ResultClaimCancelDto>;
}
