import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultIPDVitalSignDto {
    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
}
export declare class TrakcareResultInfo {
    VitalSignInfo?: QueryVitalSign[];
}
export declare class QueryVitalSign {
    DiastolicBp?: string;
    HeartRate?: string;
    OxygenSaturation?: string;
    PainScore?: string;
    RespiratoryRate?: string;
    SystolicBp?: string;
    Temperature?: string;
    VitalSignEntryDateTime?: string;
}
