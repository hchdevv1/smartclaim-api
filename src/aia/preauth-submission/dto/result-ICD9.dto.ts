import { IsArray,  IsOptional,IsString,ValidateNested  } from 'class-validator';
import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultlistICD9InfoDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ICD9InfoDto)
    @IsOptional()
    ICD9Info?: ICD9InfoDto[];

  }

   class ICD9InfoDto {

    @IsString()
    @IsOptional()
    ICD9Id: string; 

    @IsString()
    @IsOptional()
    ICD9Code: string; 

    @IsString()
    @IsOptional()
    ICD9Desc: string; 

  }
