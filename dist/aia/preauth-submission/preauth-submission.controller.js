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
exports.PreauthSubmissionController = void 0;
const common_1 = require("@nestjs/common");
const preauth_submission_service_1 = require("./preauth-submission.service");
const query_diagnoisis_preauth_submission_dto_1 = require("./dto/query-diagnoisis-preauth-submission.dto");
const query_preauthnote_preauth_submission_dto_1 = require("./dto/query-preauthnote-preauth-submission.dto");
const query_prebilling_preauth_submission_dto_1 = require("./dto/query-prebilling-preauth-submission.dto");
const query_submit_preauth_submission_dto_1 = require("./dto/query-submit-preauth-submission.dto");
const query_accident_preauth_submission_dto_1 = require("./dto/query-accident-preauth-submission.dto");
const query_procedure_preauth_submission_dto_1 = require("./dto/query-procedure-preauth-submission.dto");
const query_preauth_submission_dto_1 = require("./dto/query-preauth-submission.dto");
const query_updatereferencevn_preauth_submission_dto_1 = require("./dto/query-updatereferencevn-preauth-submission.dto");
const query_packagebundle_preauth_submission_dto_1 = require("./dto/query-packagebundle-preauth-submission.dto");
const query_updateisadmission_preauth_submission_dto_1 = require("./dto/query-updateisadmission-preauth-submission.dto");
let PreauthSubmissionController = class PreauthSubmissionController {
    constructor(preauthSubmissionService) {
        this.preauthSubmissionService = preauthSubmissionService;
    }
    async getListVisitClaimAIA(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getListVisitClaimAIA(queryPreauthSubmissionDto);
        return result;
    }
    async getPreAuthVisit(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreAuthVisit(queryPreauthSubmissionDto);
        return result;
    }
    async getPreAuthDoctor(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreAuthDoctor(queryPreauthSubmissionDto);
        return result;
    }
    async getPreAuthDiagnosis(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreAuthDiagnosis(queryPreauthSubmissionDto);
        return result;
    }
    async getPreAuthProcedure(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreAuthProcedure(queryPreauthSubmissionDto);
        return result;
    }
    getListBilling(xHN) {
        return this.preauthSubmissionService.getListBilling(xHN);
    }
    async setPreBilling(queryPreBillingDto) {
        const result = this.preauthSubmissionService.setPreBilling(queryPreBillingDto);
        return result;
    }
    async getPreBilling(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreBilling(queryPreauthSubmissionDto);
        return result;
    }
    async SubmitPreBilling(queryPreBillingDto) {
        const result = this.preauthSubmissionService.SubmitPreBilling(queryPreBillingDto);
        return result;
    }
    async previewPreBilling(QueryPreBillingDto) {
        const result = this.preauthSubmissionService.previewPreBilling(QueryPreBillingDto);
        return result;
    }
    async InsertPreBilling(queryPreBillingDto) {
        const result = this.preauthSubmissionService.InsertPreBilling(queryPreBillingDto);
        return result;
    }
    async deletePreBillingById(deletePreBillingDto) {
        const result = this.preauthSubmissionService.deletePreBillingById(deletePreBillingDto);
        return result;
    }
    async deletePreBillingByRefId(deletePreBillingDto) {
        const result = this.preauthSubmissionService.deletePreBillingByRefId(deletePreBillingDto);
        return result;
    }
    async getPreAuthAccident(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.getPreAuthAccident(queryPreauthSubmissionDto);
        return result;
    }
    async getPreAuthNote(querySubmitPreAuthDto) {
        const result = this.preauthSubmissionService.getPreAuthNote(querySubmitPreAuthDto);
        return result;
    }
    async getPackageBundle(queryPackageBundleDto) {
        const result = this.preauthSubmissionService.getPackageBundle(queryPackageBundleDto);
        return result;
    }
    async SubmitPreAuthVisit(querySubmitPreAuthDto) {
        const result = this.preauthSubmissionService.SubmitPreAuthVisit(querySubmitPreAuthDto);
        return result;
    }
    async SubmitDiagnosis(queryDiagnosisDto) {
        const result = this.preauthSubmissionService.SubmitDiagnosis(queryDiagnosisDto);
        return result;
    }
    async ReloadDiagnosis(queryDiagnosisDto) {
        const result = this.preauthSubmissionService.ReloadDiagnosis(queryDiagnosisDto);
        return result;
    }
    async SubmitProcedure(queryProcedureDto) {
        const result = this.preauthSubmissionService.SubmitProcedure(queryProcedureDto);
        return result;
    }
    async SubmitAccident(queryAccidentDto) {
        const result = this.preauthSubmissionService.SubmitAccident(queryAccidentDto);
        return result;
    }
    async SubmitPreAuthNote(queryPreAuthNoteDto) {
        const result = this.preauthSubmissionService.SubmitPreAuthNote(queryPreAuthNoteDto);
        return result;
    }
    async UpdateReferenceVN(queryUpdateReferenceVNBodyDto) {
        const result = this.preauthSubmissionService.UpdateReferenceVN(queryUpdateReferenceVNBodyDto);
        return result;
    }
    async UpdateIsAdmission(queryUpdateIsAdmissionBodyDto) {
        const result = this.preauthSubmissionService.UpdateIsAdmission(queryUpdateIsAdmissionBodyDto);
        return result;
    }
    async SubmitPreSubmissionToAIA(querySubmitPreAuthDto) {
        const result = this.preauthSubmissionService.SubmitPreSubmissionToAIA(querySubmitPreAuthDto);
        return result;
    }
    async checkeligiblePreAdmission(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.checkeligiblePreAdmission(queryPreauthSubmissionDto);
        return result;
    }
    async ReviewPreAuth(queryPreauthSubmissionDto) {
        const result = this.preauthSubmissionService.ReviewPreAuth(queryPreauthSubmissionDto);
        return result;
    }
    getICDDx(xICDDxCode) {
        return this.preauthSubmissionService.getICDDx(xICDDxCode);
    }
    getICD9(xICD9Code) {
        return this.preauthSubmissionService.getICD9(xICD9Code);
    }
    getBillingSubgroup(xBillingCode) {
        return this.preauthSubmissionService.getBillingSubgroup(xBillingCode);
    }
};
exports.PreauthSubmissionController = PreauthSubmissionController;
__decorate([
    (0, common_1.Post)('/getListVisitClaimAIA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getListVisitClaimAIA", null);
__decorate([
    (0, common_1.Post)('/getPreAuthVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthVisit", null);
__decorate([
    (0, common_1.Post)('/getPreAuthDoctor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthDoctor", null);
__decorate([
    (0, common_1.Post)('/getPreAuthDiagnosis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthDiagnosis", null);
__decorate([
    (0, common_1.Post)('/getPreAuthProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthProcedure", null);
__decorate([
    (0, common_1.Get)('/getListBilling/:xHN'),
    __param(0, (0, common_1.Param)('xHN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreauthSubmissionController.prototype, "getListBilling", null);
__decorate([
    (0, common_1.Post)('/setPreBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.QueryPreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "setPreBilling", null);
__decorate([
    (0, common_1.Post)('/getPreBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreBilling", null);
__decorate([
    (0, common_1.Post)('/SubmitPreBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.QueryPreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitPreBilling", null);
__decorate([
    (0, common_1.Post)('/previewPreBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.QueryPreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "previewPreBilling", null);
__decorate([
    (0, common_1.Post)('/InsertPreBilling'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.QueryPreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "InsertPreBilling", null);
__decorate([
    (0, common_1.Post)('/deletePreBillingById'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.DeletePreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "deletePreBillingById", null);
__decorate([
    (0, common_1.Post)('/deletePreBillingByRefId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_prebilling_preauth_submission_dto_1.DeletePreBillingDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "deletePreBillingByRefId", null);
__decorate([
    (0, common_1.Post)('/getPreAuthAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthAccident", null);
__decorate([
    (0, common_1.Post)('/getPreAuthNote'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_submit_preauth_submission_dto_1.QuerySubmitPreAuthDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPreAuthNote", null);
__decorate([
    (0, common_1.Post)('/getPackageBundle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_packagebundle_preauth_submission_dto_1.QueryPackageBundleDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "getPackageBundle", null);
__decorate([
    (0, common_1.Post)('/SubmitPreAuthVisit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_submit_preauth_submission_dto_1.QuerySubmitPreAuthDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitPreAuthVisit", null);
__decorate([
    (0, common_1.Post)('/SubmitDiagnosis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_diagnoisis_preauth_submission_dto_1.QueryDiagnosisDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitDiagnosis", null);
__decorate([
    (0, common_1.Post)('/ReloadDiagnosis'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_diagnoisis_preauth_submission_dto_1.QueryDiagnosisDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "ReloadDiagnosis", null);
__decorate([
    (0, common_1.Post)('/SubmitProcedure'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_procedure_preauth_submission_dto_1.QueryProcedureDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitProcedure", null);
__decorate([
    (0, common_1.Post)('/SubmitAccident'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_accident_preauth_submission_dto_1.QueryAccidentDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitAccident", null);
__decorate([
    (0, common_1.Post)('/SubmitPreAuthNote'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauthnote_preauth_submission_dto_1.QueryPreAuthNoteDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitPreAuthNote", null);
__decorate([
    (0, common_1.Post)('/UpdateReferenceVN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_updatereferencevn_preauth_submission_dto_1.QueryUpdateReferenceVNBodyDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "UpdateReferenceVN", null);
__decorate([
    (0, common_1.Post)('/UpdateIsAdmission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_updateisadmission_preauth_submission_dto_1.QueryUpdateIsAdmissionBodyDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "UpdateIsAdmission", null);
__decorate([
    (0, common_1.Post)('/SubmitPreSubmissionToAIA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_submit_preauth_submission_dto_1.QuerySubmitPreAuthDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "SubmitPreSubmissionToAIA", null);
__decorate([
    (0, common_1.Post)('/checkeligiblePreAdmission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "checkeligiblePreAdmission", null);
__decorate([
    (0, common_1.Post)('/ReviewPreAuth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_preauth_submission_dto_1.QueryPreauthSubmissionDto]),
    __metadata("design:returntype", Promise)
], PreauthSubmissionController.prototype, "ReviewPreAuth", null);
__decorate([
    (0, common_1.Get)('/getICDDx/:xICDDxCode'),
    __param(0, (0, common_1.Param)('xICDDxCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreauthSubmissionController.prototype, "getICDDx", null);
__decorate([
    (0, common_1.Get)('/getICD9/:xICD9Code'),
    __param(0, (0, common_1.Param)('xICD9Code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreauthSubmissionController.prototype, "getICD9", null);
__decorate([
    (0, common_1.Get)('/getBillingSubgroup/:xBillingCode'),
    __param(0, (0, common_1.Param)('xBillingCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreauthSubmissionController.prototype, "getBillingSubgroup", null);
exports.PreauthSubmissionController = PreauthSubmissionController = __decorate([
    (0, common_1.Controller)('/v1/preauth-submission'),
    __metadata("design:paramtypes", [preauth_submission_service_1.PreauthSubmissionService])
], PreauthSubmissionController);
//# sourceMappingURL=preauth-submission.controller.js.map