import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
class StatusInfoDto {
    @IsString()
    InsurerCode: string;

    @IsString()
    BatchNumber: string;

    @IsString()
    ClaimStatus: string;

    @IsString()
    ClaimStatusCode: string;

    @IsString()
    ClaimStatusDesc: string;

    @IsString()
    ClaimStatusDesc_EN: string;

    @IsString()
    ClaimStatusDesc_TH: string;

    @IsString()
    @IsOptional()
    TotalApproveAmount?: string;

    @IsString()
    @IsOptional()
    PaymentDate?: string;

    @IsString()
    InvoiceNumber: string;

    @IsArray()
    @IsOptional()
    AttachDocList: any[]; // หรือสามารถกำหนดประเภทให้ชัดเจนกว่าได้ถ้ามีข้อมูลเพิ่มเติม
}
class ResultDto {
    @IsString()
    Code: string;

    @IsString()
    Message: string;

    @IsString()
    MessageTh: string;
}

export class InsuranceDataListAll {

    // @IsString()
    // RefIdReq: string;

    // @IsString()
    // TransactionNoReq: string;

    @IsString()
    RefId: string;

    @IsString()
    TransactionNo: string;

    @ValidateNested()
    @Type(() => ResultDto)
    Result: ResultDto;

    @ValidateNested()
    @Type(() => StatusInfoDto)
    StatusInfo: StatusInfoDto;
}

// export class InsuranceResultListAll {
//     @IsString()
//     @IsOptional()
//     Code?: string;

//     @IsString()
//     @IsOptional()
//     Message?: string;

//     @IsString()
//     @IsOptional()
//     MessageTh?: string;
// }

export class ResultInfo {
    // @ValidateNested()
    // @Type(() => InsuranceResultListAll)
    // InsuranceResult: InsuranceResultListAll;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InsuranceDataListAll)
    InsuranceData: InsuranceDataListAll[];
}

export class ResultCheckClaimStatusListAllDto {
    @ValidateNested()
    @Type(() => HttpMessageDto)
    HTTPStatus: HttpMessageDto;

    @ValidateNested()
    @Type(() => ResultInfo)
    Result: ResultInfo;
}
