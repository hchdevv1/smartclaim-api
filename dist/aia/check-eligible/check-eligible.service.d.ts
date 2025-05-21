import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { UtilsService } from '../../utils/utils.service';
import { QueryEligibleBodyDto, QueryCreateTransactionBodyDto } from './dto/query-check-eligible.dto';
import { ResultCheckEligibleDto, EligibleEpisodeListDto, InsuranceData, CreateTransactionDto, PolicyNumberListDto } from './dto/result-check-eligible.dto';
export declare class CheckEligibleService {
    private readonly httpService;
    private readonly trakcareService;
    private readonly utilsService;
    constructor(httpService: HttpService, trakcareService: TrakcareService, utilsService: UtilsService);
    getEpisodeByHN(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<EligibleEpisodeListDto>;
    checkeligible(checkEligibleBodyDto: QueryEligibleBodyDto): Promise<ResultCheckEligibleDto>;
    crateTransaction(queryCreateTransactionBodyDto: QueryCreateTransactionBodyDto): Promise<CreateTransactionDto>;
    getListPolicyNo(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<PolicyNumberListDto>;
    getListPolicyNoDetail(queryEligibleBodyDto: QueryEligibleBodyDto): Promise<PolicyNumberListDto>;
    convertCoverageListType(xType: string): string;
    generateRefId(inputVN: string, inputInsurerCode: number, inputServiceSettingCode: string): Promise<any>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
    ListPolicyNumber(insuranceData: InsuranceData, inputhn: string, inputvn: string): Promise<void>;
}
