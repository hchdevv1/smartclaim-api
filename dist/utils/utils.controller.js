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
exports.UtilsController = void 0;
const common_1 = require("@nestjs/common");
const utils_service_1 = require("./utils.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const claim_documents_dto_1 = require("./dto/claim-documents.dto");
let UtilsController = class UtilsController {
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    EncryptAESECB(Secretkey, text) {
        return this.utilsService.EncryptAESECB(text, Secretkey);
    }
    DecryptAESECB(Secretkey, text) {
        return this.utilsService.DecryptAESECB(text, Secretkey);
    }
    requestAccessToken() {
        return this.utilsService.requestAccessToken_AIA();
    }
    getIllnessType(Insurercode) {
        return this.utilsService.IllnessType(Insurercode);
    }
    getIllnessSurgery(Insurercode) {
        return this.utilsService.IllnessSurgery(Insurercode);
    }
    getpolicyType(InsuranceCode) {
        return this.utilsService.policyType(InsuranceCode);
    }
    getServiceSetting(InsuranceCode) {
        return this.utilsService.getServiceSetting(InsuranceCode);
    }
    getServiceSettingIllnesstype(InsuranceCode) {
        return this.utilsService.getServiceSettingIllnesstype(InsuranceCode);
    }
    getClaimStatus(InsuranceCode) {
        return this.utilsService.getClaimStatus(InsuranceCode);
    }
    getIdType(InsuranceCode) {
        return this.utilsService.getIdType(InsuranceCode);
    }
    getClaimStatusCodeByDescription(InsuranceCode, claimstatusdesc) {
        return this.utilsService.getClaimStatusCodeByDescription(InsuranceCode, claimstatusdesc);
    }
    getDocumentType(InsuranceCode) {
        return this.utilsService.getDocumentType(InsuranceCode);
    }
    getdocumentTypeforAttachDocList(InsuranceCode) {
        return this.utilsService.getdocumentTypeforAttachDocList(InsuranceCode);
    }
    getAnesthesiaList(InsuranceCode) {
        return this.utilsService.getAnesthesiaList(InsuranceCode);
    }
    getOpeartionisPackage(InsuranceCode) {
        return this.utilsService.getOpeartionisPackage(InsuranceCode);
    }
    getIndicationsForAdmission(InsuranceCode) {
        return this.utilsService.getIndicationsForAdmission(InsuranceCode);
    }
    getListPackageBundle() {
        return this.utilsService.getListPackageBundle();
    }
    gePackageBundle(PackageCode) {
        return this.utilsService.getPackageBundle(PackageCode);
    }
    getCauseofInjurywoundtype(InsuranceCode) {
        return this.utilsService.getCauseofInjurywoundtype(InsuranceCode);
    }
    getCauseofInjurySide(InsuranceCode) {
        return this.utilsService.getCauseofInjurySide(InsuranceCode);
    }
    getAccidentPlace(InsuranceCode) {
        return this.utilsService.getAccidentPlace(InsuranceCode);
    }
    getAccidentCauseOver45Day(InsuranceCode) {
        return this.utilsService.getAccidentCauseOver45Day(InsuranceCode);
    }
    getDiagnosisTypeMapping(InsuranceCode, DxtypecodeTrakcare) {
        return this.utilsService.getDiagnosisTypeMapping(InsuranceCode, DxtypecodeTrakcare);
    }
    async getFile(id) {
        const fileData = await this.utilsService.getFileAsBase64(+id);
        return fileData;
    }
    async getFilemany(id) {
        const fileData = await this.utilsService.getFilesAsBase64findMany(id);
        return fileData;
    }
    async uploadFile(file, body) {
        const result = await this.utilsService.saveFile(file, body);
        return {
            message: 'File uploaded successfully!',
            filename: result.documentname,
        };
    }
    async uploadBase64File(base64, fileName) {
        const savedFilePath = await this.utilsService.saveBase64File(base64, fileName);
        return {
            message: 'File saved successfully',
            path: savedFilePath,
        };
    }
    async getlistDocumentName(querylistDocumentNameDtoBodyDto) {
        const result = await this.utilsService.getlistDocumentName(querylistDocumentNameDtoBodyDto);
        return result;
    }
    async getDocumentByDocname(queryCreateClaimDocumentDtoBodyDto) {
        const fileData = await this.utilsService.getDocumentByDocname(queryCreateClaimDocumentDtoBodyDto);
        return fileData;
    }
    async getListDocumentByRefId(queryCreateClaimDocumentDtoBodyDto) {
        const fileData = await this.utilsService.getListDocumentByRefId(queryCreateClaimDocumentDtoBodyDto);
        return fileData;
    }
    async DeleteDocumentByDocName(queryDeleteDocumentByDocNameDto) {
        const fileData = await this.utilsService.DeleteDocumentByDocName(queryDeleteDocumentByDocNameDto);
        return fileData;
    }
    async isClaimExcludedByDocName(queryDeleteDocumentByDocNameDto) {
        const fileData = await this.utilsService.isClaimExcludedByDocName(queryDeleteDocumentByDocNameDto);
        return fileData;
    }
    async getlistDocumentClaim(querylistDocumentNameDtoBodyDto) {
        const result = await this.utilsService.getlistDocumentClaim(querylistDocumentNameDtoBodyDto);
        return result;
    }
    async UpdateDocumentTypeCode(querylistDocumentNameDtoBodyDto) {
        const fileData = await this.utilsService.UpdateDocumentTypeCode(querylistDocumentNameDtoBodyDto);
        return fileData;
    }
};
exports.UtilsController = UtilsController;
__decorate([
    (0, common_1.Get)('/EncryptAESECB/:Secretkey/:text'),
    __param(0, (0, common_1.Param)('Secretkey')),
    __param(1, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "EncryptAESECB", null);
__decorate([
    (0, common_1.Get)('/DecryptAESECB/:Secretkey/:text'),
    __param(0, (0, common_1.Param)('Secretkey')),
    __param(1, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "DecryptAESECB", null);
__decorate([
    (0, common_1.Get)('/accessToken-aia'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "requestAccessToken", null);
__decorate([
    (0, common_1.Get)('illnessType/:Insurercode'),
    __param(0, (0, common_1.Param)('Insurercode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getIllnessType", null);
__decorate([
    (0, common_1.Get)('/illnessSurgery/:Insurercode'),
    __param(0, (0, common_1.Param)('Insurercode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getIllnessSurgery", null);
__decorate([
    (0, common_1.Get)('/policyType/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getpolicyType", null);
__decorate([
    (0, common_1.Get)('/serviceSetting/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getServiceSetting", null);
__decorate([
    (0, common_1.Get)('/servicesettingillnesstype/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getServiceSettingIllnesstype", null);
__decorate([
    (0, common_1.Get)('/claimStatus/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getClaimStatus", null);
__decorate([
    (0, common_1.Get)('/idtype/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getIdType", null);
__decorate([
    (0, common_1.Get)('/getClaimStatusCodeByDescription/:InsuranceCode/:claimstatusdesc'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __param(1, (0, common_1.Param)('claimstatusdesc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getClaimStatusCodeByDescription", null);
__decorate([
    (0, common_1.Get)('/documentType/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getDocumentType", null);
__decorate([
    (0, common_1.Get)('/documentTypeforAttachDocList/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getdocumentTypeforAttachDocList", null);
__decorate([
    (0, common_1.Get)('/getAnesthesiaList/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getAnesthesiaList", null);
__decorate([
    (0, common_1.Get)('/getOpeartionisPackage/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getOpeartionisPackage", null);
__decorate([
    (0, common_1.Get)('/getIndicationsForAdmission/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getIndicationsForAdmission", null);
__decorate([
    (0, common_1.Get)('/ListPackageBundle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getListPackageBundle", null);
__decorate([
    (0, common_1.Get)('/PackageBundle/:PackageCode'),
    __param(0, (0, common_1.Param)('PackageCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "gePackageBundle", null);
__decorate([
    (0, common_1.Get)('/injuryWoundtype/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getCauseofInjurywoundtype", null);
__decorate([
    (0, common_1.Get)('/injurySide/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getCauseofInjurySide", null);
__decorate([
    (0, common_1.Get)('/accidentPlace/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getAccidentPlace", null);
__decorate([
    (0, common_1.Get)('/accidentCauseOver45Day/:InsuranceCode'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getAccidentCauseOver45Day", null);
__decorate([
    (0, common_1.Get)('/dxtypecodeTrakcareMapping/:InsuranceCode/:DxtypecodeTrakcare'),
    __param(0, (0, common_1.Param)('InsuranceCode')),
    __param(1, (0, common_1.Param)('DxtypecodeTrakcare')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "getDiagnosisTypeMapping", null);
__decorate([
    (0, common_1.Get)('/getfile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/getFilemany/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getFilemany", null);
__decorate([
    (0, common_1.Post)('/uploadDocuments'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/pdf',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                const newFilename = `${uniqueSuffix}${ext}`;
                cb(null, newFilename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, claim_documents_dto_1.QueryCreateClaimDocumentDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload-base64'),
    __param(0, (0, common_1.Body)('base64')),
    __param(1, (0, common_1.Body)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "uploadBase64File", null);
__decorate([
    (0, common_1.Post)('/getlistDocumentName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QuerylistDocumentNameDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getlistDocumentName", null);
__decorate([
    (0, common_1.Post)('/getDocumentByDocname'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QueryCreateClaimDocumentDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getDocumentByDocname", null);
__decorate([
    (0, common_1.Post)('/getListDocumentByRefId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QueryCreateClaimDocumentDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getListDocumentByRefId", null);
__decorate([
    (0, common_1.Post)('/DeleteDocumentByDocName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QueryDeleteDocumentByDocNameDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "DeleteDocumentByDocName", null);
__decorate([
    (0, common_1.Post)('/isClaimExcludedByDocName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QueryDeleteDocumentByDocNameDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "isClaimExcludedByDocName", null);
__decorate([
    (0, common_1.Post)('/getlistDocumentClaim'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QuerylistDocumentNameDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getlistDocumentClaim", null);
__decorate([
    (0, common_1.Post)('/UpdateDocumentTypeCode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [claim_documents_dto_1.QuerylistDocumentNameDtoBodyDto]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "UpdateDocumentTypeCode", null);
exports.UtilsController = UtilsController = __decorate([
    (0, common_1.Controller)('/v1/utils'),
    __metadata("design:paramtypes", [utils_service_1.UtilsService])
], UtilsController);
//# sourceMappingURL=utils.controller.js.map