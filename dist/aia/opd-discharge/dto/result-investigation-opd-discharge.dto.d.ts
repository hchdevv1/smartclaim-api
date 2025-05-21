import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultOpdDischargeInvestigationDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    InvestigationInfo?: QueryInvestigation[];
}
export declare class QueryInvestigation {
    InvestigationCode?: string;
    InvestigationGroup?: string;
    InvestigationName?: string;
    InvestigationResult?: string;
    ResultDateTime?: string;
}
