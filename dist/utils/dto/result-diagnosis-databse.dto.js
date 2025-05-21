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
exports.ResultPreDiagnosisDatabaseInfoDto = exports.QueryPreDiagnosisDatabse = exports.PreDiagnosisDatabaseResultInfo = exports.ResultPreDiagnosisDto = exports.QueryDiagnosisDatabaseBodyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryDiagnosisDatabaseBodyDto {
}
exports.QueryDiagnosisDatabaseBodyDto = QueryDiagnosisDatabaseBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDiagnosisDatabaseBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDiagnosisDatabaseBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryDiagnosisDatabaseBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDiagnosisDatabaseBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDiagnosisDatabaseBodyDto.prototype, "VN", void 0);
class ResultPreDiagnosisDto {
}
exports.ResultPreDiagnosisDto = ResultPreDiagnosisDto;
class PreDiagnosisDatabaseResultInfo {
}
exports.PreDiagnosisDatabaseResultInfo = PreDiagnosisDatabaseResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryPreDiagnosisDatabse),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreDiagnosisDatabaseResultInfo.prototype, "DiagnosisInfo", void 0);
class QueryPreDiagnosisDatabse {
}
exports.QueryPreDiagnosisDatabse = QueryPreDiagnosisDatabse;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreDiagnosisDatabse.prototype, "Icd10", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreDiagnosisDatabse.prototype, "DxName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreDiagnosisDatabse.prototype, "DxType", void 0);
class ResultPreDiagnosisDatabaseInfoDto {
}
exports.ResultPreDiagnosisDatabaseInfoDto = ResultPreDiagnosisDatabaseInfoDto;
//# sourceMappingURL=result-diagnosis-databse.dto.js.map