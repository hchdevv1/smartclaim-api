import {  IsInt,IsString } from 'class-validator';
import { HttpMessageDto } from './http-status-message.dto';

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