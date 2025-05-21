// import { IsInt ,IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
// import { Type } from 'class-transformer';
// import { HttpMessageDto } from './http-status-message.dto';

// export class QueryAccidentDatabaseBodyDto {

    
//     @IsString()
//     @IsOptional()
//     RefId?: string;

//     @IsString()
//     @IsOptional()
//     TransactionNo?: string;

//     @IsInt()
//     @IsOptional()
//     InsurerCode:number

//     @IsString()
//     @IsOptional()
//     HN?: string;

//     @IsString()
//     @IsOptional()
//     VN?: string;
    
//   }

  
//   export class ResultAccidentDatabaseDto {
//       HTTPStatus: HttpMessageDto;  // ตรวจสอบให้แน่ใจว่า HttpMessageDto ถูกกำหนดอย่างถูกต้อง
//       Result?: AccidentDatabaseResultInfo;  // อาจเป็นตัวเลือก
//   }
//   export class AccidentDatabaseResultInfo {
//     @IsString()
//     @IsOptional()
//     AccidentPlace?: string;  // สถานที่เกิดอุบัติเหตุ

//     @IsString()
//     @IsOptional()
//     AccidentDate?: string;  // วันที่เกิดอุบัติเหตุ

//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => CauseOfInjuryDetail)
//     @IsOptional()
//     CauseOfInjuryDetail?: CauseOfInjuryDetail[];  // รายการรายละเอียดเกี่ยวกับการบาดเจ็บ

//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => InjuryDetail)
//     @IsOptional()
//     InjuryDetail?: InjuryDetail[];  // รายละเอียดบาดแผล
// }

// export class CauseOfInjuryDetail {
//     @IsString()
//     @IsOptional()
//     CauseOfInjury?: string;  // สาเหตุของการบาดเจ็บ

//     @IsString()
//     @IsOptional()
//     CommentOfInjury?: string;  // ความคิดเห็นเกี่ยวกับการบาดเจ็บ
// }

// export class InjuryDetail {
//     @IsString()
//     @IsOptional()
//     WoundType?: string;  // ประเภทของบาดแผล

//     @IsString()
//     @IsOptional()
//     InjurySide?: string;  // ด้านของบาดแผล

//     @IsString()
//     @IsOptional()
//     InjuryArea?: string;  // พื้นที่ของบาดแผล
// }

// //   export class AccidentDatabaseResultInfo {
// //       @IsOptional()
// //       @ValidateNested()
// //       @Type(() => AccidentDetailInfo)
// //       AccidentDetailInfo?: AccidentDetailInfo;  // ตรวจสอบให้แน่ใจว่านี่ตรงตามโครงสร้างของคุณ
// //   }
  
 
import { IsInt ,IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from './http-status-message.dto';


export class AccidentDatabase {
    @IsString()
    @IsOptional()
    AccidentPlace?: string; // สถานที่เกิดอุบัติเหตุ
  
    @IsString()
    @IsOptional()
    AccidentDate?: string; // วันที่เกิดอุบัติเหตุ
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CauseOfInjuryDetail)
    @IsOptional()
    CauseOfInjuryDetail?: CauseOfInjuryDetail[]; // รายละเอียดเกี่ยวกับสาเหตุการบาดเจ็บ
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InjuryDetail)
    @IsOptional()
    InjuryDetail?: InjuryDetail[]; // รายละเอียดเกี่ยวกับบาดแผล
}


export class CauseOfInjuryDetail {
  @IsString()
  @IsOptional()
  CauseOfInjury?: string; // สาเหตุของการบาดเจ็บ

  @IsString()
  @IsOptional()
  CommentOfInjury?: string; // ความคิดเห็นเกี่ยวกับการบาดเจ็บ
}

export class InjuryDetail {
  @IsString()
  @IsOptional()
  WoundType?: string; // ประเภทของบาดแผล

  @IsString()
  @IsOptional()
  InjurySide?: string; // ด้านของบาดแผล

  @IsString()
  @IsOptional()
  InjuryArea?: string; // พื้นที่ของบาดแผล
}

export class AccidentDatabaseResultInfo {
  
    @IsOptional()
    AccidentDetailInfo?: AccidentDatabase; // สถานที่เกิดอุบัติเหตุ
  
   
  }

  
export class ResultAccidentDatabaseDto {
  @IsOptional()
  HTTPStatus?: HttpMessageDto; // สถานะ HTTP

  @IsOptional()
  @ValidateNested()
  @Type(() => AccidentDatabaseResultInfo)
  Result?: AccidentDatabaseResultInfo; // ผลลัพธ์ของอุบัติเหตุ
}


export class QueryAccidentDatabaseBodyDto {

    
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
    
  }