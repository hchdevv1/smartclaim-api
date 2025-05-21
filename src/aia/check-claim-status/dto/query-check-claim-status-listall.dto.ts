

import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCheckClaimStatusListAllBodyDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Querystatus)
    @IsOptional()
    PatientInfo?: Querystatus[];
  
  }

 class Querystatus{

    @IsString()
    @IsOptional()
    RefId?: string;

    @IsString()
    @IsOptional()
    TransactionNo?: string;
  }