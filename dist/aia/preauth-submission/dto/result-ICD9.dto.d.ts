import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultlistICD9InfoDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    ICD9Info?: ICD9InfoDto[];
}
declare class ICD9InfoDto {
    ICD9Id: string;
    ICD9Code: string;
    ICD9Desc: string;
}
export {};
