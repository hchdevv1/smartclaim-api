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
exports.TrakcareController = void 0;
const common_1 = require("@nestjs/common");
const trakcare_service_1 = require("./trakcare.service");
let TrakcareController = class TrakcareController {
    constructor(trakcareService) {
        this.trakcareService = trakcareService;
    }
    getPatientInfoByPID(xPID) {
        return this.trakcareService.getPatientInfoByPID(xPID);
    }
    getPatientInfoByHN(xHN) {
        return this.trakcareService.getPatientInfoByHN(xHN);
    }
    getPatientInfoByPassportNumber(xHN) {
        return this.trakcareService.getPatientInfoByPassportNumber(xHN);
    }
    getEpisodeByHN(xHN, xEpiDate, xEpiType) {
        return this.trakcareService.getEpisodeByHN(xHN, xEpiDate, xEpiType);
    }
    getEpisodeInfoByVN(xVN) {
        return this.trakcareService.getEpisodeInfoByVN(xVN);
    }
    getOPDDischargeVisit(xVN) {
        return this.trakcareService.getOPDDischargeVisit(xVN);
    }
    getOPDDischargeDiagnosis(xVN) {
        return this.trakcareService.getOPDDischargeDiagnosis(xVN);
    }
    getOPDDischargeDoctor(xVN) {
        return this.trakcareService.getOPDDischargeDoctor(xVN);
    }
    getOPDDischargeProcedure(xVN) {
        return this.trakcareService.getOPDDischargeProcedure(xVN);
    }
    getOPDDischargeInvestigation(xVN) {
        return this.trakcareService.getOPDDischargeInvestigation(xVN);
    }
    getOPDDischargeVitalSign(xVN) {
        return this.trakcareService.getOPDDischargeVitalSign(xVN);
    }
    getOPDDischargeAccident(xVN) {
        return this.trakcareService.getOPDDischargeAccident(xVN);
    }
    getOPDDischargePatient(xHN) {
        return this.trakcareService.getOPDDischargePatient(xHN);
    }
    getOPDDischargeOrderItem(xVN) {
        return this.trakcareService.getOPDDischargeOrderItem(xVN);
    }
    getOPDDischargeBilling(xVN) {
        return this.trakcareService.getOPDDischargeBilling(xVN);
    }
    getOPDCheckBalance(xVN) {
        return this.trakcareService.getOPDCheckBalance(xVN);
    }
    checkVisitNumberAvailable(xHN, xVN) {
        return this.trakcareService.checkVisitNumberAvailable(xHN, xVN);
    }
    getListVisitClaimAIA(xVN) {
        return this.trakcareService.getListVisitClaimAIA(xVN);
    }
    getIPDVisit(xVN) {
        return this.trakcareService.getIPDVisit(xVN);
    }
    getIPDVitalSign(xVN) {
        return this.trakcareService.getIPDVitalSign(xVN);
    }
    getIPDDoctor(xVN) {
        return this.trakcareService.getIPDDoctor(xVN);
    }
    getIPDDiagnosis(xVN) {
        return this.trakcareService.getIPDDiagnosis(xVN);
    }
    getIPDInvestigation(xVN) {
        return this.trakcareService.getIPDInvestigation(xVN);
    }
    getIPDOrderItem(xVN) {
        return this.trakcareService.getIPDOrderItem(xVN);
    }
    getIPDBilling(xVN) {
        return this.trakcareService.getIPDBilling(xVN);
    }
    getICDDx(xICDDxCode) {
        return this.trakcareService.getICDDx(xICDDxCode);
    }
    getICD9(xICD9Code) {
        return this.trakcareService.getICD9(xICD9Code);
    }
    getBillingSubgroup(xBillingCode) {
        return this.trakcareService.getBillingSubgroup(xBillingCode);
    }
};
exports.TrakcareController = TrakcareController;
__decorate([
    (0, common_1.Get)('/PatientInfoByPID/:xPID'),
    __param(0, (0, common_1.Param)('xPID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getPatientInfoByPID", null);
__decorate([
    (0, common_1.Get)('/PatientInfoByHN/:xHN'),
    __param(0, (0, common_1.Param)('xHN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getPatientInfoByHN", null);
__decorate([
    (0, common_1.Get)('/PatientInfoByPassportNumber/:xHN'),
    __param(0, (0, common_1.Param)('xHN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getPatientInfoByPassportNumber", null);
__decorate([
    (0, common_1.Get)('/getEpisodeByHN/:xHN/:xEpiDate/:xEpiType'),
    __param(0, (0, common_1.Param)('xHN')),
    __param(1, (0, common_1.Param)('xEpiDate')),
    __param(2, (0, common_1.Param)('xEpiType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getEpisodeByHN", null);
__decorate([
    (0, common_1.Get)('/getEpisodeInfoByVN/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getEpisodeInfoByVN", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeVisit/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeVisit", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeDiagnosis/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeDiagnosis", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeDoctor/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeDoctor", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeProcedure/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeProcedure", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeInvestigation/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeInvestigation", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeVitalSign/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeVitalSign", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeAccident/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeAccident", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargePatient/:xHN'),
    __param(0, (0, common_1.Param)('xHN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargePatient", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeOrderItem/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeOrderItem", null);
__decorate([
    (0, common_1.Get)('/getOPDDischargeBilling/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDDischargeBilling", null);
__decorate([
    (0, common_1.Get)('/getOPDCheckBalance/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getOPDCheckBalance", null);
__decorate([
    (0, common_1.Get)('/checkVisitNumberAvailable/:xHN/:xVN'),
    __param(0, (0, common_1.Param)('xHN')),
    __param(1, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "checkVisitNumberAvailable", null);
__decorate([
    (0, common_1.Get)('/getListVisitClaimAIA/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getListVisitClaimAIA", null);
__decorate([
    (0, common_1.Get)('/getIPDVisit/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDVisit", null);
__decorate([
    (0, common_1.Get)('/getIPDVitalSign/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDVitalSign", null);
__decorate([
    (0, common_1.Get)('/getIPDDoctor/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDDoctor", null);
__decorate([
    (0, common_1.Get)('/getIPDDiagnosis/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDDiagnosis", null);
__decorate([
    (0, common_1.Get)('/getIPDInvestigation/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDInvestigation", null);
__decorate([
    (0, common_1.Get)('/getIPDOrderItem/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDOrderItem", null);
__decorate([
    (0, common_1.Get)('/getIPDBilling/:xVN'),
    __param(0, (0, common_1.Param)('xVN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getIPDBilling", null);
__decorate([
    (0, common_1.Get)('/getICDDx/:xICDDxCode'),
    __param(0, (0, common_1.Param)('xICDDxCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getICDDx", null);
__decorate([
    (0, common_1.Get)('/getICD9/:xICD9Code'),
    __param(0, (0, common_1.Param)('xICD9Code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getICD9", null);
__decorate([
    (0, common_1.Get)('/getBillingSubgroup/:xBillingCode'),
    __param(0, (0, common_1.Param)('xBillingCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrakcareController.prototype, "getBillingSubgroup", null);
exports.TrakcareController = TrakcareController = __decorate([
    (0, common_1.Controller)('/v1/trakcare'),
    __metadata("design:paramtypes", [trakcare_service_1.TrakcareService])
], TrakcareController);
//# sourceMappingURL=trakcare.controller.js.map