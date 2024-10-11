import {  IsInt,  IsString ,IsOptional} from 'class-validator';

export class QueryAttachBodyDto {
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
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    IdType?: string;
    
    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    VN?: string;

    @IsString()
    @IsOptional()
    InvoiceNumber?: string;

    @IsString()
    @IsOptional()
    DocumenttypeCode?: string;
    
  }