import {  IsBoolean, IsInt, IsArray,IsObject,
  IsOptional, IsString ,ValidateNested} from 'class-validator';
  import { Type } from 'class-transformer';

import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';


export class ResultSubmitOpdDischargeDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo{
 
}
 export class ResultPatientInfoDto {
  @IsString()
  @IsOptional()
  Dob?: string;

  @IsString()
  @IsOptional()
  Gender?: string;

  @IsString()
  @IsOptional()
  Hn?: string;

}
export class ResultVisitInfoDto {
 
  @IsString()
  @IsOptional()
  FurtherClaimId?: string;
  @IsString()
  @IsOptional()
  AccidentCauseOver45Days?: string;
  @IsString()
  @IsOptional()
  AdditionalNote?: string;

  @IsBoolean()
  @IsOptional()
  AlcoholRelated: boolean;
  @IsString()
  @IsOptional()
  ChiefComplaint?: string;
  @IsString()
  @IsOptional()
  ComaScore?: string;
  @IsString()
  @IsOptional()
  DxFreeText?: string;
  @IsString()
  @IsOptional()
  ExpectedDayOfRecovery?: string;
  @IsString()
  @IsOptional()
  Height?: string;
  @IsString()
  @IsOptional()
  PhysicalExam?: string;

  @IsString()
  @IsOptional()
  PlanOfTreatment?: string;
  @IsBoolean()
  @IsOptional()
  Pregnant: boolean;
  @IsString()
  @IsOptional()
  PresentIllness?: string;

  @IsString()
  @IsOptional()
  PreviousTreatmentDate?: string;

  @IsString()
  @IsOptional()
  PreviousTreatmentDetail?: string;
  @IsBoolean()
  @IsOptional()
  PrivateCase: boolean;

  @IsString()
  @IsOptional()
  ProcedureFreeText?: string;

  @IsString()
  @IsOptional()
  SignSymptomsDate?: string;

  @IsString()
  @IsOptional()
  UnderlyingCondition?: string;

  @IsString()
  @IsOptional()
  VisitDateTime?: string;

  @IsString()
  @IsOptional()
  Vn?: string;

