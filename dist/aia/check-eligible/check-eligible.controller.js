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
exports.CheckEligibleController = void 0;
const common_1 = require("@nestjs/common");
const check_eligible_service_1 = require("./check-eligible.service");
const query_check_eligible_dto_1 = require("./dto/query-check-eligible.dto");
let CheckEligibleController = class CheckEligibleController {
    constructor(checkEligibleService) {
        this.checkEligibleService = checkEligibleService;
    }
    async getEpisodeByHN(queryEligibleBodyDto) {
        const result = this.checkEligibleService.getEpisodeByHN(queryEligibleBodyDto);
        return result;
    }
    async checkeligible(queryEligibleBodyDto) {
        const result = this.checkEligibleService.checkeligible(queryEligibleBodyDto);
        return result;
    }
    async crateTransaction(queryCreateTransactionBodyDto) {
        const result = this.checkEligibleService.crateTransaction(queryCreateTransactionBodyDto);
        return result;
    }
    async getListPolicyNo(queryEligibleBodyDto) {
        const result = this.checkEligibleService.getListPolicyNo(queryEligibleBodyDto);
        return result;
    }
    async getListPolicyNoDetail(queryEligibleBodyDto) {
        const result = this.checkEligibleService.getListPolicyNoDetail(queryEligibleBodyDto);
        return result;
    }
};
exports.CheckEligibleController = CheckEligibleController;
__decorate([
    (0, common_1.Post)('/getEpisodeByHN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_eligible_dto_1.QueryEligibleBodyDto]),
    __metadata("design:returntype", Promise)
], CheckEligibleController.prototype, "getEpisodeByHN", null);
__decorate([
    (0, common_1.Post)('/checkeligible'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_eligible_dto_1.QueryEligibleBodyDto]),
    __metadata("design:returntype", Promise)
], CheckEligibleController.prototype, "checkeligible", null);
__decorate([
    (0, common_1.Post)('/crateTransaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_eligible_dto_1.QueryCreateTransactionBodyDto]),
    __metadata("design:returntype", Promise)
], CheckEligibleController.prototype, "crateTransaction", null);
__decorate([
    (0, common_1.Post)('/getListPolicyNo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_eligible_dto_1.QueryEligibleBodyDto]),
    __metadata("design:returntype", Promise)
], CheckEligibleController.prototype, "getListPolicyNo", null);
__decorate([
    (0, common_1.Post)('/getListPolicyNoDetail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_check_eligible_dto_1.QueryEligibleBodyDto]),
    __metadata("design:returntype", Promise)
], CheckEligibleController.prototype, "getListPolicyNoDetail", null);
exports.CheckEligibleController = CheckEligibleController = __decorate([
    (0, common_1.Controller)('/v1/check-eligible'),
    __metadata("design:paramtypes", [check_eligible_service_1.CheckEligibleService])
], CheckEligibleController);
//# sourceMappingURL=check-eligible.controller.js.map