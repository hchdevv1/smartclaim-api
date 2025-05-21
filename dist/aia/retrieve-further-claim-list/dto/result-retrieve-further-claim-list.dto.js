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
exports.InsuranceData = exports.InsuranceResult = exports.InsuranceResultInfo = exports.FurtherClaimList = exports.ResultInfo = exports.ResultRetrieveFurtherClaimDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ResultRetrieveFurtherClaimDto {
}
exports.ResultRetrieveFurtherClaimDto = ResultRetrieveFurtherClaimDto;
class ResultInfo {
}
exports.ResultInfo = ResultInfo;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FurtherClaimList),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ResultInfo.prototype, "FurtherClaimList", void 0);
class FurtherClaimList {
}
exports.FurtherClaimList = FurtherClaimList;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "FurtherClaimId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "ClaimNo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "OccurrenceNo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "Icd10", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "DxName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    TransformDateString(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "DscDateTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    TransformDateString(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "VisitDateTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    TransformDateString(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    TransformDateString(),
    __metadata("design:type", String)
], FurtherClaimList.prototype, "FurtherClaimVN", void 0);
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
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FurtherClaimList),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InsuranceData.prototype, "FurtherClaimList", void 0);
function TransformDateString() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (value) {
            const date = new Date(value);
            return date.toISOString().split('T')[0];
        }
        return value;
    });
}
//# sourceMappingURL=result-retrieve-further-claim-list.dto.js.map