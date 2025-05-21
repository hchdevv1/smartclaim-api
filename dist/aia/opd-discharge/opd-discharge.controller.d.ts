import { OpdDischargeService } from './opd-discharge.service';
import { QueryOpdDischargeDto } from './dto/query-opd-discharge.dto';
import { QuerySubmitOpdDischargeDto } from './dto/query-submit-opd-discharge.dto';
import { QueryProcedureDto } from './dto/query-procedure-opd-discharge.dto';
import { QueryAccidentDto } from './dto/query-accident-opd-discharge.dto';
import { QueryVisitDto } from './dto/query-visit-opd-discharge.dto';
import { QueryReviewOpdDischargeDto } from './dto/review-opd-discharge.dto';
import { QueryUpdateFurtherClaimVNBodyDto } from './dto/query-updatefurtherclaimvn-opd-discharge.dto';
export declare class OpdDischargeController {
    private readonly opdDischargeService;
    constructor(opdDischargeService: OpdDischargeService);
    getOPDDischargeVisit(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-visit-opd-discharge.dto").ResultOpdDischargeVisitDto>;
    getOPDDischargeVitalSign(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-vitalsign-opd-discharge.dto").ResultOpdDischargeVitalSignDto>;
    getOPDDischargeDoctor(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-doctor-opd-discharge.dto").ResultOpdDischargeDoctorDto>;
    getOPDDischargeDiagnosis(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-diagnosis-opd-discharge.dto").ResultOpdDischargeDiagnosisDto>;
    getOPDDischargeInvestigation(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-investigation-opd-discharge.dto").ResultOpdDischargeInvestigationDto>;
    getOPDDischargeOrderItem(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-orderitem-opd-discharge.dto").ResultOpdDischargeOrderItemDto>;
    getOPDDischargeBilling(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-billing-opd-discharge.dto").ResultOpdDischargeBillingDto>;
    getOPDDischargeProcedure(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-procedure-opd-discharge.dto").ResultOpdDischargeProcedurDto>;
    getOPDDischargeAccident(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-accident-opd-discharge.dto").ResultOpdDischargeAccidentDto>;
    getListVisitClaimAIA(queryOpdDischargeDto: QueryOpdDischargeDto): Promise<import("./dto/result-listclaim-opd-discharge.dto").ResultClaimFormListDto>;
    SubmitVisit(queryVisitDto: QueryVisitDto): Promise<import("./dto/query-procedure-opd-discharge.dto").ResultSubmitProcedureDto>;
    SubmitProcedure(queryProcedureDto: QueryProcedureDto): Promise<import("./dto/query-procedure-opd-discharge.dto").ResultSubmitProcedureDto>;
    SubmitAccident(queryAccidentDto: QueryAccidentDto): Promise<import("./dto/query-accident-opd-discharge.dto").ResultSubmitAccidentDto>;
    SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto: QuerySubmitOpdDischargeDto): Promise<import("./dto/result-submit-opd-discharge.dto").ResultSubmitOpdDischargeDto>;
    ReviewOPDDischarge(queryReviewOpdDischargeDto: QueryReviewOpdDischargeDto): Promise<import("./dto/review-opd-discharge.dto").ResultReviewOpdDischargeDto>;
    UpdateFurtherClaimVN(queryUpdateFurtherClaimVNBodyDto: QueryUpdateFurtherClaimVNBodyDto): Promise<import("./dto/query-updatefurtherclaimvn-opd-discharge.dto").ResultSubmitUpdateFurtherClaimVNDto>;
}
