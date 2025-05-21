"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpdDischargeModule = void 0;
const common_1 = require("@nestjs/common");
const ipd_discharge_service_1 = require("./ipd-discharge.service");
const ipd_discharge_controller_1 = require("./ipd-discharge.controller");
const axios_1 = require("@nestjs/axios");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
let IpdDischargeModule = class IpdDischargeModule {
};
exports.IpdDischargeModule = IpdDischargeModule;
exports.IpdDischargeModule = IpdDischargeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [ipd_discharge_controller_1.IpdDischargeController],
        providers: [ipd_discharge_service_1.IpdDischargeService, utils_service_1.UtilsService, trakcare_service_1.TrakcareService],
    })
], IpdDischargeModule);
//# sourceMappingURL=ipd-discharge.module.js.map