import { IsInt, IsOptional, IsString } from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';
export class PatientUpdateDto {
    
    HTTPStatus: HttpMessageDto;
    Result?: UpdateResultDto;
}
class UpdateResultDto{
    PatientInfo?: UpdatePatientBodyDto
}

export class UpdateBodyDto {
    PatientInfo?: UpdatePatientBodyDto
  }
  class UpdatePatientBodyDto{
    
    @IsInt()
    @IsOptional()
    InsurerCode:number


    @IsInt()
    @IsOptional()
    PatientID?: number;

    @IsString()
    @IsOptional()
    PID?: string;

    @IsString()
    @IsOptional()
    PassportNumber?: string;

    @IsString()
    @IsOptional()
    HN?: string;

    @IsString()
    @IsOptional()
    TitleTH?: string;

    @IsString()
    @IsOptional()
    GivenNameTH?: string;

    @IsString()
    @IsOptional()
    SurnameTH?: string;

    @IsString()
    @IsOptional()
    TitleEN?: string;

    @IsString()
    @IsOptional()
    GivenNameEN?: string;

    @IsString()
    @IsOptional()
    SurnameEN?: string;

    @IsString()
    @IsOptional()
    DateOfBirth?: string;

    @IsString()
    @IsOptional()
    Gender?: string;

    @IsString()
    @IsOptional()
    MobilePhone?: string;
  }
