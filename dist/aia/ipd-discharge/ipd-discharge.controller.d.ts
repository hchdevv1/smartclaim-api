import { IpdDischargeService } from './ipd-discharge.service';
import { QueryIpdDischargeDto } from './dto/query-ipd-discharge.dto';
import { QueryIPDVisitDto } from './dto/query-visit-ipd-discharge.dto';
import { QueryProcedureDto } from './dto/query-procedure-ipd-discharge.dto';
import { QueryAccidentDto } from './dto/query-accident-ipd-discharge.dto';
import { QuerySubmitIpdDischargeDto } from './dto/query-submit-ipd-discharge.dto';
import { QueryConcurNoteDto } from './dto/query-concurrentnote-ipd-discharge.dto';
export declare class IpdDischargeController {
    private readonly ipdDischargeService;
    constructor(ipdDischargeService: IpdDischargeService);
    getIPDVisit(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-visit-ipd-discharge.dto").ResultIpdDischargeVisitDto>;
    getIPDVitalSign(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-vitalsign-ipd-discharge.dto").ResultIPDVitalSignDto>;
    getIPDDischargeDoctor(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-doctor-ipd-discharge.dto").ResultIpdDischargeDoctorDto>;
    getIPDDischargeDiagnosis(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-diagnosis-ipd-discharge.dto").ResultIpdDischargeDiagnosisDto>;
    getIPDDischargeInvestigation(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-investigation-ipd-discharge.dto").ResultIpdDischargeInvestigationDto>;
    getIPDDischargeOrderItem(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-orderitem-ipd-discharge.dto").ResultIpdDischargeOrderItemDto>;
    getIPDDischargeBilling(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-billing-ipd-discharge.dto").ResultIpdDischargeBillingDto>;
    getIPDDischargeProcedure(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-procedure-ipd-discharge.dto").ResultIpdDischargeProcedurDto>;
    getIPDDischargeAccident(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-accident-ipd-discharge.dto").ResultIpdDischargeAccidentDto>;
    getIPDDischargeConcurNote(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/result-concurnote-ipd-discharge.dto").ResultConcurNoteDto>;
    SubmitIPDVisit(queryIPDVisitDto: QueryIPDVisitDto): Promise<import("./dto/query-visit-ipd-discharge.dto").ResultSubmitIPDVisitDto>;
    SubmitProcedure(queryProcedureDto: QueryProcedureDto): Promise<import("./dto/query-procedure-ipd-discharge.dto").ResultSubmitProcedureDto>;
    SubmitAccident(queryAccidentDto: QueryAccidentDto): Promise<import("./dto/query-accident-ipd-discharge.dto").ResultSubmitAccidentDto>;
    SubmitConcurNote(queryConcurNoteDto: QueryConcurNoteDto): Promise<import("./dto/query-concurrentnote-ipd-discharge.dto").ResultSubmitConcurNoteDto>;
    SubmitOPDDischargeToAIA(querySubmitIpdDischargeDto: QuerySubmitIpdDischargeDto): Promise<import("./dto/result-submit-ipd-discharge.dto").ResultSubmitIpdDischargeDto>;
    ReviewIPDDischarge(queryIpdDischargeDto: QueryIpdDischargeDto): Promise<import("./dto/review-ipd-discharge.dto").ResultReviewOpdDischargeDto>;
}
