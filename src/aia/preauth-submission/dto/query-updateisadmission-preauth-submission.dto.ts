
import {  IsString ,IsOptional, IsBoolean} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class QueryUpdateIsAdmissionBodyDto {
    PatientInfo?: SearchPatientBodyDto
  }
class SearchPatientBodyDto{

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

    @IsBoolean()
    @IsOptional()
    IsAdmission?:boolean
    
  }


  export class ResultSubmitUpdateIsAdmissionDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateIsAdmissionBodyDto;
 }
class ResultUpdateIsAdmissionBodyDto {
    
    @IsString()
    @IsOptional()
    status?: string;


}