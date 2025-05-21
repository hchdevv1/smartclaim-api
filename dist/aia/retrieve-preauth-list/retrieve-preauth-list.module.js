"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrievePreauthListModule = void 0;
const common_1 = require("@nestjs/common");
const retrieve_preauth_list_service_1 = require("./retrieve-preauth-list.service");
const retrieve_preauth_list_controller_1 = require("./retrieve-preauth-list.controller");
const axios_1 = require("@nestjs/axios");
const utils_service_1 = require("../../utils/utils.service");
let RetrievePreauthListModule = class RetrievePreauthListModule {
};
exports.RetrievePreauthListModule = RetrievePreauthListModule;
exports.RetrievePreauthListModule = RetrievePreauthListModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [retrieve_preauth_list_controller_1.RetrievePreauthListController],
        providers: [retrieve_preauth_list_service_1.RetrievePreauthListService, utils_service_1.UtilsService],
    })
], RetrievePreauthListModule);
//# sourceMappingURL=retrieve-preauth-list.module.js.map