import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { QueryRetrieveFurtherClaimBodyDto } from './dto/query-retrieve-further-claim-list.dto';
import { ResultRetrieveFurtherClaimDto } from './dto/result-retrieve-further-claim-list.dto';
export declare class RetrieveFurtherClaimListService {
    private readonly httpService;
    private readonly trakcareService;
    private readonly utilsService;
    constructor(httpService: HttpService, trakcareService: TrakcareService, utilsService: UtilsService);
    RetrieveFurtherClaim(queryRetrieveFurtherClaimBodyDto: QueryRetrieveFurtherClaimBodyDto): Promise<ResultRetrieveFurtherClaimDto>;
    formatDateBangkok: (dateString: string) => string;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
