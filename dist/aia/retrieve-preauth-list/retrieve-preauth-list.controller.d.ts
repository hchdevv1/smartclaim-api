import { RetrievePreauthListService } from './retrieve-preauth-list.service';
import { QueryRetrievePreauthListBodyDto } from './dto/query-retrieve-preauth-list.dto';
export declare class RetrievePreauthListController {
    private readonly retrievePreauthListService;
    constructor(retrievePreauthListService: RetrievePreauthListService);
    getcheckclaimstatus(queryRetrievePreauthListBodyDto: QueryRetrievePreauthListBodyDto): Promise<import("./dto/result-retrieve-preauth-list.dto").ResultRetrievePreAuthListDto>;
}
