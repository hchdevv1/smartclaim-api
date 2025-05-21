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
exports.IpdDischargeController = void 0;
const common_1 = require("@nestjs/common");
const ipd_discharge_service_1 = require("./ipd-discharge.service");
const query_ipd_discharge_dto_1 = require("./dto/query-ipd-discharge.dto");
const query_visit_ipd_discharge_dto_1 = require("./dto/query-visit-ipd-discharge.dto");
const query_procedure_ipd_discharge_dto_1 = require("./dto/query-procedure-ipd-discharge.dto");
const query_accident_ipd_discharge_dto_1 = require("./dto/query-accident-ipd-discharge.dto");
const query_submit_ipd_discharge_dto_1 = require("./dto/query-submit-ipd-discharge.dto");
const query_concurrentnote_ipd_discharge_dto_1 = require("./dto/query-concurrentnote-ipd-discharge.dto");
let IpdDischargeController = class IpdDischargeController {
    constructor(ipdDischargeService) {
        this.ipdDischargeService = ipdDischargeService;
    }
    async getIPDVisit(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDVisit(queryIpdDischargeDto);
        return result;
    }
    async getIPDVitalSign(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDVitalSign(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeDoctor(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeDoctor(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeDiagnosis(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeDiagnosis(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeInvestigation(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeInvestigation(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeOrderItem(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeOrderItem(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeBilling(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeBilling(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeProcedure(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeProcedure(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeAccident(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeAccident(queryIpdDischargeDto);
        return result;
    }
    async getIPDDischargeConcurNote(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.getIPDDischargeConcurNote(queryIpdDischargeDto);
        return result;
    }
    async SubmitIPDVisit(queryIPDVisitDto) {
        const result = this.ipdDischargeService.SubmitIPDVisit(queryIPDVisitDto);
        return result;
    }
    async SubmitProcedure(queryProcedureDto) {
        const result = this.ipdDischargeService.SubmitProcedure(queryProcedureDto);
        return result;
    }
    async SubmitAccident(queryAccidentDto) {
        const result = this.ipdDischargeService.SubmitAccident(queryAccidentDto);
        return result;
    }
    async SubmitConcurNote(queryConcurNoteDto) {
        const result = this.ipdDischargeService.SubmitConcurNote(queryConcurNoteDto);
        return result;
    }
    async SubmitOPDDischargeToAIA(querySubmitIpdDischargeDto) {
        const result = this.ipdDischargeService.SubmitIPDDischargeToAIA(querySubmitIpdDischargeDto);
        return result;
    }
    async ReviewIPDDischarge(queryIpdDischargeDto) {
        const result = this.ipdDischargeService.ReviewIPDDischarge(queryIpdDischargeDto);
        return result;
    }
};
exports.IpdDischargeController = IpdDischargeController;
__decorate([
    (0, common_1.Post)('/getIPDVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDVisit", null);
__decorate([
    (0, common_1.Post)('/getIPDVitalSign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDVitalSign", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeDoctor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeDoctor", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeDiagnosis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeDiagnosis", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeInvestigation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeInvestigation", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeOrderItem'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeOrderItem", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeBilling", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeProcedure", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeAccident", null);
__decorate([
    (0, common_1.Post)('/getIPDDischargeConcurNote'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "getIPDDischargeConcurNote", null);
__decorate([
    (0, common_1.Post)('/SubmitIPDVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_visit_ipd_discharge_dto_1.QueryIPDVisitDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "SubmitIPDVisit", null);
__decorate([
    (0, common_1.Post)('/SubmitProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_procedure_ipd_discharge_dto_1.QueryProcedureDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "SubmitProcedure", null);
__decorate([
    (0, common_1.Post)('/SubmitAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_accident_ipd_discharge_dto_1.QueryAccidentDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "SubmitAccident", null);
__decorate([
    (0, common_1.Post)('/SubmitConcurNote'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_concurrentnote_ipd_discharge_dto_1.QueryConcurNoteDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "SubmitConcurNote", null);
__decorate([
    (0, common_1.Post)('/SubmitIPDDischargeToAIA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_submit_ipd_discharge_dto_1.QuerySubmitIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "SubmitOPDDischargeToAIA", null);
__decorate([
    (0, common_1.Post)('/ReviewIPDDischarge'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ipd_discharge_dto_1.QueryIpdDischargeDto]),
    __metadata("design:returntype", Promise)
], IpdDischargeController.prototype, "ReviewIPDDischarge", null);
exports.IpdDischargeController = IpdDischargeController = __decorate([
    (0, common_1.Controller)('/V1/ipd-discharge'),
    __metadata("design:paramtypes", [ipd_discharge_service_1.IpdDischargeService])
], IpdDischargeController);
//# sourceMappingURL=ipd-discharge.controller.js.map