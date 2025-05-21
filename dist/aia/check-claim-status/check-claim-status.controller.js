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
exports.CheckClaimStatusController = void 0;
const common_1 = require("@nestjs/common");
const check_claim_status_service_1 = require("./check-claim-status.service");
const query_check_claim_status_dto_1 = require("./dto/query-check-claim-status.dto");
const query_check_claim_status_listall_dto_1 = require("./dto/query-check-claim-status-listall.dto");
let CheckClaimStatusController = class CheckClaimStatusController {
    constructor(checkClaimStatusService) {
        this.checkClaimStatusService = checkClaimStatusService;
    }
    async getcheckclaimstatus(queryCheckClaimStatusBodyDto) {
        const result = await this.checkClaimStatusService.Checkclaimstatus(queryCheckClaimStatusBodyDto);
        return result;
    }
    async getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto) {
        const result = await this.checkClaimStatusService.getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto);
        return result;
    }
};
exports.CheckClaimStatusController = CheckClaimStatusController;
__decorate([
    (0, common_1.Post)('/getcheckclaimstatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_claim_status_dto_1.QueryCheckClaimStatusBodyDto]),
    __metadata("design:returntype", Promise)
], CheckClaimStatusController.prototype, "getcheckclaimstatus", null);
__decorate([
    (0, common_1.Post)('/getcheckclaimstatusListAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_claim_status_listall_dto_1.QueryCheckClaimStatusListAllBodyDto]),
    __metadata("design:returntype", Promise)
], CheckClaimStatusController.prototype, "getcheckclaimstatusListAll", null);
exports.CheckClaimStatusController = CheckClaimStatusController = __decorate([
    (0, common_1.Controller)('/v1/check-claim-status'),
    __metadata("design:paramtypes", [check_claim_status_service_1.CheckClaimStatusService])
], CheckClaimStatusController);
//# sourceMappingURL=check-claim-status.controller.js.map