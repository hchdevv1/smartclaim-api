"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreauthSubmissionModule = void 0;
const common_1 = require("@nestjs/common");
const preauth_submission_service_1 = require("./preauth-submission.service");
const preauth_submission_controller_1 = require("./preauth-submission.controller");
const axios_1 = require("@nestjs/axios");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
const check_eligible_service_1 = require("../../aia/check-eligible/check-eligible.service");
let PreauthSubmissionModule = class PreauthSubmissionModule {
};
exports.PreauthSubmissionModule = PreauthSubmissionModule;
exports.PreauthSubmissionModule = PreauthSubmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [preauth_submission_controller_1.PreauthSubmissionController],
        providers: [preauth_submission_service_1.PreauthSubmissionService, utils_service_1.UtilsService, trakcare_service_1.TrakcareService, check_eligible_service_1.CheckEligibleService],
    })
], PreauthSubmissionModule);
//# sourceMappingURL=preauth-submission.module.js.map