import { HttpMessageDto } from './http-status-message.dto';
export declare class aia_accessTokenDTO {
    accessTokenKey: string;
    tokenStatus: string;
    tokenType: string;
    expireIn: number;
    tokenIssueTime: string;
}
export declare class IllnessTypeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultIllnessTypeInfo;
}
declare class ResultIllnessTypeInfo {
    illnesstypecode: string;
    illnesstypedesc: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class IllnessSurgeryDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultIllnessSurgeryInfo;
}
declare class ResultIllnessSurgeryInfo {
    ISCode: string;
    ISDescription: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class PolicyTypeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultPolicyTypeInfo;
}
declare class ResultPolicyTypeInfo {
    PolicyTypeCode: string;
    PolicyTypeDesc: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class ServiceSettingDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultServiceSettingInfo;
}
declare class ResultServiceSettingInfo {
    servicesettingcode: string;
    servicesettingdesc: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class ServiceSettingIllnessDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultServiceSettingILLInfo;
}
declare class ResultServiceSettingILLInfo {
    code: string;
    Description: string;
    servicesettingcode: string;
    servicesettingdesc: string;
    IllnesstypeCode: string;
    IllnesstypeDesc: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class ClaimStatusDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultClaimStatusInfo;
}
declare class ResultClaimStatusInfo {
    claimstatuscode: string;
    claimstatusdesc_en: string;
    claimstatusdesc_th: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class IdTypeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultIdTypeInfo;
}
declare class ResultIdTypeInfo {
    idtypecode: string;
    idtypedesc_th: string;
    idtypedesc_en: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class DocumentTypeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultDocumentTypeInfo;
}
declare class ResultDocumentTypeInfo {
    documenttypecode: string;
    documenttypename: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class CauseofInjurywoundtypeDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultCauseofInjurywoundtypeInfo;
}
declare class ResultCauseofInjurywoundtypeInfo {
    woundtypecode: string;
    woundtypename: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class CauseofinjurysideDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultCauseofinjurysideInfo;
}
declare class ResultCauseofinjurysideInfo {
    injurysidecode: string;
    injurysidename: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class AccidentplaceDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultAccidentplaceInfo;
}
declare class ResultAccidentplaceInfo {
    accidentplacecode: string;
    accidentplacename: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class Accidentcauseover45daysDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultAccidentcauseover45daysInfo;
}
declare class ResultAccidentcauseover45daysInfo {
    causeovercode: string;
    causeoverdesc: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class AnesthesiaListDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultAnesthesiaListInfo;
}
declare class ResultAnesthesiaListInfo {
    aneslistcode: string;
    aneslistname: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class OpeartionisPackageDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultOpeartionisPackageInfo;
}
declare class ResultOpeartionisPackageInfo {
    oiscode: string;
    oisname: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class IndicationsForAdmissionDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultIndicationsForAdmissionInfo;
}
declare class ResultIndicationsForAdmissionInfo {
    ifacode: string;
    ifaname: string;
    insurerid: number;
    insurers: InsurerDto;
}
export declare class ListPackageBundleDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultListPackageBundleInfo;
}
declare class ResultListPackageBundleInfo {
    packagecode: string;
    packagedesc: string;
}
export declare class PackageBundleDto {
    HTTPStatus: HttpMessageDto;
    Result?: PackageBundleResultInfo;
}
export declare class PackageBundleResultInfo {
    packagecode: string;
    packagedesc: string;
    packagebundleinfo?: ResultPackageBundleInfo[];
}
export declare class ResultPackageBundleInfo {
    localbillingcode: string;
    localbillingname: string;
    simbbillingcode: string;
    payorbillingcode: string;
    billinginitial: string;
    billingdiscount: string;
    billingnetamount: string;
    totalbillamount: string;
}
export declare class DiagnosisTypeMappingDto {
    HTTPStatus: HttpMessageDto;
    Result?: ResultDiagnosisTypeMappingInfo;
}
declare class ResultDiagnosisTypeMappingInfo {
    dxtypecodetrakcare: string;
    dxtypenametrakcare: string;
    dxtypecodeinsurance: string;
    dxtypenameinsurance: string;
    insurerid: number;
    insurers: InsurerDto;
}
declare class InsurerDto {
    insurercode: number;
    insurername: string;
}
export {};
