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
exports.BillingSubmissionController = void 0;
const common_1 = require("@nestjs/common");
const billing_submission_service_1 = require("./billing-submission.service");
const query_billing_submission_dto_1 = require("./dto/query-billing-submission.dto");
let BillingSubmissionController = class BillingSubmissionController {
    constructor(billingSubmissionService) {
        this.billingSubmissionService = billingSubmissionService;
    }
    async getbillingsubmission(queryBillingSubmissionBodyDto) {
        const result = this.billingSubmissionService.Billingsubmission(queryBillingSubmissionBodyDto);
        return result;
    }
};
exports.BillingSubmissionController = BillingSubmissionController;
__decorate([
    (0, common_1.Post)('/getbillingsubmission'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_billing_submission_dto_1.QueryBillingSubmissionBodyDto]),
    __metadata("design:returntype", Promise)
], BillingSubmissionController.prototype, "getbillingsubmission", null);
exports.BillingSubmissionController = BillingSubmissionController = __decorate([
    (0, common_1.Controller)('/v1/billing-submission'),
    __metadata("design:paramtypes", [billing_submission_service_1.BillingSubmissionService])
], BillingSubmissionController);
//# sourceMappingURL=billing-submission.controller.js.map