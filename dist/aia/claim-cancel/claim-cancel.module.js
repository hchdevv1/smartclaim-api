"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimCancelModule = void 0;
const common_1 = require("@nestjs/common");
const claim_cancel_service_1 = require("./claim-cancel.service");
const claim_cancel_controller_1 = require("./claim-cancel.controller");
const axios_1 = require("@nestjs/axios");
const utils_service_1 = require("../../utils/utils.service");
let ClaimCancelModule = class ClaimCancelModule {
};
exports.ClaimCancelModule = ClaimCancelModule;
exports.ClaimCancelModule = ClaimCancelModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [claim_cancel_controller_1.ClaimCancelController],
        providers: [claim_cancel_service_1.ClaimCancelService, utils_service_1.UtilsService],
    })
], ClaimCancelModule);
//# sourceMappingURL=claim-cancel.module.js.map