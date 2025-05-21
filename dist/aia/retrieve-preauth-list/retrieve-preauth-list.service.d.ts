import { HttpService } from '@nestjs/axios';
import { UtilsService } from '../../utils/utils.service';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { QueryRetrievePreauthListBodyDto } from './dto/query-retrieve-preauth-list.dto';
import { ResultRetrievePreAuthListDto } from './dto/result-retrieve-preauth-list.dto';
export declare class RetrievePreauthListService {
    private readonly httpService;
    private readonly utilsService;
    constructor(httpService: HttpService, utilsService: UtilsService);
    getretrievepreauthlist(queryCheckClaimStatusBodyDto: QueryRetrievePreauthListBodyDto): Promise<ResultRetrievePreAuthListDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
