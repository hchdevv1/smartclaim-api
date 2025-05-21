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
exports.QueryAccidentDatabaseBodyDto = exports.ResultAccidentDatabaseDto = exports.AccidentDatabaseResultInfo = exports.InjuryDetail = exports.CauseOfInjuryDetail = exports.AccidentDatabase = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const http_status_message_dto_1 = require("./http-status-message.dto");
class AccidentDatabase {
}
exports.AccidentDatabase = AccidentDatabase;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccidentDatabase.prototype, "AccidentPlace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccidentDatabase.prototype, "AccidentDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CauseOfInjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccidentDatabase.prototype, "CauseOfInjuryDetail", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InjuryDetail),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AccidentDatabase.prototype, "InjuryDetail", void 0);
class CauseOfInjuryDetail {
}
exports.CauseOfInjuryDetail = CauseOfInjuryDetail;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CauseOfInjuryDetail.prototype, "CauseOfInjury", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CauseOfInjuryDetail.prototype, "CommentOfInjury", void 0);
class InjuryDetail {
}
exports.InjuryDetail = InjuryDetail;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "WoundType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "InjurySide", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InjuryDetail.prototype, "InjuryArea", void 0);
class AccidentDatabaseResultInfo {
}
exports.AccidentDatabaseResultInfo = AccidentDatabaseResultInfo;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AccidentDatabase)
], AccidentDatabaseResultInfo.prototype, "AccidentDetailInfo", void 0);
class ResultAccidentDatabaseDto {
}
exports.ResultAccidentDatabaseDto = ResultAccidentDatabaseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", http_status_message_dto_1.HttpMessageDto)
], ResultAccidentDatabaseDto.prototype, "HTTPStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AccidentDatabaseResultInfo),
    __metadata("design:type", AccidentDatabaseResultInfo)
], ResultAccidentDatabaseDto.prototype, "Result", void 0);
class QueryAccidentDatabaseBodyDto {
}
exports.QueryAccidentDatabaseBodyDto = QueryAccidentDatabaseBodyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccidentDatabaseBodyDto.prototype, "RefId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccidentDatabaseBodyDto.prototype, "TransactionNo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryAccidentDatabaseBodyDto.prototype, "InsurerCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccidentDatabaseBodyDto.prototype, "HN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAccidentDatabaseBodyDto.prototype, "VN", void 0);
//# sourceMappingURL=result-accident-databse.dto.js.map