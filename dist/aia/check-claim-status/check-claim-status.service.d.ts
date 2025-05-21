import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { QueryCheckClaimStatusBodyDto } from './dto/query-check-claim-status.dto';
import { QueryCheckClaimStatusListAllBodyDto } from './dto/query-check-claim-status-listall.dto';
import { ResultCheckClaimStatusDto } from './dto/result-check-claim-status.dto';
import { ResultCheckClaimStatusListAllDto } from './dto/result-check-claim-status-listall.dto';
export declare class CheckClaimStatusService {
    private readonly httpService;
    private readonly utilsService;
    constructor(httpService: HttpService, utilsService: UtilsService);
    Checkclaimstatus(queryCheckClaimStatusBodyDto: QueryCheckClaimStatusBodyDto): Promise<ResultCheckClaimStatusDto>;
    getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto: QueryCheckClaimStatusListAllBodyDto): Promise<ResultCheckClaimStatusListAllDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
