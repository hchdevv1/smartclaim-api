"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckEligibleModule = void 0;
const common_1 = require("@nestjs/common");
const check_eligible_service_1 = require("./check-eligible.service");
const check_eligible_controller_1 = require("./check-eligible.controller");
const axios_1 = require("@nestjs/axios");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
let CheckEligibleModule = class CheckEligibleModule {
};
exports.CheckEligibleModule = CheckEligibleModule;
exports.CheckEligibleModule = CheckEligibleModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [check_eligible_controller_1.CheckEligibleController],
        providers: [check_eligible_service_1.CheckEligibleService, utils_service_1.UtilsService, trakcare_service_1.TrakcareService],
    })
], CheckEligibleModule);
//# sourceMappingURL=check-eligible.module.js.map