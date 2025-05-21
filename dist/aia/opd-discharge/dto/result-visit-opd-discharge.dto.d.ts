import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultOpdDischargeVisitDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    VisitInfo?: QueryVisit;
}
export declare class QueryVisit {
    FurtherClaimId?: string;
    AccidentCauseOver45Days?: string;
    AdditionalNote?: string;
    AlcoholRelated?: boolean;
    ChiefComplaint?: string;
    ComaScore?: string;
    DxFreeText?: string;
    ExpectedDayOfRecovery?: string;
    Height?: string;
    PhysicalExam?: string;
    PlanOfTreatment?: string;
    Pregnant?: boolean;
    PresentIllness?: string;
    PreviousTreatmentDate?: string;
    PreviousTreatmentDetail?: string;
    PrivateCase?: boolean;
    ProcedureFreeText?: string;
    SignSymptomsDate?: string;
    UnderlyingCondition?: string;
    VisitDateTime?: string;
    Vn?: string;
    Weight?: string;
}
