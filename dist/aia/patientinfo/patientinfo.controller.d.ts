import { PatientinfoService } from './patientinfo.service';
import { CreateBodyDto } from './dto/create-patientinfo.dto';
import { FindBodyDto } from './dto/find-patientinfo.dto';
import { FindforUpdateBodyDto } from './dto/findforupdate-patientinfo.dto';
import { SearchBodyDto } from './dto/search-patientinfo.dto';
import { UpdateBodyDto } from './dto/update-patientinfo.dto';
import { QuerySearchTransection } from './dto/search -transection.dto';
export declare class PatientinfoController {
    private readonly patientinfoService;
    constructor(patientinfoService: PatientinfoService);
    FindPatient(findBodyDto: FindBodyDto): Promise<import("./dto/find-patientinfo.dto").PatientFindDto>;
    create(createBodyDto: CreateBodyDto): Promise<import("./dto/create-patientinfo.dto").PatientCreateDto>;
    PatientSearch(searchBodyDto: SearchBodyDto): Promise<import("./dto/search-patientinfo.dto").PatientSearchDto>;
    PatientFindforUpdate(findforUpdateBodyDto: FindforUpdateBodyDto): Promise<import("./dto/findforupdate-patientinfo.dto").FindforUpdateDto>;
    updatePatientInfo(updateBodyDto: UpdateBodyDto): Promise<import("./dto/update-patientinfo.dto").PatientUpdateDto>;
    SearchTransection(querySearchTransection: QuerySearchTransection): Promise<import("./dto/search -transection.dto").ResultTransactionClaimDto>;
}
