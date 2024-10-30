
import {  IsString ,IsOptional} from 'class-validator';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class QueryUpdateFurtherClaimVNBodyDto {
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
    FurtherClaimVN?: string;
    
  }


  export class ResultSubmitUpdateFurtherClaimVNDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultUpdateFurtherClaimVNBodyDto;
 }
class ResultUpdateFurtherClaimVNBodyDto {
    
    @IsString()
    @IsOptional()
    status?: string;


}