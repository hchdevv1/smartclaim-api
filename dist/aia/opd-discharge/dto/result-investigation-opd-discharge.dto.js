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
exports.QueryInvestigation = exports.TrakcareResultInfo = exports.ResultOpdDischargeInvestigationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ResultOpdDischargeInvestigationDto {
}
exports.ResultOpdDischargeInvestigationDto = ResultOpdDischargeInvestigationDto;
class TrakcareResultInfo {
}
exports.TrakcareResultInfo = TrakcareResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryInvestigation),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TrakcareResultInfo.prototype, "InvestigationInfo", void 0);
class QueryInvestigation {
}
exports.QueryInvestigation = QueryInvestigation;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInvestigation.prototype, "InvestigationCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInvestigation.prototype, "InvestigationGroup", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInvestigation.prototype, "InvestigationName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInvestigation.prototype, "InvestigationResult", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInvestigation.prototype, "ResultDateTime", void 0);
//# sourceMappingURL=result-investigation-opd-discharge.dto.js.map