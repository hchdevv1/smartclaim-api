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
exports.ClaimCancelController = void 0;
const common_1 = require("@nestjs/common");
const claim_cancel_service_1 = require("./claim-cancel.service");
const query_claim_cancel_dto_1 = require("./dto/query-claim-cancel.dto");
let ClaimCancelController = class ClaimCancelController {
    constructor(claimCancelService) {
        this.claimCancelService = claimCancelService;
    }
    async getclaimcancel(queryClaimCancelBodyDto) {
        const result = this.claimCancelService.ClaimCancel(queryClaimCancelBodyDto);
        return result;
    }
};
exports.ClaimCancelController = ClaimCancelController;
__decorate([
    (0, common_1.Post)('/getclaimcancel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_claim_cancel_dto_1.QueryClaimCancelBodyDto]),
    __metadata("design:returntype", Promise)
], ClaimCancelController.prototype, "getclaimcancel", null);
exports.ClaimCancelController = ClaimCancelController = __decorate([
    (0, common_1.Controller)('/v1/claim-cancel'),
    __metadata("design:paramtypes", [claim_cancel_service_1.ClaimCancelService])
], ClaimCancelController);
//# sourceMappingURL=claim-cancel.controller.js.map