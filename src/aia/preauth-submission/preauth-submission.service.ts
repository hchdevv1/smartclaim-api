import { Injectable } from '@nestjs/common';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';

//const newHttpMessageDto =new HttpMessageDto();

@Injectable()
export class PreauthSubmissionService {
 

  addFormatHTTPStatus(data: HttpMessageDto,inputstatusCode:number,inputmessage:string,inputerror:string):void{  
    if(inputstatusCode !==200){
        if(data){
          data.statusCode=inputstatusCode
          data.message=inputmessage||''
          data.error=inputerror||''
        }
      }
      else{
        if(data){
          data.statusCode=200
          data.message='success'
          data.error=''
        }
      }
      
  }
}
