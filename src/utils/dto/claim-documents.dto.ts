import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { HttpMessageDto } from './http-status-message.dto';
import { Transform } from 'class-transformer';

export class CreateClaimDocumentDto {
  @IsNotEmpty()
  @IsString()
  HN: string; // หมายเลขผู้ป่วย

  @IsNotEmpty()
  @IsString()
  VN: string; // หมายเลขการเยี่ยม

  @IsNotEmpty()
  @IsString()
  RefId: string; // อ้างอิงไปยังข้อมูลที่เกี่ยวข้อง

  @IsNotEmpty()
  @IsString()
  TransactionNo: string; // หมายเลขการทำธุรกรรม


  @IsNotEmpty()
  @IsString()
  DocumentTypeCode: string; // รหัสประเภทของเอกสาร

  @IsNotEmpty()
  @IsString()
  DocumentTypeName: string; // ชื่อประเภทของเอกสาร

  @IsNotEmpty()
  @IsString()
  FilePath: string; // เก็บที่อยู่ไฟล์ในระบบไฟล์ (path)

  @IsOptional()
  @IsInt()
  FileSize?: number; // ขนาดไฟล์ (หน่วยเป็นไบต์)

  @IsOptional()
  @IsString()
  FileMimeType?: string; // MIME Type ของไฟล์ เช่น application/pdf, image/jpeg

  @IsOptional()
  @IsString()
  ServerPath?: string; // ที่อยู่ของเซิร์ฟเวอร์ที่ไฟล์ถูกเก็บ เช่น URL, IP

  @IsOptional()
  @IsString()
  UploadedBy?: string; // ผู้ที่ทำการอัพโหลดไฟล์


  @IsInt()
  @Transform(({ value }) => parseInt(value)) // แปลง string เป็น number
  @IsOptional()
  Runningdocument: number;
}


export class QueryCreateClaimDocumentDtoBodyDto {

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;

    @IsInt()
    @IsOptional()
    InsurerCode:number

    @IsString()
    @IsOptional()
    HN?: string;
    
    @IsString()
    @IsOptional()
    VN?: string;
    
    @IsString()
    @IsOptional()
    DocumentName?: string;

    @IsString()
    @IsOptional()
    DocumenttypeCode?: string;

    @IsString()
    @IsOptional()
    UploadedBy?: string;

    @IsInt()
  @Transform(({ value }) => parseInt(value)) // แปลง string เป็น number
  @IsOptional()
  Runningdocument: number;
  }

  export class ResultAttachDocListInfoDto {
    Base64Data: string; 
    DocName: string;
  }
  


  export class QuerylistDocumentNameDtoBodyDto {
    PatientInfo:requestDocument
  }
  class requestDocument{
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
    DocumentName?: string;

    @IsString()
    @IsOptional()
    DocumenttypeCode?: string;

    @IsString()
    @IsOptional()
    UploadedBy?: string;

    @IsInt()
    @Transform(({ value }) => parseInt(value)) // แปลง string เป็น number
    @IsOptional()
    Runningdocument: number;

  }


  export class QueryDeleteDocumentByDocNameDto {
    PatientInfo:DeleteDocumentByDocName
  }
  class DeleteDocumentByDocName{
 @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;
    
    @IsString()
    @IsOptional()
    DocumentName?: string;

    @IsString()
    @IsOptional()
    DocumenttypeCode?: string;

  }
export class ResultDeleteDocumentByDocNameDto {

  HTTPStatus: HttpMessageDto;
  Result?: DeleteDocumentInfo;
}
export class DeleteDocumentInfo {
  DeleteDocumentInfo?:string
}

export class ResultUpdateDocumentByDocNameDto {

  HTTPStatus: HttpMessageDto;
  Result?: UpdateDocumentInfo;
}
export class UpdateDocumentInfo {
  UpdateDocumentInfo?:string
}


export class QueryListDocumentforAttachDocListDto {
  PatientInfo:ListDocumentforAttachDocListDto
}
class ListDocumentforAttachDocListDto{
@IsString()
  @IsOptional()
  RefId?: string;

  @IsString()
  @IsOptional()
  TransactionNo?: string;
  
  @IsString()
  @IsOptional()
  DocumentName?: string;

  @IsString()
  @IsOptional()
  DocumenttypeCode?: string;

  @IsInt()
  @IsOptional()
  Runningdocument?: number;

}