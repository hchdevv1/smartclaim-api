import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

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
}


export class QueryCreateClaimDocumentDtoBodyDto {

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
  }

  export class ResultAttachDocListInfoDto {
    Base64Data: string; 
    DocName: string;
  }
  