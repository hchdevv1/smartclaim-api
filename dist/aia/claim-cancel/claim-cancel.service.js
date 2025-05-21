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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimCancelService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const utils_service_1 = require("../../utils/utils.service");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const result_claim_cancel_dto_1 = require("./dto/result-claim-cancel.dto");
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let ClaimCancelService = class ClaimCancelService {
    constructor(httpService, utilsService) {
        this.httpService = httpService;
        this.utilsService = utilsService;
    }
    async ClaimCancel(queryClaimCancelBodyDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryClaimCancelBodyDto.PatientInfo.RefId,
                xTransactionNo: queryClaimCancelBodyDto.PatientInfo.TransactionNo,
                xPID: queryClaimCancelBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryClaimCancelBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryClaimCancelBodyDto.PatientInfo.IdType || '',
                xInsurerCode: queryClaimCancelBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryClaimCancelBodyDto.PatientInfo.HN || '',
                xVN: queryClaimCancelBodyDto.PatientInfo.VN || '',
            };
            const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
            const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
            const apiURL = `${AIA_APIURL}/SmartClaim/claimCancel`;
            const xUsername = AIA_APIHopitalUsername;
            const xHospitalCode = await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey);
            const xInsurerCode = RequesetBody.xInsurerCode;
            const xElectronicSignature = '';
            const xDataJsonType = 3;
            const body_DataJson = {};
            const body = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                Username: xUsername,
                HospitalCode: xHospitalCode,
                InsurerCode: xInsurerCode,
                ElectronicSignature: xElectronicSignature,
                DataJsonType: xDataJsonType,
                DataJson: body_DataJson
            };
            const headers = {
                'Content-Type': API_CONTENTTYPE,
                'Ocp-Apim-Subscription-Key': AIA_APISubscription,
                'Apim-Auth-Secure-Token': ObjAccessTokenKey
            };
            const responsefromAIA = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(apiURL, body, { headers })
                .pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
                console.error('Error from AIA API:', error.response?.data || error.message);
                throw new Error('Failed to call AIA API');
            })));
            const responeInputcode = responsefromAIA.Result.Code;
            if (responeInputcode !== 'S') {
                const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                if (existingRecord) {
                    await database_1.prismaProgest.transactionclaim.update({
                        where: {
                            id: existingRecord.id,
                        },
                        data: {
                            claimstatuscode: '11',
                            claimstatusdesc: 'Cancelled to AIA',
                            claimstatusdesc_th: 'ยกเลิกส่งเคลม',
                            claimstatusdesc_en: 'Cancelled to AIA'
                        }
                    });
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Cancelled to AIA', 'Cancelled to AIA');
                }
                else {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, responsefromAIA.Result.MessageTh, responsefromAIA.Result.MessageTh);
                }
            }
            else {
                let xInsuranceResult = new result_claim_cancel_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                let xInsuranceData = new result_claim_cancel_dto_1.InsuranceData();
                xInsuranceData = {
                    RefId: responsefromAIA.Data.RefId,
                    TransactionNo: responsefromAIA.Data.TransactionNo,
                    InsurerCode: responsefromAIA.Data.InsurerCode,
                    Status: responsefromAIA.Data.Status || '',
                };
                xResultInfo = {
                    InsuranceResult: xInsuranceResult,
                    InsuranceData: xInsuranceData,
                };
                const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                if (existingRecord) {
                    await database_1.prismaProgest.transactionclaim.update({
                        where: {
                            id: existingRecord.id,
                        },
                        data: {
                            claimstatuscode: '06',
                            claimstatusdesc: 'Cancelled',
                            claimstatusdesc_th: 'ยกเลิกรายการ',
                            claimstatusdesc_en: 'Cancelled'
                        }
                    });
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultClaimCancelDto = new result_claim_cancel_dto_1.ResultClaimCancelDto();
            newResultClaimCancelDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultClaimCancelDto;
        }
        catch (error) {
            if (error instanceof generate_client_db_1.Prisma.PrismaClientInitializationError) {
                throw new common_1.HttpException({
                    HTTPStatus: {
                        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR)),
                        error: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR)),
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if (error instanceof generate_client_db_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.HttpException({
                    HTTPStatus: {
                        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR), error.code),
                        error: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR), error.code),
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else {
                if (error.message.includes('Connection') || error.message.includes('ECONNREFUSED')) {
                    throw new common_1.HttpException({
                        HTTPStatus: {
                            statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                            message: 'Cannot connect to the database server. Please ensure it is running.',
                            error: 'Cannot connect to the database server. Please ensure it is running.',
                        },
                    }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
                }
                else if (error.message.includes('Conversion') || error.message.includes('Invalid input syntax')) {
                    throw new common_1.HttpException({
                        HTTPStatus: {
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            message: 'Invalid data format or conversion error.',
                            error: 'Invalid data format or conversion error.',
                        },
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                else if (error.message.includes('Permission') || error.message.includes('Access denied')) {
                    throw new common_1.HttpException({
                        HTTPStatus: {
                            statusCode: common_1.HttpStatus.FORBIDDEN,
                            message: 'You do not have permission to perform this action.',
                            error: 'You do not have permission to perform this action.',
                        },
                    }, common_1.HttpStatus.FORBIDDEN);
                }
                else if (error.message.includes('Unable to fit integer value')) {
                    throw new common_1.HttpException({
                        HTTPStatus: {
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            message: 'The integer value is too large for the database field.',
                            error: 'The integer value is too large for the database field.',
                        },
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    throw new common_1.HttpException({
                        HTTPStatus: {
                            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                            message: 'An unexpected error occurred.',
                            error: 'An unexpected error occurred.',
                        },
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
    }
    addFormatHTTPStatus(data, inputstatusCode, inputmessage, inputerror) {
        if (inputstatusCode !== 200) {
            if (data) {
                data.statusCode = inputstatusCode;
                data.message = inputmessage || '';
                data.error = inputerror || '';
            }
        }
        else {
            if (data) {
                data.statusCode = 200;
                data.message = 'success';
                data.error = '';
            }
        }
    }
};
exports.ClaimCancelService = ClaimCancelService;
exports.ClaimCancelService = ClaimCancelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        utils_service_1.UtilsService])
], ClaimCancelService);
//# sourceMappingURL=claim-cancel.service.js.map