  @IsString()
  @IsOptional()
  Weight?: string;

}
  export class ResultVitalSignInfoDto {
    @IsString()
    @IsOptional()
    DiastolicBp: string; 
    @IsString()
    @IsOptional()
    HeartRate: string; 
    @IsString()
    @IsOptional()
    OxygenSaturation: string;
    @IsString()
    @IsOptional()
    PainScore: string; 
    @IsString()
    @IsOptional()
    RespiratoryRate: string; 
    @IsString()
    @IsOptional()
    SystolicBp: string; 
    @IsString()
    @IsOptional()
    Temperature: string;
    @IsString()
    @IsOptional()
    VitalSignEntryDateTime: string; 
  }
  export class ResultDoctorInfoDto {
    @IsString()
    @IsOptional()
    DoctorLicense: string;
    @IsString()
    @IsOptional() 
    DoctorRole: string;
    @IsString()
    @IsOptional() 
    DoctorFirstName: string;
    @IsString()
    @IsOptional()
    DoctorLastName: string; 
  }
  export class ResultDiagnosisInfoDto {
    
    @IsString()
    @IsOptional()
    DxName: string; 
    @IsString()
    @IsOptional()
    DxType: string; 
    @IsString()
    @IsOptional()
    Icd10: string; 
  }
  export class ResultProcedureInfoDto {
    @IsString()
    @IsOptional()
    Icd9: string;
    @IsString()
    @IsOptional() 
    ProcedureDate: string;
    @IsString()
    @IsOptional() 
    ProcedureName: string; 
  }
  export class ResultInvestigationInfoDto {
    @IsString()
    @IsOptional()
    InvestigationCode: string; 
    @IsString()
    @IsOptional()
    InvestigationGroup: string; 
    @IsString()
    @IsOptional()
    InvestigationName: string;
    @IsString()
    @IsOptional()
    InvestigationResult: string;
    @IsString()
    @IsOptional() 
    ResultDateTime: string; 
  }
  export class ResultOrderItemInfoDto {
    @IsString()
    @IsOptional()
    ItemId: string; 
    @IsString()
    @IsOptional()
    ItemName: string; 
    @IsString()
    @IsOptional()
    ItemAmount: string;
    @IsString()
    @IsOptional()
    Discount: string;
    @IsString()
    @IsOptional() 
    Initial: string; 
    @IsString()
    @IsOptional()
    LocalBillingCode: string; 
    @IsString()
    @IsOptional()
    LocalBillingName: string;
    @IsString()
    @IsOptional()
    Location: string; 
    @IsString()
    @IsOptional()
    NetAmount: string; 
    @IsString()
    @IsOptional()
    SimbVersion: string; 
    @IsString()
    @IsOptional()
    Terminology: string; 
  }
  export class ResultBillingInfoDto {

    @IsString()
    @IsOptional()
    LocalBillingCode: string; 
    @IsString()
    @IsOptional()
    LocalBillingName: string; 
    @IsString()
    @IsOptional()
    SimbBillingCode: string;
    @IsString()
    @IsOptional()
    PayorBillingCode: string; 
    @IsString()
    @IsOptional()
    BillingInitial: string; 
    @IsString()
    @IsOptional()
    BillingDiscount: string; 
    @IsString()
    @IsOptional()
    BillingNetAmount: string;

  }

  export class ResultAttachDocListInfoDto {
    @IsString()
    @IsOptional()
    Base64Data: string; 
    @IsString()
    @IsOptional()
    DocName: string;
  }

  class ItemBillingCheckBalance{

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingInfo)
    @IsOptional()
    BillingInfo?: BillingInfo[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    @IsOptional()
    OrderItem?: OrderItem[];
  
    @IsString()
    @IsOptional()
    TotalBillAmount?: string;
  
    }
    class BillingInfo{
  
      @IsString()
      @IsOptional()
      LocalBillingCode?: string;
  
      @IsString()
      @IsOptional()
      LocalBillingName?: string;
      
      @IsString()
      @IsOptional()
      SimbBillingCode?: string;
  
      @IsString()
      @IsOptional()
      PayorBillingCode?: string;
  
      @IsString()
      @IsOptional()
      BillingInitial?: string;
  
      @IsString()
      @IsOptional()
      BillingDiscount?: string;
  
      @IsString()
      @IsOptional()
      BillingNetAmount?: string;
  
      }
    class OrderItem{
  
        @IsString()
        @IsOptional()
        Discount?: string;
    
        @IsString()
        @IsOptional()
        Initial?: string;
        
        @IsString()
        @IsOptional()
        ItemAmount?: string;
    
        @IsString()
        @IsOptional()
        ItemId?: string;
    
        @IsString()
        @IsOptional()
        ItemName?: string;
    
        @IsString()
        @IsOptional()
        LocalBillingCode?: string;
    
        @IsString()
        @IsOptional()
        LocalBillingName?: string;
  
        @IsString()
        @IsOptional()
        NetAmount?: string;
    
        }

  export class QuerySubmitOpdDischargeDto {
    PatientInfo?: SearchPatientBodyDto
  }

class SearchPatientBodyDto{
    
    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;


    
    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    VisitDateTime?: string;

    @IsString()
    @IsOptional()
    AccidentDate?: string;

    @IsOptional()
    ItemBillingCheckBalance?: ItemBillingCheckBalance;

    @IsString()
    @IsOptional()
    ICD10?: string;

    @IsString()
    @IsOptional()
    FurtherClaimId?: string;

    @IsString()
    @IsOptional()
    AccidentCauseOver45Days?: string;
  }


class PatientDto {
  @IsString()
  Dob?: string;

  @IsString()
  Gender?: string;

  @IsString()
  Hn?: string;
}

class VisitDto {
  @IsString()
  FurtherClaimId?: string;

  @IsString()
  AccidentCauseOver45Days?: string;

  @IsString()
  AdditionalNote?: string;

  @IsBoolean()
  AlcoholRelated?: boolean;

  @IsString()
  ChiefComplaint?: string;

  @IsString()
  ComaScore?: string;

  @IsString()
  DxFreeText?: string;

  @IsString()
  ExpectedDayOfRecovery?: string;

  @IsString()
  Height?: string;

  @IsString()
  PhysicalExam?: string;

