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
exports.RetrievePreauthListController = void 0;
const common_1 = require("@nestjs/common");
const retrieve_preauth_list_service_1 = require("./retrieve-preauth-list.service");
const query_retrieve_preauth_list_dto_1 = require("./dto/query-retrieve-preauth-list.dto");
let RetrievePreauthListController = class RetrievePreauthListController {
    constructor(retrievePreauthListService) {
        this.retrievePreauthListService = retrievePreauthListService;
    }
    async getcheckclaimstatus(queryRetrievePreauthListBodyDto) {
        const result = await this.retrievePreauthListService.getretrievepreauthlist(queryRetrievePreauthListBodyDto);
        return result;
    }
};
exports.RetrievePreauthListController = RetrievePreauthListController;
__decorate([
    (0, common_1.Post)('/getretrievepreauthlist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_retrieve_preauth_list_dto_1.QueryRetrievePreauthListBodyDto]),
    __metadata("design:returntype", Promise)
], RetrievePreauthListController.prototype, "getcheckclaimstatus", null);
exports.RetrievePreauthListController = RetrievePreauthListController = __decorate([
    (0, common_1.Controller)('/v1/retrieve-preauth-list'),
    __metadata("design:paramtypes", [retrieve_preauth_list_service_1.RetrievePreauthListService])
], RetrievePreauthListController);
//# sourceMappingURL=retrieve-preauth-list.controller.js.map