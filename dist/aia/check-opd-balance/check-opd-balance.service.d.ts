import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
import { ResultlistBillingCheckBalanceDto } from './dto/result-listBillingCheckBalance.dto';
import { ResultSubmitOpdDischargeDto, QuerySubmitOpdDischargeDto } from './dto/result-BillingCheckBalance.dto';
export declare class CheckOpdBalanceService {
    private readonly httpService;
    private readonly trakcareService;
    private readonly utilsService;
    constructor(httpService: HttpService, trakcareService: TrakcareService, utilsService: UtilsService);
    listBillingCheckBalance(xVN: string): Promise<ResultlistBillingCheckBalanceDto>;
    SubmitBillingCheckBalance(querySubmitOpdDischargeDto: QuerySubmitOpdDischargeDto): Promise<ResultSubmitOpdDischargeDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
    convertCoverageListType(xType: string): string;
}
