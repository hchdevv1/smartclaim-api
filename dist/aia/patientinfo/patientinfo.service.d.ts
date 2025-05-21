import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { TrakcareService } from '../../trakcare/trakcare.service';
import { PatientCreateDto, CreateBodyDto, TransactionQueryPatientCreateDto } from './dto/create-patientinfo.dto';
import { PatientFindDto, FindBodyDto } from './dto/find-patientinfo.dto';
import { FindforUpdateDto, FindforUpdateBodyDto } from './dto/findforupdate-patientinfo.dto';
import { PatientSearchDto, SearchBodyDto } from './dto/search-patientinfo.dto';
import { PatientUpdateDto, UpdateBodyDto } from './dto/update-patientinfo.dto';
import { QuerySearchTransection, ResultTransactionClaimDto } from './dto/search -transection.dto';
export declare class PatientinfoService {
    private readonly httpService;
    private readonly trakcareService;
    constructor(httpService: HttpService, trakcareService: TrakcareService);
    FindPatientTrakcare(findBodyDto: FindBodyDto): Promise<PatientFindDto>;
    create(createBodyDto: CreateBodyDto): Promise<PatientCreateDto>;
    PatientSearch(searchBodyDto: SearchBodyDto): Promise<PatientSearchDto>;
    FindforUpdate(findforUpdateBodyDto: FindforUpdateBodyDto): Promise<FindforUpdateDto>;
    updatePatientInfoByHN(updateBodyDto: UpdateBodyDto): Promise<PatientUpdateDto>;
    SearchTransection(querySearchTransection: QuerySearchTransection): Promise<ResultTransactionClaimDto>;
    formatDateToYYYYMMDD(dateString: any): string;
    addFormatTransactionPatientCreateDto(data: TransactionQueryPatientCreateDto, inputInsurerCode: number, inputPatientID: number, inputPID: string, inputPassportNumber: string, inputHN: string, inputTitleTH: string, inputGivenNameTH: string, inputSurnameTH: string, inputTitleEN: string, inputGivenNameEN: string, inputSurnameEN: string, inputDateOfBirth: string, inputGender: string, inputMobilePhone: string): void;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
