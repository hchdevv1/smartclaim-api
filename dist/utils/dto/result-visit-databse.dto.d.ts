import { HttpMessageDto } from './http-status-message.dto';
export declare class QueryVisitDatabaseBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
}
export declare class ResultOpdDischargeVisitDto {
    HTTPStatus: HttpMessageDto;
    Result?: VisitDatabaseResultInfo;
}
export declare class QueryVisitDatabse {
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
    VN?: string;
    Weight?: string;
    ExpectedAdmitDate?: string;
    PreauthReferClaimNo?: string;
    PreauthReferOcc?: string;
    IndicationForAdmission?: string;
    DscDateTime?: string;
    IsPackage?: boolean;
    TotalEstimatedCost?: string;
    AnesthesiaList?: string;
    AccidentDate?: string;
    AdmitDateTime?: string;
    IsIPDDischarge?: boolean;
}
export declare class VisitDatabaseResultInfo {
    VisitInfo?: QueryVisitDatabse;
}
