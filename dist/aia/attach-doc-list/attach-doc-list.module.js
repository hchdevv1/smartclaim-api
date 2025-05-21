"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachDocListModule = void 0;
const common_1 = require("@nestjs/common");
const attach_doc_list_service_1 = require("./attach-doc-list.service");
const attach_doc_list_controller_1 = require("./attach-doc-list.controller");
const axios_1 = require("@nestjs/axios");
const utils_service_1 = require("../../utils/utils.service");
let AttachDocListModule = class AttachDocListModule {
};
exports.AttachDocListModule = AttachDocListModule;
exports.AttachDocListModule = AttachDocListModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [attach_doc_list_controller_1.AttachDocListController],
        providers: [attach_doc_list_service_1.AttachDocListService, utils_service_1.UtilsService],
    })
], AttachDocListModule);
//# sourceMappingURL=attach-doc-list.module.js.map