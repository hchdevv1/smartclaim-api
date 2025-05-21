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
exports.PatientinfoController = void 0;
const common_1 = require("@nestjs/common");
const patientinfo_service_1 = require("./patientinfo.service");
const create_patientinfo_dto_1 = require("./dto/create-patientinfo.dto");
const find_patientinfo_dto_1 = require("./dto/find-patientinfo.dto");
const findforupdate_patientinfo_dto_1 = require("./dto/findforupdate-patientinfo.dto");
const search_patientinfo_dto_1 = require("./dto/search-patientinfo.dto");
const update_patientinfo_dto_1 = require("./dto/update-patientinfo.dto");
const search__transection_dto_1 = require("./dto/search -transection.dto");
let PatientinfoController = class PatientinfoController {
    constructor(patientinfoService) {
        this.patientinfoService = patientinfoService;
    }
    async FindPatient(findBodyDto) {
        const result = await this.patientinfoService.FindPatientTrakcare(findBodyDto);
        return result;
    }
    async create(createBodyDto) {
        const result = this.patientinfoService.create(createBodyDto);
        return result;
    }
    async PatientSearch(searchBodyDto) {
        const result = this.patientinfoService.PatientSearch(searchBodyDto);
        return result;
    }
    async PatientFindforUpdate(findforUpdateBodyDto) {
        const result = this.patientinfoService.FindforUpdate(findforUpdateBodyDto);
        return result;
    }
    async updatePatientInfo(updateBodyDto) {
        const result = await this.patientinfoService.updatePatientInfoByHN(updateBodyDto);
        return result;
    }
    async SearchTransection(querySearchTransection) {
        const result = this.patientinfoService.SearchTransection(querySearchTransection);
        return result;
    }
};
exports.PatientinfoController = PatientinfoController;
__decorate([
    (0, common_1.Post)('/FindPatientTrakcare'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_patientinfo_dto_1.FindBodyDto]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "FindPatient", null);
__decorate([
    (0, common_1.Post)('/CreatePatient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patientinfo_dto_1.CreateBodyDto]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/PatientSearch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_patientinfo_dto_1.SearchBodyDto]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "PatientSearch", null);
__decorate([
    (0, common_1.Post)('/PatientFindforUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findforupdate_patientinfo_dto_1.FindforUpdateBodyDto]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "PatientFindforUpdate", null);
__decorate([
    (0, common_1.Patch)('/PatientUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_patientinfo_dto_1.UpdateBodyDto]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "updatePatientInfo", null);
__decorate([
    (0, common_1.Post)('/SearchTransection'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search__transection_dto_1.QuerySearchTransection]),
    __metadata("design:returntype", Promise)
], PatientinfoController.prototype, "SearchTransection", null);
exports.PatientinfoController = PatientinfoController = __decorate([
    (0, common_1.Controller)('/v1/patientinfo'),
    __metadata("design:paramtypes", [patientinfo_service_1.PatientinfoService])
], PatientinfoController);
//# sourceMappingURL=patientinfo.controller.js.map