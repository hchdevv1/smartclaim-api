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
exports.DiagnosisTypeMappingDto = exports.ResultPackageBundleInfo = exports.PackageBundleResultInfo = exports.PackageBundleDto = exports.ListPackageBundleDto = exports.IndicationsForAdmissionDto = exports.OpeartionisPackageDto = exports.AnesthesiaListDto = exports.Accidentcauseover45daysDto = exports.AccidentplaceDto = exports.CauseofinjurysideDto = exports.CauseofInjurywoundtypeDto = exports.DocumentTypeDto = exports.IdTypeDto = exports.ClaimStatusDto = exports.ServiceSettingIllnessDto = exports.ServiceSettingDto = exports.PolicyTypeDto = exports.IllnessSurgeryDto = exports.IllnessTypeDto = exports.aia_accessTokenDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class aia_accessTokenDTO {
}
exports.aia_accessTokenDTO = aia_accessTokenDTO;
class IllnessTypeDto {
}
exports.IllnessTypeDto = IllnessTypeDto;
class ResultIllnessTypeInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIllnessTypeInfo.prototype, "illnesstypecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIllnessTypeInfo.prototype, "illnesstypedesc", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultIllnessTypeInfo.prototype, "insurerid", void 0);
class IllnessSurgeryDto {
}
exports.IllnessSurgeryDto = IllnessSurgeryDto;
class ResultIllnessSurgeryInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIllnessSurgeryInfo.prototype, "ISCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIllnessSurgeryInfo.prototype, "ISDescription", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultIllnessSurgeryInfo.prototype, "insurerid", void 0);
class PolicyTypeDto {
}
exports.PolicyTypeDto = PolicyTypeDto;
class ResultPolicyTypeInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPolicyTypeInfo.prototype, "PolicyTypeCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPolicyTypeInfo.prototype, "PolicyTypeDesc", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultPolicyTypeInfo.prototype, "insurerid", void 0);
class ServiceSettingDto {
}
exports.ServiceSettingDto = ServiceSettingDto;
class ResultServiceSettingInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingInfo.prototype, "servicesettingcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingInfo.prototype, "servicesettingdesc", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultServiceSettingInfo.prototype, "insurerid", void 0);
class ServiceSettingIllnessDto {
}
exports.ServiceSettingIllnessDto = ServiceSettingIllnessDto;
class ResultServiceSettingILLInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "Description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "servicesettingcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "servicesettingdesc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "IllnesstypeCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultServiceSettingILLInfo.prototype, "IllnesstypeDesc", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultServiceSettingILLInfo.prototype, "insurerid", void 0);
class ClaimStatusDto {
}
exports.ClaimStatusDto = ClaimStatusDto;
class ResultClaimStatusInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultClaimStatusInfo.prototype, "claimstatuscode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultClaimStatusInfo.prototype, "claimstatusdesc_en", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultClaimStatusInfo.prototype, "claimstatusdesc_th", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultClaimStatusInfo.prototype, "insurerid", void 0);
class IdTypeDto {
}
exports.IdTypeDto = IdTypeDto;
class ResultIdTypeInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIdTypeInfo.prototype, "idtypecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIdTypeInfo.prototype, "idtypedesc_th", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIdTypeInfo.prototype, "idtypedesc_en", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultIdTypeInfo.prototype, "insurerid", void 0);
class DocumentTypeDto {
}
exports.DocumentTypeDto = DocumentTypeDto;
class ResultDocumentTypeInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDocumentTypeInfo.prototype, "documenttypecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDocumentTypeInfo.prototype, "documenttypename", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultDocumentTypeInfo.prototype, "insurerid", void 0);
class CauseofInjurywoundtypeDto {
}
exports.CauseofInjurywoundtypeDto = CauseofInjurywoundtypeDto;
class ResultCauseofInjurywoundtypeInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultCauseofInjurywoundtypeInfo.prototype, "woundtypecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultCauseofInjurywoundtypeInfo.prototype, "woundtypename", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultCauseofInjurywoundtypeInfo.prototype, "insurerid", void 0);
class CauseofinjurysideDto {
}
exports.CauseofinjurysideDto = CauseofinjurysideDto;
class ResultCauseofinjurysideInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultCauseofinjurysideInfo.prototype, "injurysidecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultCauseofinjurysideInfo.prototype, "injurysidename", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultCauseofinjurysideInfo.prototype, "insurerid", void 0);
class AccidentplaceDto {
}
exports.AccidentplaceDto = AccidentplaceDto;
class ResultAccidentplaceInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentplaceInfo.prototype, "accidentplacecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentplaceInfo.prototype, "accidentplacename", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultAccidentplaceInfo.prototype, "insurerid", void 0);
class Accidentcauseover45daysDto {
}
exports.Accidentcauseover45daysDto = Accidentcauseover45daysDto;
class ResultAccidentcauseover45daysInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentcauseover45daysInfo.prototype, "causeovercode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAccidentcauseover45daysInfo.prototype, "causeoverdesc", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultAccidentcauseover45daysInfo.prototype, "insurerid", void 0);
class AnesthesiaListDto {
}
exports.AnesthesiaListDto = AnesthesiaListDto;
class ResultAnesthesiaListInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAnesthesiaListInfo.prototype, "aneslistcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultAnesthesiaListInfo.prototype, "aneslistname", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultAnesthesiaListInfo.prototype, "insurerid", void 0);
class OpeartionisPackageDto {
}
exports.OpeartionisPackageDto = OpeartionisPackageDto;
class ResultOpeartionisPackageInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultOpeartionisPackageInfo.prototype, "oiscode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultOpeartionisPackageInfo.prototype, "oisname", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultOpeartionisPackageInfo.prototype, "insurerid", void 0);
class IndicationsForAdmissionDto {
}
exports.IndicationsForAdmissionDto = IndicationsForAdmissionDto;
class ResultIndicationsForAdmissionInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIndicationsForAdmissionInfo.prototype, "ifacode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultIndicationsForAdmissionInfo.prototype, "ifaname", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultIndicationsForAdmissionInfo.prototype, "insurerid", void 0);
class ListPackageBundleDto {
}
exports.ListPackageBundleDto = ListPackageBundleDto;
class ResultListPackageBundleInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultListPackageBundleInfo.prototype, "packagecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultListPackageBundleInfo.prototype, "packagedesc", void 0);
class PackageBundleDto {
}
exports.PackageBundleDto = PackageBundleDto;
class PackageBundleResultInfo {
}
exports.PackageBundleResultInfo = PackageBundleResultInfo;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackageBundleResultInfo.prototype, "packagecode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackageBundleResultInfo.prototype, "packagedesc", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResultPackageBundleInfo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PackageBundleResultInfo.prototype, "packagebundleinfo", void 0);
class ResultPackageBundleInfo {
}
exports.ResultPackageBundleInfo = ResultPackageBundleInfo;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "localbillingcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "localbillingname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "simbbillingcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "payorbillingcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "billinginitial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "billingdiscount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "billingnetamount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultPackageBundleInfo.prototype, "totalbillamount", void 0);
class DiagnosisTypeMappingDto {
}
exports.DiagnosisTypeMappingDto = DiagnosisTypeMappingDto;
class ResultDiagnosisTypeMappingInfo {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDiagnosisTypeMappingInfo.prototype, "dxtypecodetrakcare", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDiagnosisTypeMappingInfo.prototype, "dxtypenametrakcare", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDiagnosisTypeMappingInfo.prototype, "dxtypecodeinsurance", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDiagnosisTypeMappingInfo.prototype, "dxtypenameinsurance", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResultDiagnosisTypeMappingInfo.prototype, "insurerid", void 0);
class InsurerDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], InsurerDto.prototype, "insurercode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsurerDto.prototype, "insurername", void 0);
//# sourceMappingURL=utils.dto.js.map