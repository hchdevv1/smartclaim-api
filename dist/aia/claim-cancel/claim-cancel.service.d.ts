import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { QueryClaimCancelBodyDto } from './dto/query-claim-cancel.dto';
import { ResultClaimCancelDto } from './dto/result-claim-cancel.dto';
export declare class ClaimCancelService {
    private readonly httpService;
    private readonly utilsService;
    constructor(httpService: HttpService, utilsService: UtilsService);
    ClaimCancel(queryClaimCancelBodyDto: QueryClaimCancelBodyDto): Promise<ResultClaimCancelDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
