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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpdDischargeController = void 0;
const common_1 = require("@nestjs/common");
const opd_discharge_service_1 = require("./opd-discharge.service");
const query_opd_discharge_dto_1 = require("./dto/query-opd-discharge.dto");
const query_submit_opd_discharge_dto_1 = require("./dto/query-submit-opd-discharge.dto");
const query_procedure_opd_discharge_dto_1 = require("./dto/query-procedure-opd-discharge.dto");
const query_accident_opd_discharge_dto_1 = require("./dto/query-accident-opd-discharge.dto");
const query_visit_opd_discharge_dto_1 = require("./dto/query-visit-opd-discharge.dto");
const review_opd_discharge_dto_1 = require("./dto/review-opd-discharge.dto");
const query_updatefurtherclaimvn_opd_discharge_dto_1 = require("./dto/query-updatefurtherclaimvn-opd-discharge.dto");
let OpdDischargeController = class OpdDischargeController {
    constructor(opdDischargeService) {
        this.opdDischargeService = opdDischargeService;
    }
    async getOPDDischargeVisit(queryOpdDischargeDto) {
        console.log('ppp');
        const result = this.opdDischargeService.getOPDDischargeVisit(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeVitalSign(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeVitalSign(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeDoctor(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeDoctor(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeDiagnosis(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeDiagnosis(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeInvestigation(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeInvestigation(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeOrderItem(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeOrderItem(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeBilling(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeBilling(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeProcedure(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeProcedure(queryOpdDischargeDto);
        return result;
    }
    async getOPDDischargeAccident(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getOPDDischargeAccident(queryOpdDischargeDto);
        return result;
    }
    async getListVisitClaimAIA(queryOpdDischargeDto) {
        const result = this.opdDischargeService.getListVisitClaimAIA(queryOpdDischargeDto);
        return result;
    }
    async SubmitVisit(queryVisitDto) {
        const result = this.opdDischargeService.SubmitVisit(queryVisitDto);
        return result;
    }
    async SubmitProcedure(queryProcedureDto) {
        const result = this.opdDischargeService.SubmitProcedure(queryProcedureDto);
        return result;
    }
    async SubmitAccident(queryAccidentDto) {
        const result = this.opdDischargeService.SubmitAccident(queryAccidentDto);
        return result;
    }
    async SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto) {
        const result = this.opdDischargeService.SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto);
        return result;
    }
    async ReviewOPDDischarge(queryReviewOpdDischargeDto) {
        const result = this.opdDischargeService.ReviewOPDDischarge(queryReviewOpdDischargeDto);
        return result;
    }
    async UpdateFurtherClaimVN(queryUpdateFurtherClaimVNBodyDto) {
        const result = this.opdDischargeService.UpdateFurtherClaimVN(queryUpdateFurtherClaimVNBodyDto);
        return result;
    }
};
exports.OpdDischargeController = OpdDischargeController;
__decorate([
    (0, common_1.Post)('/getOPDDischargeVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeVisit", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeVitalSign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeVitalSign", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeDoctor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeDoctor", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeDiagnosis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeDiagnosis", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeInvestigation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeInvestigation", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeOrderItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeOrderItem", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeBilling", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeProcedure", null);
__decorate([
    (0, common_1.Post)('/getOPDDischargeAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getOPDDischargeAccident", null);
__decorate([
    (0, common_1.Post)('/getListVisitClaimAIA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_opd_discharge_dto_1.QueryOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "getListVisitClaimAIA", null);
__decorate([
    (0, common_1.Post)('/SubmitVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_visit_opd_discharge_dto_1.QueryVisitDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "SubmitVisit", null);
__decorate([
    (0, common_1.Post)('/SubmitProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_procedure_opd_discharge_dto_1.QueryProcedureDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "SubmitProcedure", null);
__decorate([
    (0, common_1.Post)('/SubmitAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_accident_opd_discharge_dto_1.QueryAccidentDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "SubmitAccident", null);
__decorate([
    (0, common_1.Post)('/SubmitOPDDischargeToAIA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_submit_opd_discharge_dto_1.QuerySubmitOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "SubmitOPDDischargeToAIA", null);
__decorate([
    (0, common_1.Post)('/ReviewOPDDischarge'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_opd_discharge_dto_1.QueryReviewOpdDischargeDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "ReviewOPDDischarge", null);
__decorate([
    (0, common_1.Post)('/UpdateFurtherClaimVN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_updatefurtherclaimvn_opd_discharge_dto_1.QueryUpdateFurtherClaimVNBodyDto]),
    __metadata("design:returntype", Promise)
], OpdDischargeController.prototype, "UpdateFurtherClaimVN", null);
exports.OpdDischargeController = OpdDischargeController = __decorate([
    (0, common_1.Controller)('/V1/opd-discharge'),
    __metadata("design:paramtypes", [opd_discharge_service_1.OpdDischargeService])
], OpdDischargeController);
//# sourceMappingURL=opd-discharge.controller.js.map