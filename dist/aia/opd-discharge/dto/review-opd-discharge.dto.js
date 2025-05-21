"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultReviewDataJsonDto = exports.AccidentDatabaseResultInfo = exports.InjuryDetail = exports.CauseOfInjuryDetail = exports.ReviewAccidentDatabase = exports.InsuranceResult = exports.ResultInfo = exports.ResultReviewOpdDischargeDto = exports.ResultReviewBillingInfoDto = exports.ResultReviewDoctorInfoDto = exports.ResultReviewOrderItemInfoDto = exports.ResultReviewInvestigationInfoDto = exports.ResultReviewProcedureInfoDto = exports.ResultReviewDiagnosisInfoDto = exports.ResultReviewVitalSignInfoDto = exports.ResultReviewVisitInfoDto = exports.ResultReviewPatientInfoDto = exports.AccidentDetailDto = exports.QueryReviewOpdDischargeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryReviewOpdDischargeDto {
}
exports.QueryReviewOpdDischargeDto = QueryReviewOpdDischargeDto;
class SearchPatientBodyDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchPatientBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "VN", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchPatientBodyDto.prototype, "HaveProcedure", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchPatientBodyDto.prototype, "HaveAccidentCauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchPatientBodyDto.prototype, "HaveAccidentInjuryDetail", void 0);
class PatientDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "Dob", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "Gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatientDto.prototype, "Hn", void 0);
class VisitDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "FurtherClaimId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "AccidentCauseOver45Days", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "AdditionalNote", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisitDto.prototype, "AlcoholRelated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "ChiefComplaint", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "ComaScore", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "DxFreeText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "ExpectedDayOfRecovery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "Height", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PhysicalExam", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PlanOfTreatment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisitDto.prototype, "Pregnant", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PresentIllness", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PreviousTreatmentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PreviousTreatmentDetail", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisitDto.prototype, "PrivateCase", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "ProcedureFreeText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "SignSymptomsDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "UnderlyingCondition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "VisitDateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "VN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "Weight", void 0);
class VitalSignDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "DiastolicBp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "HeartRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "OxygenSaturation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "PainScore", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "RespiratoryRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "SystolicBp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "Temperature", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VitalSignDto.prototype, "VitalSignEntryDateTime", void 0);
class DiagnosisDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DiagnosisDto.prototype, "DxName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DiagnosisDto.prototype, "DxType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DiagnosisDto.prototype, "Icd10", void 0);
class AccidentDetailDto {
}
exports.AccidentDetailDto = AccidentDetailDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccidentDetailDto.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccidentDetailDto.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CauseOfInjuryDetail),
    __metadata("design:type", Array)
], AccidentDetailDto.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccidentDetailDto.prototype, "InjuryDetail", void 0);
class ProcedureDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "Icd9", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "ProcedureDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcedureDto.prototype, "ProcedureName", void 0);
class InvestigationDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvestigationDto.prototype, "InvestigationCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvestigationDto.prototype, "InvestigationGroup", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvestigationDto.prototype, "InvestigationName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvestigationDto.prototype, "InvestigationResult", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InvestigationDto.prototype, "ResultDateTime", void 0);
class OrderItemDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "Discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "Initial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "ItemAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "ItemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "ItemName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "NetAmount", void 0);
class DoctorDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "DoctorLicense", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "DoctorRole", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "DoctorFirstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DoctorDto.prototype, "DoctorLastName", void 0);
class BillingDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "SimbBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "PayorBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "BillingInitial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "BillingDiscount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BillingDto.prototype, "BillingNetAmount", void 0);
class ResultReviewPatientInfoDto {
}
exports.ResultReviewPatientInfoDto = ResultReviewPatientInfoDto;
class ResultReviewVisitInfoDto {
}
exports.ResultReviewVisitInfoDto = ResultReviewVisitInfoDto;
class ResultReviewVitalSignInfoDto {
}
exports.ResultReviewVitalSignInfoDto = ResultReviewVitalSignInfoDto;
class ResultReviewDiagnosisInfoDto {
}
exports.ResultReviewDiagnosisInfoDto = ResultReviewDiagnosisInfoDto;
class ResultReviewProcedureInfoDto {
}
exports.ResultReviewProcedureInfoDto = ResultReviewProcedureInfoDto;
class ResultReviewInvestigationInfoDto {
}
exports.ResultReviewInvestigationInfoDto = ResultReviewInvestigationInfoDto;
class ResultReviewOrderItemInfoDto {
}
exports.ResultReviewOrderItemInfoDto = ResultReviewOrderItemInfoDto;
class ResultReviewDoctorInfoDto {
}
exports.ResultReviewDoctorInfoDto = ResultReviewDoctorInfoDto;
class ResultReviewBillingInfoDto {
}
exports.ResultReviewBillingInfoDto = ResultReviewBillingInfoDto;
class ResultReviewOpdDischargeDto {
}
exports.ResultReviewOpdDischargeDto = ResultReviewOpdDischargeDto;
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
class InsuranceResult {
}
exports.InsuranceResult = InsuranceResult;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceResult.prototype, "Code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceResult.prototype, "Message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceResult.prototype, "MessageTh", void 0);
class ReviewAccidentDatabase {
}
exports.ReviewAccidentDatabase = ReviewAccidentDatabase;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReviewAccidentDatabase.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReviewAccidentDatabase.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CauseOfInjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReviewAccidentDatabase.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReviewAccidentDatabase.prototype, "InjuryDetail", void 0);
class CauseOfInjuryDetail {
}
exports.CauseOfInjuryDetail = CauseOfInjuryDetail;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CauseOfInjuryDetail.prototype, "CauseOfInjury", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CauseOfInjuryDetail.prototype, "CommentOfInjury", void 0);
class InjuryDetail {
}
exports.InjuryDetail = InjuryDetail;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "WoundType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "InjurySide", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "InjuryArea", void 0);
class AccidentDatabaseResultInfo {
}
exports.AccidentDatabaseResultInfo = AccidentDatabaseResultInfo;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccidentDetailDto),
    __metadata("design:type", AccidentDetailDto)
], AccidentDatabaseResultInfo.prototype, "AccidentDetailInfo", void 0);
class ResultReviewDataJsonDto {
}
exports.ResultReviewDataJsonDto = ResultReviewDataJsonDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", PatientDto)
], ResultReviewDataJsonDto.prototype, "Patient", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", VisitDto)
], ResultReviewDataJsonDto.prototype, "Visit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "VitalSign", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "Diagnosis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccidentDetailDto)
], ResultReviewDataJsonDto.prototype, "AccidentDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "Procedure", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "Investigation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "OrderItem", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "Doctor", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultReviewDataJsonDto.prototype, "Billing", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultReviewDataJsonDto.prototype, "TotalBillAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultReviewDataJsonDto.prototype, "InvoiceNumber", void 0);
//# sourceMappingURL=review-opd-discharge.dto.js.map