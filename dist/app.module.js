"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const utils_module_1 = require("./utils/utils.module");
const trakcare_module_1 = require("./trakcare/trakcare.module");
const attach_doc_list_module_1 = require("./aia/attach-doc-list/attach-doc-list.module");
const billing_submission_module_1 = require("./aia/billing-submission/billing-submission.module");
const check_claim_status_module_1 = require("./aia/check-claim-status/check-claim-status.module");
const check_eligible_module_1 = require("./aia/check-eligible/check-eligible.module");
const claim_cancel_module_1 = require("./aia/claim-cancel/claim-cancel.module");
const ipd_discharge_module_1 = require("./aia/ipd-discharge/ipd-discharge.module");
const opd_discharge_module_1 = require("./aia/opd-discharge/opd-discharge.module");
const preauth_submission_module_1 = require("./aia/preauth-submission/preauth-submission.module");
const retrieve_further_claim_list_module_1 = require("./aia/retrieve-further-claim-list/retrieve-further-claim-list.module");
const retrieve_preauth_list_module_1 = require("./aia/retrieve-preauth-list/retrieve-preauth-list.module");
const patientinfo_module_1 = require("./aia/patientinfo/patientinfo.module");
const check_opd_balance_module_1 = require("./aia/check-opd-balance/check-opd-balance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [utils_module_1.UtilsModule, trakcare_module_1.TrakcareModule,
            attach_doc_list_module_1.AttachDocListModule, billing_submission_module_1.BillingSubmissionModule, check_claim_status_module_1.CheckClaimStatusModule, check_eligible_module_1.CheckEligibleModule, claim_cancel_module_1.ClaimCancelModule,
            ipd_discharge_module_1.IpdDischargeModule, opd_discharge_module_1.OpdDischargeModule,
            preauth_submission_module_1.PreauthSubmissionModule, retrieve_further_claim_list_module_1.RetrieveFurtherClaimListModule, retrieve_preauth_list_module_1.RetrievePreauthListModule, patientinfo_module_1.PatientinfoModule,
            check_opd_balance_module_1.CheckOpdBalanceModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map