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
exports.CoverageList = exports.ResultDataJsonDto = exports.QuerySubmitOpdDischargeDto = exports.ResultAttachDocListInfoDto = exports.ResultBillingInfoDto = exports.ResultOrderItemInfoDto = exports.ResultInvestigationInfoDto = exports.ResultProcedureInfoDto = exports.ResultDiagnosisInfoDto = exports.ResultDoctorInfoDto = exports.ResultVitalSignInfoDto = exports.ResultVisitInfoDto = exports.ResultPatientInfoDto = exports.ResultInfo = exports.ResultSubmitOpdDischargeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ResultSubmitOpdDischargeDto {
}
exports.ResultSubmitOpdDischargeDto = ResultSubmitOpdDischargeDto;
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
class ResultPatientInfoDto {
}
exports.ResultPatientInfoDto = ResultPatientInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultPatientInfoDto.prototype, "Dob", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultPatientInfoDto.prototype, "Gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultPatientInfoDto.prototype, "Hn", void 0);
class ResultVisitInfoDto {
}
exports.ResultVisitInfoDto = ResultVisitInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "FurtherClaimId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "AccidentCauseOver45Days", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "AdditionalNote", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ResultVisitInfoDto.prototype, "AlcoholRelated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "ChiefComplaint", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "ComaScore", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "DxFreeText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "ExpectedDayOfRecovery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "Height", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "PhysicalExam", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "PlanOfTreatment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ResultVisitInfoDto.prototype, "Pregnant", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "PresentIllness", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "PreviousTreatmentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "PreviousTreatmentDetail", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ResultVisitInfoDto.prototype, "PrivateCase", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "ProcedureFreeText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "SignSymptomsDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "UnderlyingCondition", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "VisitDateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "Vn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVisitInfoDto.prototype, "Weight", void 0);
class ResultVitalSignInfoDto {
}
exports.ResultVitalSignInfoDto = ResultVitalSignInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "DiastolicBp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "HeartRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "OxygenSaturation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "PainScore", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "RespiratoryRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "SystolicBp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "Temperature", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultVitalSignInfoDto.prototype, "VitalSignEntryDateTime", void 0);
class ResultDoctorInfoDto {
}
exports.ResultDoctorInfoDto = ResultDoctorInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDoctorInfoDto.prototype, "DoctorLicense", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDoctorInfoDto.prototype, "DoctorRole", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDoctorInfoDto.prototype, "DoctorFirstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDoctorInfoDto.prototype, "DoctorLastName", void 0);
class ResultDiagnosisInfoDto {
}
exports.ResultDiagnosisInfoDto = ResultDiagnosisInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDiagnosisInfoDto.prototype, "DxName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDiagnosisInfoDto.prototype, "DxType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultDiagnosisInfoDto.prototype, "Icd10", void 0);
class ResultProcedureInfoDto {
}
exports.ResultProcedureInfoDto = ResultProcedureInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultProcedureInfoDto.prototype, "Icd9", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultProcedureInfoDto.prototype, "ProcedureDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultProcedureInfoDto.prototype, "ProcedureName", void 0);
class ResultInvestigationInfoDto {
}
exports.ResultInvestigationInfoDto = ResultInvestigationInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultInvestigationInfoDto.prototype, "InvestigationCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultInvestigationInfoDto.prototype, "InvestigationGroup", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultInvestigationInfoDto.prototype, "InvestigationName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultInvestigationInfoDto.prototype, "InvestigationResult", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultInvestigationInfoDto.prototype, "ResultDateTime", void 0);
class ResultOrderItemInfoDto {
}
exports.ResultOrderItemInfoDto = ResultOrderItemInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "ItemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "ItemName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "ItemAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "Discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "Initial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "Location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "NetAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "SimbVersion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultOrderItemInfoDto.prototype, "Terminology", void 0);
class ResultBillingInfoDto {
}
exports.ResultBillingInfoDto = ResultBillingInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "SimbBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "PayorBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "BillingInitial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "BillingDiscount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultBillingInfoDto.prototype, "BillingNetAmount", void 0);
class ResultAttachDocListInfoDto {
}
exports.ResultAttachDocListInfoDto = ResultAttachDocListInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultAttachDocListInfoDto.prototype, "Base64Data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResultAttachDocListInfoDto.prototype, "DocName", void 0);
class ItemBillingCheckBalance {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BillingInfo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ItemBillingCheckBalance.prototype, "BillingInfo", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItem),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ItemBillingCheckBalance.prototype, "OrderItem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemBillingCheckBalance.prototype, "TotalBillAmount", void 0);
class BillingInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "SimbBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "PayorBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "BillingInitial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "BillingDiscount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingInfo.prototype, "BillingNetAmount", void 0);
class OrderItem {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "Discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "Initial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "ItemAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "ItemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "ItemName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItem.prototype, "NetAmount", void 0);
class QuerySubmitOpdDischargeDto {
}
exports.QuerySubmitOpdDischargeDto = QuerySubmitOpdDischargeDto;
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
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "VisitDateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ItemBillingCheckBalance)
], SearchPatientBodyDto.prototype, "ItemBillingCheckBalance", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "ICD10", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "FurtherClaimId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchPatientBodyDto.prototype, "AccidentCauseOver45Days", void 0);
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
], VisitDto.prototype, "Vn", void 0);
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
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AccidentDetailDto.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AccidentDetailDto.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AccidentDetailDto.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
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
class PssDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PssDto.prototype, "Exclusion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PssDto.prototype, "FinalScore", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PssDto.prototype, "Findings", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PssDto.prototype, "Id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PssDto.prototype, "Medical", void 0);
class ResultDataJsonDto {
}
exports.ResultDataJsonDto = ResultDataJsonDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", PatientDto)
], ResultDataJsonDto.prototype, "Patient", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", VisitDto)
], ResultDataJsonDto.prototype, "Visit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "VitalSign", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "Diagnosis", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", AccidentDetailDto)
], ResultDataJsonDto.prototype, "AccidentDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "Procedure", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "Investigation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "OrderItem", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "Doctor", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "Billing", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDataJsonDto.prototype, "TotalBillAmount", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", PssDto)
], ResultDataJsonDto.prototype, "Pss", void 0);
class CoverageList {
}
exports.CoverageList = CoverageList;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CoverageList.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CoverageList.prototype, "Status", void 0);
//# sourceMappingURL=result-BillingCheckBalance.dto.js.map