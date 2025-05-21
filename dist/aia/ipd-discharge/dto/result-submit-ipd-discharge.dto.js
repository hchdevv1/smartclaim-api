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
exports.ResultVisitInfoDto = exports.ResultAttachDocListInfoDto = exports.ResultConcurrentNoteDto = exports.ResultAccidentDetailDto = exports.ResultBillingInfoDto = exports.ResultOrderItemInfoDto = exports.ResultProcedureInfoDto = exports.ResultDoctorInfoDto = exports.ResultInvestigationInfoDto = exports.ResultDiagnosisInfoDto = exports.ResultVitalSignInfoDto = exports.ResultPatientInfoDto = exports.ResultDataJsonDto = exports.InsuranceResult = exports.InsuranceData = exports.MessageDto = exports.CoverageDto = exports.ResultInfo = exports.ResultSubmitIpdDischargeDto = void 0;
const class_validator_1 = require("class-validator");
class ResultSubmitIpdDischargeDto {
}
exports.ResultSubmitIpdDischargeDto = ResultSubmitIpdDischargeDto;
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
class CoverageDto {
}
exports.CoverageDto = CoverageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CoverageDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CoverageDto.prototype, "status", void 0);
class MessageDto {
}
exports.MessageDto = MessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageDto.prototype, "policyNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MessageDto.prototype, "planName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageDto.prototype, "messageTh", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MessageDto.prototype, "messageEn", void 0);
class InsuranceData {
}
exports.InsuranceData = InsuranceData;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "Message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "MessageTh", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "ClaimNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "OccurrenceNo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "TotalApprovedAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "TotalExcessAmount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InsuranceData.prototype, "IsReimbursement", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InsuranceData.prototype, "CoverageList", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InsuranceData.prototype, "MessageList", void 0);
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
], VisitDto.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "AdditionalNote", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "AdmitDateTime", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisitDto.prototype, "AlcoholRelated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "An", void 0);
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
], VisitDto.prototype, "DscDateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "DxFreeText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "ExpectedDayOfRecovery", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VisitDto.prototype, "ExpectedLos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "Height", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "IndicationForAdmission", void 0);
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
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PreauthReferClaimNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VisitDto.prototype, "PreauthReferOcc", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], VisitDto.prototype, "PrivateCase", void 0);
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
class ConcurrentNoteDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConcurrentNoteDto.prototype, "ConcurrentDateTimeDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConcurrentNoteDto.prototype, "ConcurrentNoteDetail", void 0);
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
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultDataJsonDto.prototype, "ConcurrentNote", void 0);
class ResultPatientInfoDto {
}
exports.ResultPatientInfoDto = ResultPatientInfoDto;
class ResultVitalSignInfoDto {
}
exports.ResultVitalSignInfoDto = ResultVitalSignInfoDto;
class ResultDiagnosisInfoDto {
}
exports.ResultDiagnosisInfoDto = ResultDiagnosisInfoDto;
class ResultInvestigationInfoDto {
}
exports.ResultInvestigationInfoDto = ResultInvestigationInfoDto;
class ResultDoctorInfoDto {
}
exports.ResultDoctorInfoDto = ResultDoctorInfoDto;
class ResultProcedureInfoDto {
}
exports.ResultProcedureInfoDto = ResultProcedureInfoDto;
class ResultOrderItemInfoDto {
}
exports.ResultOrderItemInfoDto = ResultOrderItemInfoDto;
class ResultBillingInfoDto {
}
exports.ResultBillingInfoDto = ResultBillingInfoDto;
class ResultAccidentDetailDto {
}
exports.ResultAccidentDetailDto = ResultAccidentDetailDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentDetailDto.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentDetailDto.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultAccidentDetailDto.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ResultAccidentDetailDto.prototype, "InjuryDetail", void 0);
class ResultConcurrentNoteDto {
}
exports.ResultConcurrentNoteDto = ResultConcurrentNoteDto;
class ResultAttachDocListInfoDto {
}
exports.ResultAttachDocListInfoDto = ResultAttachDocListInfoDto;
class ResultVisitInfoDto {
}
exports.ResultVisitInfoDto = ResultVisitInfoDto;
//# sourceMappingURL=result-submit-ipd-discharge.dto.js.map