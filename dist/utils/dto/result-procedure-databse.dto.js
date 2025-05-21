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
exports.ResultProcedureDatabaseInfoDto = exports.QueryProcedureDatabse = exports.ProcedeureDatabaseResultInfo = exports.ResultOpdDischargeProcedurDto = exports.QueryProcedeureDatabaseBodyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryProcedeureDatabaseBodyDto {
}
exports.QueryProcedeureDatabaseBodyDto = QueryProcedeureDatabaseBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedeureDatabaseBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedeureDatabaseBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryProcedeureDatabaseBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedeureDatabaseBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedeureDatabaseBodyDto.prototype, "VN", void 0);
class ResultOpdDischargeProcedurDto {
}
exports.ResultOpdDischargeProcedurDto = ResultOpdDischargeProcedurDto;
class ProcedeureDatabaseResultInfo {
}
exports.ProcedeureDatabaseResultInfo = ProcedeureDatabaseResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryProcedureDatabse),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProcedeureDatabaseResultInfo.prototype, "ProcedureInfo", void 0);
class QueryProcedureDatabse {
}
exports.QueryProcedureDatabse = QueryProcedureDatabse;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedureDatabse.prototype, "Icd9", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedureDatabse.prototype, "ProcedureName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryProcedureDatabse.prototype, "ProcedureDate", void 0);
class ResultProcedureDatabaseInfoDto {
}
exports.ResultProcedureDatabaseInfoDto = ResultProcedureDatabaseInfoDto;
//# sourceMappingURL=result-procedure-databse.dto.js.map