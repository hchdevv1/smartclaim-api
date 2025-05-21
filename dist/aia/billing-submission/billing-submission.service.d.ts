import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { QueryBillingSubmissionBodyDto } from './dto/query-billing-submission.dto';
import { ResultBillingSubmissionDto } from './dto/result-billing-submission.dto';
export declare class BillingSubmissionService {
    private readonly httpService;
    private readonly utilsService;
    constructor(httpService: HttpService, utilsService: UtilsService);
    Billingsubmission(queryBillingSubmissionBodyDto: QueryBillingSubmissionBodyDto): Promise<ResultBillingSubmissionDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
