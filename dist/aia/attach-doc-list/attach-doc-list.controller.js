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
exports.AttachDocListController = void 0;
const common_1 = require("@nestjs/common");
const attach_doc_list_service_1 = require("./attach-doc-list.service");
const query_attach_doc_list_dto_1 = require("./dto/query-attach-doc-list.dto");
let AttachDocListController = class AttachDocListController {
    constructor(attachDocListService) {
        this.attachDocListService = attachDocListService;
    }
    async getbillingsubmission(queryAttachBodyDto) {
        const result = this.attachDocListService.AttachDocList(queryAttachBodyDto);
        return result;
    }
};
exports.AttachDocListController = AttachDocListController;
__decorate([
    (0, common_1.Post)('/attachDocList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_attach_doc_list_dto_1.QueryAttachBodyDto]),
    __metadata("design:returntype", Promise)
], AttachDocListController.prototype, "getbillingsubmission", null);
exports.AttachDocListController = AttachDocListController = __decorate([
    (0, common_1.Controller)('/v1/attach-doc-list'),
    __metadata("design:paramtypes", [attach_doc_list_service_1.AttachDocListService])
], AttachDocListController);
//# sourceMappingURL=attach-doc-list.controller.js.map