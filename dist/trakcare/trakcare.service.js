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
exports.TrakcareService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const http_status_message_service_1 = require("../utils/http-status-message/http-status-message.service");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const TRAKCARE_APIURL = process.env.TRAKCARE_APIURL;
let TrakcareService = class TrakcareService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPatientInfoByPID(xPID) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByPID/${xPID}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getPatientInfoByHN(xHN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByHN/${xHN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getPatientInfoByPassportNumber(xPassportnumber) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getPatientInfoByPassportNumber/${xPassportnumber}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getEpisodeByHN(xHN, xEpiDate, xEpiType) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getEpisodeByHN/${xHN}/${xEpiDate}/${xEpiType}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getEpisodeInfoByVN(xVN) {
        let response;
        let EpisodeInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getEpisodeInfoByVN/${xVN}`));
            EpisodeInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return EpisodeInfo;
    }
    async getOPDDischargeVisit(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeVisit/${xVN}`));
            const presentIllness = response.data?.VisitInfo?.PresentIllness ?? "";
            response.data.VisitInfo.PresentIllness = presentIllness
                ? this.cleanSpecialCharacters(presentIllness)
                : presentIllness;
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeDiagnosis(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeDiagnosis/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeDoctor(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeDoctor/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeProcedure(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeProcedure/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeInvestigation(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeInvestigation/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeVitalSign(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeVitalSign/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeAccident(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeAccident/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeOrderItem(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeOrderItem/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargeBilling(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargeBilling/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDCheckBalance(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDCheckBalance/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async checkVisitNumberAvailable(xHN, xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/checkVisitNumberAvailable/${xHN}/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getOPDDischargePatient(xHN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getOPDDischargePatient/${xHN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getListVisitClaimAIA(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getListVisitClaimAIA/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDVisit(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDVisit/${xVN}`));
            const presentIllness = response.data?.VisitInfo?.PresentIllness ?? "";
            response.data.VisitInfo.PresentIllness = presentIllness
                ? this.cleanSpecialCharacters(presentIllness)
                : presentIllness;
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDVisitIsDischarge(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDVisitIsDischarge/${xVN}`));
            const presentIllness = response.data?.VisitInfo?.PresentIllness ?? "";
            response.data.VisitInfo.PresentIllness = presentIllness
                ? this.cleanSpecialCharacters(presentIllness)
                : presentIllness;
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDVitalSign(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDVitalSign/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDDoctor(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDDoctor/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDDiagnosis(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDDiagnosis/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDInvestigation(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDInvestigation/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDOrderItem(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDOrderItem/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDBilling(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDBilling/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDProcedure(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDProcedure/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getIPDAccident(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getIPDAccident/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getListBilling(xHN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getListBilling/${xHN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getPreAuthBilling(xVN) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getPreAuthBilling/${xVN}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getICDDx(xICDDxCode) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getICDDx/${xICDDxCode}}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getICD9(xICD9Code) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getICD9/${xICD9Code}}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    async getBillingSubgroup(xBillingCode) {
        let response;
        let PatientInfo;
        try {
            response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${TRAKCARE_APIURL}/getBillingSubgroup/${xBillingCode}}`));
            PatientInfo = response.data;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: httpStatusMessageService.getHttpStatusMessageTrakcare(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return PatientInfo;
    }
    cleanSpecialCharacters(text) {
        return text
            .replace(/\r\n/g, ' ')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    }
};
exports.TrakcareService = TrakcareService;
exports.TrakcareService = TrakcareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TrakcareService);
//# sourceMappingURL=trakcare.service.js.map