import { IsOptional, IsString ,IsInt} from 'class-validator';

export class HttpMessageDto {
    @IsInt()
    statusCode: number;

    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsOptional()
    error: string;

   
  }
