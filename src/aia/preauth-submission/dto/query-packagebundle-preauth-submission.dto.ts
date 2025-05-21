import {  IsInt,  IsString ,IsOptional} from 'class-validator';

export class QueryPackageBundleDto {
    PackageInfo?: SearchPackageBundleDto
  }
class SearchPackageBundleDto{
    
    @IsInt()
    @IsOptional()
    PackageCode:number

    @IsString()
    @IsOptional()
    PackageDesc?: string;

   
  }