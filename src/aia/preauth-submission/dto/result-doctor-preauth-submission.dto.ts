import { IsArray, IsOptional, IsString,ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultPreAuthDoctorDto {

    HTTPStatus: HttpMessageDto;
    Result?: TrakcareResultInfo;
 }
 
 export class TrakcareResultInfo {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueryDoctor)
    @IsOptional()
    DoctorInfo?: QueryDoctor[];
  }


  export class QueryDoctor{

    @IsString()
    @IsOptional()
    DoctorLicense?: string;

    @IsString()
    @IsOptional()
    DoctorRole?: string;

    @IsString()
    @IsOptional()
    DoctorFirstName?: string;

    @IsString()
    @IsOptional()
    DoctorLastName?: string;
  }