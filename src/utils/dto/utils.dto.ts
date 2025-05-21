import {  IsInt,IsString ,IsArray, IsOptional,ValidateNested } from 'class-validator';
import { HttpMessageDto } from './http-status-message.dto';
import { Type } from 'class-transformer';

export class aia_accessTokenDTO {
  accessTokenKey: string;
  tokenStatus: string;
  tokenType: string;
  expireIn: number;
  tokenIssueTime: string;
}


export class IllnessTypeDto {

   HTTPStatus: HttpMessageDto;
    Result?: ResultIllnessTypeInfo;
}
class ResultIllnessTypeInfo{

  @IsString()
  illnesstypecode: string;

  @IsString()
  illnesstypedesc: string;

  @IsInt()
  insurerid: number;

  insurers: InsurerDto;
}

export class IllnessSurgeryDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultIllnessSurgeryInfo;
}
class ResultIllnessSurgeryInfo{

 @IsString()
 ISCode: string;

 @IsString()
 ISDescription: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class PolicyTypeDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultPolicyTypeInfo;
}
class ResultPolicyTypeInfo{

 @IsString()
 PolicyTypeCode: string;

 @IsString()
 PolicyTypeDesc: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class ServiceSettingDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultServiceSettingInfo;
}
class ResultServiceSettingInfo{



 @IsString()
 servicesettingcode: string;

 @IsString()
 servicesettingdesc: string;


 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class ServiceSettingIllnessDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultServiceSettingILLInfo;
}
class ResultServiceSettingILLInfo{

 @IsString()
 code: string;

 @IsString()
 Description: string;

 @IsString()
 servicesettingcode: string;

 @IsString()
 servicesettingdesc: string;
 @IsString()
 IllnesstypeCode: string;

 @IsString()
 IllnesstypeDesc: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class ClaimStatusDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultClaimStatusInfo;
}
class ResultClaimStatusInfo{

 @IsString()
 claimstatuscode: string;

 @IsString()
 claimstatusdesc_en: string;

 @IsString()
 claimstatusdesc_th: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class IdTypeDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultIdTypeInfo;
}
class ResultIdTypeInfo{

 @IsString()
 idtypecode: string;

 @IsString()
 idtypedesc_th: string;

 @IsString()
 idtypedesc_en: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class DocumentTypeDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultDocumentTypeInfo;
}
class ResultDocumentTypeInfo{

 @IsString()
 documenttypecode: string;

 @IsString()
 documenttypename: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class CauseofInjurywoundtypeDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultCauseofInjurywoundtypeInfo;
}
class ResultCauseofInjurywoundtypeInfo{

 @IsString()
 woundtypecode: string;

 @IsString()
 woundtypename: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class CauseofinjurysideDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultCauseofinjurysideInfo;
}
class ResultCauseofinjurysideInfo{

 @IsString()
 injurysidecode: string;

 @IsString()
 injurysidename: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class AccidentplaceDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultAccidentplaceInfo;
}
class ResultAccidentplaceInfo{

 @IsString()
 accidentplacecode: string;

 @IsString()
 accidentplacename: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}

export class Accidentcauseover45daysDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultAccidentcauseover45daysInfo;
}
class ResultAccidentcauseover45daysInfo{

 @IsString()
 causeovercode: string;

 @IsString()
 causeoverdesc: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class AnesthesiaListDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultAnesthesiaListInfo;
}
class ResultAnesthesiaListInfo{

 @IsString()
 aneslistcode: string;

 @IsString()
 aneslistname: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}


export class OpeartionisPackageDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultOpeartionisPackageInfo;
}
class ResultOpeartionisPackageInfo{

 @IsString()
 oiscode: string;

 @IsString()
 oisname: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class IndicationsForAdmissionDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultIndicationsForAdmissionInfo;
}
class ResultIndicationsForAdmissionInfo{

 @IsString()
 ifacode: string;

 @IsString()
 ifaname: string;

 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}
export class ListPackageBundleDto {

  HTTPStatus: HttpMessageDto;
   Result?: ResultListPackageBundleInfo;
}
class ResultListPackageBundleInfo{

 @IsString()
 packagecode: string;

 @IsString()
 packagedesc: string;

}
export class PackageBundleDto {

  HTTPStatus: HttpMessageDto;
   Result?: PackageBundleResultInfo;
}


export class PackageBundleResultInfo {
  @IsString()
  packagecode: string;
 
  @IsString()
  packagedesc: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultPackageBundleInfo)
  @IsOptional()
  packagebundleinfo?: ResultPackageBundleInfo[];
}


export class ResultPackageBundleInfo{

 @IsString()
 localbillingcode: string;

 @IsString()
 localbillingname: string;

 @IsString()
 simbbillingcode: string;

 @IsString()
 payorbillingcode: string;

 @IsString()
 billinginitial: string;

 @IsString()
 billingdiscount: string;

 @IsString()
 billingnetamount: string;

 @IsString()
 totalbillamount:string;
}

export class DiagnosisTypeMappingDto {
  HTTPStatus: HttpMessageDto;
   Result?: ResultDiagnosisTypeMappingInfo;
}
class ResultDiagnosisTypeMappingInfo{

 @IsString()
 dxtypecodetrakcare: string;

 @IsString()
 dxtypenametrakcare: string;
 @IsString()
 dxtypecodeinsurance: string;

 @IsString()
 dxtypenameinsurance: string;
 
 @IsInt()
 insurerid: number;

 insurers: InsurerDto;
}


class InsurerDto {
  @IsInt()
  insurercode: number;

  @IsString()
  insurername: string;
}