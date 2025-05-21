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
exports.ResultPreBillingDatabaseInfoDto = exports.QueryPreBillingDatabse = exports.PreBillingDatabaseResultInfo = exports.ResultPreBillingDto = exports.QueryPreBillingDatabaseBodyDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QueryPreBillingDatabaseBodyDto {
}
exports.QueryPreBillingDatabaseBodyDto = QueryPreBillingDatabaseBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabaseBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabaseBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryPreBillingDatabaseBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabaseBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabaseBodyDto.prototype, "VN", void 0);
class ResultPreBillingDto {
}
exports.ResultPreBillingDto = ResultPreBillingDto;
class PreBillingDatabaseResultInfo {
}
exports.PreBillingDatabaseResultInfo = PreBillingDatabaseResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QueryPreBillingDatabse),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreBillingDatabaseResultInfo.prototype, "PreBillingInfo", void 0);
class QueryPreBillingDatabse {
}
exports.QueryPreBillingDatabse = QueryPreBillingDatabse;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "LocalBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "LocalBillingName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "SimbBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "PayorBillingCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "BillingInitial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "BillingDiscount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "BillingNetAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPreBillingDatabse.prototype, "TotalBillAmount", void 0);
class ResultPreBillingDatabaseInfoDto {
}
exports.ResultPreBillingDatabaseInfoDto = ResultPreBillingDatabaseInfoDto;
//# sourceMappingURL=result-prebilling-databse.dto.js.map