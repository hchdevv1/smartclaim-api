import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export declare class ResultlistICDDxInfoDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
}
export declare class ResultInfo {
    ICDDxInfo?: ICDDxInfoDto[];
}
declare class ICDDxInfoDto {
    ICDDxId: string;
    ICDDxCode: string;
    ICDDx: string;
}
export {};
