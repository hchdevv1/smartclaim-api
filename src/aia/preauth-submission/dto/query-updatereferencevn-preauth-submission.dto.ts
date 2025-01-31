
import {  IsString ,IsOptional} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class QueryUpdateReferenceVNBodyDto {
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

    @IsString()
    @IsOptional()
    ReferenceVN?: string;
    
  }


  export class ResultSubmitUpdateReferenceVNDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateReferenceVNBodyDto;
 }
class ResultUpdateReferenceVNBodyDto {
    
    @IsString()
    @IsOptional()
    status?: string;


}