  @IsString()
  PlanOfTreatment?: string;

  @IsBoolean()
  Pregnant?: boolean;

  @IsString()
  PresentIllness?: string;

  @IsString()
  PreviousTreatmentDate?: string;

  @IsString()
  PreviousTreatmentDetail?: string;

  @IsBoolean()
  PrivateCase?: boolean;

  @IsString()
  ProcedureFreeText?: string;

  @IsString()
  SignSymptomsDate?: string;

  @IsString()
  UnderlyingCondition?: string;

  @IsString()
  VisitDateTime?: string;

  @IsString()
  Vn?: string;

  @IsString()
  Weight?: string;
}

class VitalSignDto {
  @IsString()
  DiastolicBp: string;

  @IsString()
  HeartRate: string;

  @IsString()
  OxygenSaturation: string;

  @IsString()
  PainScore: string;

  @IsString()
  RespiratoryRate: string;

  @IsString()
  SystolicBp: string;

  @IsString()
  Temperature: string;

  @IsString()
  VitalSignEntryDateTime: string;
}

class DiagnosisDto {
  @IsString()
  DxName: string;

  @IsString()
  DxType: string;

  @IsString()
  Icd10: string;
}

class AccidentDetailDto {
  @IsString()
  AccidentPlace: string;

  @IsString()
  AccidentDate: string;

  @IsArray()
  CauseOfInjuryDetail: Array<{
      CauseOfInjury: string;
      CommentOfInjury: string;
  }>;

  @IsArray()
  InjuryDetail: Array<{
      WoundType: string;
      InjurySide: string;
      InjuryArea: string;
  }>;
}

class ProcedureDto {
  @IsString()
  Icd9: string;

  @IsString()
  ProcedureDate: string;

  @IsString()
  ProcedureName: string;
}

class InvestigationDto {
  @IsString()
  InvestigationCode: string;

  @IsString()
  InvestigationGroup: string;

  @IsString()
  InvestigationName: string;

  @IsString()
  InvestigationResult: string;

  @IsString()
  ResultDateTime: string;
}

class OrderItemDto {
  @IsString()
  Discount: string;

  @IsString()
  Initial: string;

  @IsString()
  ItemAmount: string;

  @IsString()
  ItemId: string;

  @IsString()
  ItemName: string;

  @IsString()
  LocalBillingCode: string;

  @IsString()
  LocalBillingName: string;

  @IsString()
  NetAmount: string;
}

class DoctorDto {
  @IsString()
  DoctorLicense: string;

  @IsString()
  DoctorRole: string;

  @IsString()
  DoctorFirstName: string;

  @IsString()
  DoctorLastName: string;
}

class BillingDto {
  @IsString()
  LocalBillingCode: string;

  @IsString()
  LocalBillingName: string;

  @IsString()
  SimbBillingCode: string;

  @IsString()
  PayorBillingCode: string;

  @IsString()
  BillingInitial: string;

  @IsString()
  BillingDiscount: string;

  @IsString()
  BillingNetAmount: string;
}

class PssDto {
  @IsString()
  Exclusion: string;

  @IsString()
  FinalScore: string;

  @IsArray()
  Findings: Array<{
      Description: string;
      Exclusion: string;
      Medical: string;
      Reference: string;
  }>;

  @IsString()
  Id: string;

  @IsString()
  Medical: string;
}

  export class ResultDataJsonDto {
    @IsObject()
    Patient: PatientDto;

    @IsObject()
    Visit: VisitDto;

    @IsArray()
    VitalSign: VitalSignDto[];

    @IsArray()
    Diagnosis: DiagnosisDto[];

    @IsObject()
    AccidentDetail: AccidentDetailDto;

    @IsArray()
    Procedure: ProcedureDto[];

    @IsArray()
    Investigation: InvestigationDto[];

    @IsArray()
    OrderItem: OrderItemDto[];

    @IsArray()
   Doctor: DoctorDto[];

    @IsArray()
    Billing: BillingDto[];

    @IsString()
    TotalBillAmount: string;

    @IsObject()
    Pss: PssDto;
}


export class CoverageList{
  @IsString()
  @IsOptional()
  Type?: string;
  @IsString()
  @IsOptional()
  Status?: string;
}
