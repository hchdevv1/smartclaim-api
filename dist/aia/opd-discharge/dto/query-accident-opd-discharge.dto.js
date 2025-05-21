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
exports.ResultSubmitAccidentDto = exports.QueryAccidentDto = exports.QueryAccident = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryAccident {
}
exports.QueryAccident = QueryAccident;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccident.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccident.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryCauseOfInjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QueryAccident.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryInjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], QueryAccident.prototype, "InjuryDetail", void 0);
class QueryCauseOfInjuryDetail {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCauseOfInjuryDetail.prototype, "CauseOfInjury", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCauseOfInjuryDetail.prototype, "CommentOfInjury", void 0);
class QueryInjuryDetail {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInjuryDetail.prototype, "WoundType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInjuryDetail.prototype, "InjurySide", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryInjuryDetail.prototype, "InjuryArea", void 0);
class QueryAccidentDto {
}
exports.QueryAccidentDto = QueryAccidentDto;
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
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SearchPatientBodyDto.prototype, "HaveAccidentCauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SearchPatientBodyDto.prototype, "HaveAccidentInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => QueryAccident),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", QueryAccident)
], SearchPatientBodyDto.prototype, "AccidentDetailInfo", void 0);
class ResultSubmitAccidentDto {
}
exports.ResultSubmitAccidentDto = ResultSubmitAccidentDto;
class ResultInfo {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ResultInfo.prototype, "HaveProcedure", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryAccident),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultInfo.prototype, "AccidentDetailInfo", void 0);
//# sourceMappingURL=query-accident-opd-discharge.dto.js.map