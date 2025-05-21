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
exports.ResultAttachDocListInfoDto = exports.InsuranceData = exports.InsuranceResult = exports.InsuranceResultInfo = exports.ResultInfo = exports.ResultAttachDocListDto = void 0;
const class_validator_1 = require("class-validator");
class ResultAttachDocListDto {
}
exports.ResultAttachDocListDto = ResultAttachDocListDto;
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
class InsuranceResultInfo {
}
exports.InsuranceResultInfo = InsuranceResultInfo;
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
class InsuranceData {
}
exports.InsuranceData = InsuranceData;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InsuranceData.prototype, "InsurerCode", void 0);
class ResultAttachDocListInfoDto {
}
exports.ResultAttachDocListInfoDto = ResultAttachDocListInfoDto;
//# sourceMappingURL=result-attach-doc-list.dto.js.map