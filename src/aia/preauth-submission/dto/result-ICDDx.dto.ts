import { IsArray,  IsOptional,IsString,ValidateNested  } from 'class-validator';
import { Type  } from 'class-transformer';
import { HttpMessageDto } from '../../../utils/dto/http-status-message.dto';

export class ResultlistICDDxInfoDto {

    HTTPStatus: HttpMessageDto;
    Result?: ResultInfo;
 }
 export class ResultInfo {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ICDDxInfoDto)
    @IsOptional()
    ICDDxInfo?: ICDDxInfoDto[];

  }

   class ICDDxInfoDto {

    @IsString()
    @IsOptional()
    ICDDxId: string; 

    @IsString()
    @IsOptional()
    ICDDxCode: string; 

    @IsString()
    @IsOptional()
    ICDDx: string; 

  }
