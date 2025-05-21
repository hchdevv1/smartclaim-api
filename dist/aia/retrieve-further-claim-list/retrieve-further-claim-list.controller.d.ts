import { RetrieveFurtherClaimListService } from './retrieve-further-claim-list.service';
import { QueryRetrieveFurtherClaimBodyDto } from './dto/query-retrieve-further-claim-list.dto';
export declare class RetrieveFurtherClaimListController {
    private readonly retrieveFurtherClaimListService;
    constructor(retrieveFurtherClaimListService: RetrieveFurtherClaimListService);
    getEpisodeByHN(queryRetrieveFurtherClaimBodyDto: QueryRetrieveFurtherClaimBodyDto): Promise<import("./dto/result-retrieve-further-claim-list.dto").ResultRetrieveFurtherClaimDto>;
}
