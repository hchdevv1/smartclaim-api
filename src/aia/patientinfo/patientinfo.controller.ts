import { Controller, Post, Body, Patch } from '@nestjs/common';
import { PatientinfoService } from './patientinfo.service';

import { CreateBodyDto} from './dto/create-patientinfo.dto';
import { FindBodyDto} from './dto/find-patientinfo.dto';
import { FindforUpdateBodyDto} from './dto/findforupdate-patientinfo.dto';
import { SearchBodyDto} from './dto/search-patientinfo.dto';
import { UpdateBodyDto} from './dto/update-patientinfo.dto';
import { QuerySearchTransection } from './dto/search -transection.dto';
@Controller('/v1/patientinfo')
export class PatientinfoController {
  constructor(private readonly patientinfoService: PatientinfoService) {}
  @Post('/FindPatientTrakcare')
  async FindPatient(@Body() findBodyDto: FindBodyDto, ) {
      const result = await this.patientinfoService.FindPatientTrakcare(findBodyDto);
      return result
      }
  @Post('/CreatePatient')
  async create(@Body() createBodyDto:CreateBodyDto){
        const result = this.patientinfoService.create(createBodyDto);
        return  result
  }
  @Post('/PatientSearch')
  async PatientSearch(@Body() searchBodyDto:SearchBodyDto){
     // console.log(searchBodyDto)
       const result = this.patientinfoService.PatientSearch(searchBodyDto);
       
        return result
  }

  @Post('/PatientFindforUpdate')
  async PatientFindforUpdate(@Body() findforUpdateBodyDto:FindforUpdateBodyDto){
        const result = this.patientinfoService.FindforUpdate(findforUpdateBodyDto);
        return result
  }
  @Patch('/PatientUpdate')
  async updatePatientInfo(
  @Body() updateBodyDto: UpdateBodyDto,
) {
    const result = await this.patientinfoService.updatePatientInfoByHN(updateBodyDto);
    return result
  }

  @Post('/SearchTransection')
  async SearchTransection(@Body() querySearchTransection:QuerySearchTransection){
        const result = this.patientinfoService.SearchTransection(querySearchTransection);
        return result
  }
 
}
