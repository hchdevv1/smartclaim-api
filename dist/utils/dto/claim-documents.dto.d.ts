import { HttpMessageDto } from './http-status-message.dto';
export declare class CreateClaimDocumentDto {
    HN: string;
    VN: string;
    RefId: string;
    TransactionNo: string;
    DocumentTypeCode: string;
    DocumentTypeName: string;
    FilePath: string;
    FileSize?: number;
    FileMimeType?: string;
    ServerPath?: string;
    UploadedBy?: string;
    Runningdocument: number;
}
export declare class QueryCreateClaimDocumentDtoBodyDto {
    RefId?: string;
    TransactionNo?: string;
    InsurerCode: number;
    HN?: string;
    VN?: string;
    DocumentName?: string;
    DocumenttypeCode?: string;
    UploadedBy?: string;
    Runningdocument: number;
}
export declare class ResultAttachDocListInfoDto {
    Base64Data: string;
    DocName: string;
}
export declare class QuerylistDocumentNameDtoBodyDto {
    PatientInfo: requestDocument;
}
declare class requestDocument {
    RefId?: string;
    TransactionNo?: string;
    HN?: string;
    VN?: string;
    DocumentName?: string;
    DocumenttypeCode?: string;
    UploadedBy?: string;
    Runningdocument: number;
}
export declare class QueryDeleteDocumentByDocNameDto {
    PatientInfo: DeleteDocumentByDocName;
}
declare class DeleteDocumentByDocName {
    RefId?: string;
    TransactionNo?: string;
    DocumentName?: string;
    DocumenttypeCode?: string;
}
export declare class ResultDeleteDocumentByDocNameDto {
    HTTPStatus: HttpMessageDto;
    Result?: DeleteDocumentInfo;
}
export declare class DeleteDocumentInfo {
    DeleteDocumentInfo?: string;
}
export declare class ResultUpdateDocumentByDocNameDto {
    HTTPStatus: HttpMessageDto;
    Result?: UpdateDocumentInfo;
}
export declare class UpdateDocumentInfo {
    UpdateDocumentInfo?: string;
}
export declare class QueryListDocumentforAttachDocListDto {
    PatientInfo: ListDocumentforAttachDocListDto;
}
declare class ListDocumentforAttachDocListDto {
    RefId?: string;
    TransactionNo?: string;
    DocumentName?: string;
    DocumenttypeCode?: string;
    Runningdocument?: number;
}
export {};
