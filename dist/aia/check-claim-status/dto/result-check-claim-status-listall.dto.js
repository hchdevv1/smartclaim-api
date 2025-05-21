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
exports.ResultCheckClaimStatusListAllDto = exports.ResultInfo = exports.InsuranceDataListAll = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const http_status_message_dto_1 = require("../../../utils/dto/http-status-message.dto");
class StatusInfoDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "BatchNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "ClaimStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "ClaimStatusCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "ClaimStatusDesc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "ClaimStatusDesc_EN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "ClaimStatusDesc_TH", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "TotalApproveAmount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "PaymentDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StatusInfoDto.prototype, "InvoiceNumber", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StatusInfoDto.prototype, "AttachDocList", void 0);
class ResultDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDto.prototype, "Code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDto.prototype, "Message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResultDto.prototype, "MessageTh", void 0);
class InsuranceDataListAll {
}
exports.InsuranceDataListAll = InsuranceDataListAll;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsuranceDataListAll.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsuranceDataListAll.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ResultDto),
    __metadata("design:type", ResultDto)
], InsuranceDataListAll.prototype, "Result", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => StatusInfoDto),
    __metadata("design:type", StatusInfoDto)
], InsuranceDataListAll.prototype, "StatusInfo", void 0);
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InsuranceDataListAll),
    __metadata("design:type", Array)
], ResultInfo.prototype, "InsuranceData", void 0);
class ResultCheckClaimStatusListAllDto {
}
exports.ResultCheckClaimStatusListAllDto = ResultCheckClaimStatusListAllDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => http_status_message_dto_1.HttpMessageDto),
    __metadata("design:type", http_status_message_dto_1.HttpMessageDto)
], ResultCheckClaimStatusListAllDto.prototype, "HTTPStatus", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ResultInfo),
    __metadata("design:type", ResultInfo)
], ResultCheckClaimStatusListAllDto.prototype, "Result", void 0);
//# sourceMappingURL=result-check-claim-status-listall.dto.js.map