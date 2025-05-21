import { CheckEligibleService } from './check-eligible.service';
import { QueryEligibleBodyDto, QueryCreateTransactionBodyDto } from './dto/query-check-eligible.dto';
export declare class CheckEligibleController {
    private readonly checkEligibleService;
    constructor(checkEligibleService: CheckEligibleService);
    getEpisodeByHN(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<import("./dto/result-check-eligible.dto").EligibleEpisodeListDto>;
    checkeligible(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<import("./dto/result-check-eligible.dto").ResultCheckEligibleDto>;
    crateTransaction(queryCreateTransactionBodyDto: QueryCreateTransactionBodyDto): Promise<import("./dto/result-check-eligible.dto").CreateTransactionDto>;
    getListPolicyNo(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<import("./dto/result-check-eligible.dto").PolicyNumberListDto>;
    getListPolicyNoDetail(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<import("./dto/result-check-eligible.dto").PolicyNumberListDto>;
}
