import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class QueryIPDVisitDto {
    PatientInfo?: SearchPatientBodyDto;
}
declare class SearchPatientBodyDto {
    InsurerCode: number;
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    AccidentDate?: string;
    AdditionalNote?: string;
    AdmitDateTime?: string;
    AlcoholRelated: boolean;
    ChiefComplaint?: string;
    ComaScore?: string;
    DxFreeText?: string;
    ExpectedDayOfRecovery?: string;
    Height?: string;
    IndicationForAdmission?: string;
    PhysicalExam?: string;
    PlanOfTreatment?: string;
    PreauthReferClaimNo?: string;
    PreauthReferOcc?: string;
    Pregnant: boolean;
    PresentIllness?: string;
    PreviousTreatmentDate?: string;
    PreviousTreatmentDetail?: string;
    PrivateCase: boolean;
    ProcedureFreeText?: string;
    SignSymptomsDate?: string;
    UnderlyingCondition?: string;
    VisitDate?: string;
    VisitDateTime?: string;
    DscDateTime?: string;
    ExpectedAdmitDate?: string;
    IsPackage: boolean;
    TotalEstimatedCost?: string;
    AnesthesiaList?: string;
    Weight?: string;
    HaveProcedure: boolean;
    HaveAccidentCauseOfInjuryDetail: boolean;
    HaveAccidentInjuryDetail: boolean;
    IsIPDDischarge?: boolean;
}
export declare class ResultSubmitIPDVisitDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
declare class ResultInfo {
    ProcedureInfo?: SearchPatientBodyDto[];
}
export {};
