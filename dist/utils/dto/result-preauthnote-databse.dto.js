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
exports.ResultPreAuthNoteDatabaseInfoDto = exports.QueryPreAuthNoteDatabse = exports.PreAuthNoteDatabaseResultInfo = exports.ResultPreAuthNoteDto = exports.QueryPreAuthNoteDatabaseBodyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryPreAuthNoteDatabaseBodyDto {
}
exports.QueryPreAuthNoteDatabaseBodyDto = QueryPreAuthNoteDatabaseBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabaseBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabaseBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryPreAuthNoteDatabaseBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabaseBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabaseBodyDto.prototype, "VN", void 0);
class ResultPreAuthNoteDto {
}
exports.ResultPreAuthNoteDto = ResultPreAuthNoteDto;
class PreAuthNoteDatabaseResultInfo {
}
exports.PreAuthNoteDatabaseResultInfo = PreAuthNoteDatabaseResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryPreAuthNoteDatabse),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreAuthNoteDatabaseResultInfo.prototype, "PreAuthNote", void 0);
class QueryPreAuthNoteDatabse {
}
exports.QueryPreAuthNoteDatabse = QueryPreAuthNoteDatabse;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabse.prototype, "PreAuthDateTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreAuthNoteDatabse.prototype, "PreAuthDetail", void 0);
class ResultPreAuthNoteDatabaseInfoDto {
}
exports.ResultPreAuthNoteDatabaseInfoDto = ResultPreAuthNoteDatabaseInfoDto;
//# sourceMappingURL=result-preauthnote-databse.dto.js.map