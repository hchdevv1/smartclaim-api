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
exports.CheckClaimStatusService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const utils_service_1 = require("../../utils/utils.service");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const result_check_claim_status_dto_1 = require("./dto/result-check-claim-status.dto");
const result_check_claim_status_listall_dto_1 = require("./dto/result-check-claim-status-listall.dto");
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let CheckClaimStatusService = class CheckClaimStatusService {
    constructor(httpService, utilsService) {
        this.httpService = httpService;
        this.utilsService = utilsService;
    }
    async Checkclaimstatus(queryCheckClaimStatusBodyDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryCheckClaimStatusBodyDto.PatientInfo.RefId,
                xTransactionNo: queryCheckClaimStatusBodyDto.PatientInfo.TransactionNo,
                xPID: queryCheckClaimStatusBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryCheckClaimStatusBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryCheckClaimStatusBodyDto.PatientInfo.IdType || '',
                xInsurerCode: queryCheckClaimStatusBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryCheckClaimStatusBodyDto.PatientInfo.HN,
                xVN: queryCheckClaimStatusBodyDto.PatientInfo.VN,
            };
            const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
            const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
            const apiURL = `${AIA_APIURL}/SmartClaim/checkClaimStatus`;
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
                this.addFormatHTTPStatus(newHttpMessageDto, 400, responsefromAIA.Result.MessageTh, responsefromAIA.Result.MessageTh);
            }
            else {
                let xInsuranceResult = new result_check_claim_status_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                let xResultAttachDocListInfoDto = [];
                if (responsefromAIA.Data.AttachDocList.length > 0) {
                    console.log('----!!!1');
                    xResultAttachDocListInfoDto = await Promise.all(responsefromAIA.Data.AttachDocList.map(async (doc) => {
                        try {
                            const DecryptDocument = await this.utilsService.DecryptAESECB(doc.Base64Data, AIA_APISecretkey);
                            await this.utilsService.saveBase64File(DecryptDocument, doc.DocName);
                            const existingOriginalname = await database_1.prismaProgest.claimdocuments.findMany({
                                where: {
                                    originalname: doc.DocName
                                }
                            });
                            if (!existingOriginalname || (Array.isArray(existingOriginalname) && existingOriginalname.length === 0)) {
                                await database_1.prismaProgest.claimdocuments.create({
                                    data: {
                                        hn: queryCheckClaimStatusBodyDto.PatientInfo.HN,
                                        vn: queryCheckClaimStatusBodyDto.PatientInfo.VN,
                                        refid: RequesetBody.xRefId,
                                        insurerid: 13,
                                        transactionno: RequesetBody.xTransactionNo,
                                        documenttypecode: '007',
                                        documenttypename: 'pdf',
                                        originalname: doc.DocName,
                                        documentname: RequesetBody.xVN + '-' + '007' + '-' + Math.round(Math.random() * 186).toString(3) + '.' + 'pdf',
                                        filesize: null,
                                        filemimetype: 'application/pdf',
                                        serverpath: 'path-to-server',
                                        filepath: `./uploads/pdf/` + doc.DocName,
                                        uploaddate: new Date(),
                                        uploadedby: null,
                                        runningdocument: Math.round(Math.random() * 186).toString(3)
                                    },
                                });
                                return {
                                    Base64Data: doc.Base64Data,
                                    DocName: doc.DocName,
                                };
                            }
                            else {
                                return {
                                    Base64Data: doc.Base64Data,
                                    DocName: doc.DocName,
                                };
                            }
                        }
                        catch (error) {
                            console.error(`Error processing document ${doc.DocName}:`, error);
                            return {
                                Base64Data: doc.Base64Data,
                                DocName: doc.DocName,
                            };
                        }
                    }));
                }
                const xClaimStatusCode = await this.utilsService.getClaimStatusCodeByDescription('13', responsefromAIA.Data.ClaimStatus);
                const claimcode = xClaimStatusCode?.Result[0]?.claimstatuscode;
                let xInsuranceData = new result_check_claim_status_dto_1.InsuranceData();
                xInsuranceData = {
                    RefId: responsefromAIA.Data.RefId,
                    TransactionNo: responsefromAIA.Data.TransactionNo,
                    InsurerCode: responsefromAIA.Data.InsurerCode,
                    BatchNumber: responsefromAIA.Data.BatchNumber || '',
                    ClaimStatus: responsefromAIA.Data.ClaimStatus || '',
                    ClaimStatusCode: claimcode || '',
                    ClaimStatusDesc: responsefromAIA.Data.ClaimStatusDesc || '',
                    ClaimStatusDesc_EN: responsefromAIA.Data.ClaimStatus || '',
                    ClaimStatusDesc_TH: responsefromAIA.Data.ClaimStatusDesc || '',
                    TotalApproveAmount: responsefromAIA.Data.TotalApproveAmount || '',
                    PaymentDate: responsefromAIA.Data.PaymentDate || '',
                    InvoiceNumber: responsefromAIA.Data.InvoiceNumber || '',
                    AttachDocList: xResultAttachDocListInfoDto
                };
                const transactionclaimexistingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                if (transactionclaimexistingRecord) {
                    const updateclaimcode = claimcode;
                    const updateclaimstatusdesc = responsefromAIA.Data.ClaimStatus;
                    const updateclaimstatusdesc_th = responsefromAIA.Data.ClaimStatusDesc;
                    const updatebatchnumber = responsefromAIA.Data.BatchNumber;
                    const updatetotalapprovedamount = responsefromAIA.Data.TotalApproveAmount;
                    const updatepaymentdate = responsefromAIA.Data.PaymentDate;
                    const QueryUpdate = {
                        ...(updateclaimcode ? { claimstatuscode: updateclaimcode } : {}),
                        ...(updateclaimstatusdesc ? { claimstatusdesc: updateclaimstatusdesc } : {}),
                        ...(updateclaimstatusdesc_th ? { claimstatusdesc_th: updateclaimstatusdesc_th } : {}),
                        ...(updateclaimstatusdesc ? { claimstatusdesc_en: updateclaimstatusdesc } : {}),
                        ...(updatebatchnumber ? { batchnumber: updatebatchnumber } : {}),
                        ...(updatetotalapprovedamount ? { totalapprovedamount: updatetotalapprovedamount } : {}),
                        ...(updatepaymentdate ? { paymentdate: updatepaymentdate } : {}),
                    };
                    if (QueryUpdate) {
                        const filteredQueryUpdate = Object.fromEntries(Object.entries(QueryUpdate).filter(([, value]) => value !== null && value !== undefined));
                        await database_1.prismaProgest.transactionclaim.update({
                            where: {
                                id: transactionclaimexistingRecord.id,
                            },
                            data: filteredQueryUpdate
                        });
                    }
                }
                const transactionclaimstatusexistingRecord = await database_1.prismaProgest.transactionclaimstatus.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                        claimstatuscode: claimcode
                    },
                });
                if (transactionclaimstatusexistingRecord) {
                    await database_1.prismaProgest.transactionclaimstatus.update({
                        where: {
                            id: transactionclaimstatusexistingRecord.id,
                        },
                        data: {
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            claimstatuscode: claimcode,
                            claimstatusdesc: responsefromAIA.Data.ClaimStatus,
                            claimstatusdesc_en: responsefromAIA.Data.ClaimStatus,
                            claimstatusdesc_th: responsefromAIA.Data.ClaimStatusDesc,
                            paymentdate: responsefromAIA.Data.PaymentDate,
                        },
                    });
                }
                else {
                    console.log('----!!!7');
                    await database_1.prismaProgest.transactionclaimstatus.create({
                        data: {
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefId,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            claimstatuscode: claimcode,
                            totalapproveamount: responsefromAIA.Data.TotalApproveAmount + '',
                            paymentdate: responsefromAIA.Data.PaymentDate,
                            invoicenumber: responsefromAIA.Data.InvoiceNumber,
                            claimstatusdesc: responsefromAIA.Data.ClaimStatus,
                            claimstatusdesc_en: responsefromAIA.Data.ClaimStatus,
                            claimstatusdesc_th: responsefromAIA.Data.ClaimStatusDesc,
                        },
                    });
                }
                xResultInfo = {
                    InsuranceResult: xInsuranceResult,
                    InsuranceData: xInsuranceData,
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultCheckClaimStatusDto = new result_check_claim_status_dto_1.ResultCheckClaimStatusDto();
            newResultCheckClaimStatusDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultCheckClaimStatusDto;
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
    async getcheckclaimstatusListAll(queryCheckClaimStatusListAllBodyDto) {
        let xResultInfo, RequesetBody;
        const apiResponses = [];
        let responsefromAIA;
        const insuranceDataArray = [];
        try {
            if (queryCheckClaimStatusListAllBodyDto.PatientInfo && queryCheckClaimStatusListAllBodyDto.PatientInfo.length > 0) {
                for (const patient of queryCheckClaimStatusListAllBodyDto.PatientInfo) {
                    RequesetBody = {
                        xRefId: patient.RefId,
                        xTransactionNo: patient.TransactionNo,
                        xInsurerCode: 13,
                    };
                    const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
                    const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
                    const apiURL = `${AIA_APIURL}/SmartClaim/checkClaimStatus`;
                    const xUsername = AIA_APIHopitalUsername;
                    const xHospitalCode = await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey);
                    const xElectronicSignature = '';
                    const xDataJsonType = 3;
                    const body_DataJson = {};
                    const body = {
                        RefId: RequesetBody.xRefId,
                        TransactionNo: RequesetBody.xTransactionNo,
                        Username: xUsername,
                        HospitalCode: xHospitalCode,
                        InsurerCode: RequesetBody.xInsurerCode,
                        ElectronicSignature: xElectronicSignature,
                        DataJsonType: xDataJsonType,
                        DataJson: body_DataJson,
                    };
                    const headers = {
                        'Content-Type': API_CONTENTTYPE,
                        'Ocp-Apim-Subscription-Key': AIA_APISubscription,
                        'Apim-Auth-Secure-Token': ObjAccessTokenKey,
                    };
                    responsefromAIA = await (0, rxjs_1.lastValueFrom)(this.httpService
                        .post(apiURL, body, { headers })
                        .pipe((0, operators_1.map)((response) => response.data), (0, operators_1.catchError)((error) => {
                        console.error('Error from AIA API:', error.response?.data || error.message);
                        return (0, rxjs_1.of)(newHttpMessageDto);
                    })));
                    apiResponses.push(responsefromAIA);
                    const responeInputcode = responsefromAIA.Result.Code;
                    if (responeInputcode == 'S') {
                        const xClaimStatusCode = await this.utilsService.getClaimStatusCodeByDescription('13', responsefromAIA.Data.ClaimStatus);
                        const claimcode = xClaimStatusCode.Result[0].claimstatuscode;
                        const newInsuranceDataListAll = {
                            RefId: RequesetBody.xRefId,
                            TransactionNo: RequesetBody.xTransactionNo,
                            Result: {
                                Code: responsefromAIA.Result.Code,
                                Message: responsefromAIA.Result.Message,
                                MessageTh: responsefromAIA.Result.MessageTh,
                            },
                            StatusInfo: {
                                InsurerCode: '13',
                                BatchNumber: responsefromAIA?.Data?.BatchNumber,
                                ClaimStatus: responsefromAIA?.Data?.ClaimStatus,
                                ClaimStatusDesc: responsefromAIA?.Data?.ClaimStatusDesc,
                                ClaimStatusCode: claimcode,
                                ClaimStatusDesc_EN: responsefromAIA.Data.ClaimStatus || '',
                                ClaimStatusDesc_TH: responsefromAIA.Data.ClaimStatusDesc || '',
                                TotalApproveAmount: responsefromAIA?.Data?.TotalApproveAmount,
                                PaymentDate: responsefromAIA?.Data?.PaymentDate,
                                InvoiceNumber: responsefromAIA?.Data?.InvoiceNumber,
                                AttachDocList: responsefromAIA?.Data?.AttachDocList,
                            }
                        };
                        insuranceDataArray.push(newInsuranceDataListAll);
                        const transactionclaimexistingRecord = await database_1.prismaProgest.transactionclaim.findMany({
                            where: {
                                refid: RequesetBody.xRefId,
                                transactionno: RequesetBody.xTransactionNo,
                            },
                        });
                        if (transactionclaimexistingRecord.length > 0) {
                            transactionclaimexistingRecord.forEach(async (existingRecord) => {
                                const QueryUpdate = {
                                    ...(claimcode ? { claimstatuscode: claimcode } : {}),
                                    ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc: responsefromAIA.Data.ClaimStatus } : {}),
                                    ...(responsefromAIA.Data.ClaimStatus ? { claimstatusdesc_en: responsefromAIA.Data.ClaimStatus } : {}),
                                    ...(responsefromAIA.Data.ClaimStatusDesc ? { claimstatusdesc_th: responsefromAIA.Data.ClaimStatusDesc } : {}),
                                    ...(responsefromAIA.Data.BatchNumber ? { batchnumber: responsefromAIA.Data.BatchNumber } : {}),
                                    ...(responsefromAIA.Data.TotalApproveAmount ? { totalapprovedamount: responsefromAIA.Data.TotalApproveAmount } : {}),
                                    ...(responsefromAIA.Data.PaymentDate ? { paymentdate: responsefromAIA.Data.PaymentDate } : {}),
                                };
                                const filteredQueryUpdate = Object.fromEntries(Object.entries(QueryUpdate).filter(([, value]) => value !== null && value !== undefined));
                                if (Object.keys(filteredQueryUpdate).length > 0) {
                                    await database_1.prismaProgest.transactionclaim.update({
                                        where: {
                                            id: existingRecord.id,
                                        },
                                        data: filteredQueryUpdate,
                                    });
                                }
                            });
                            xResultInfo = {
                                InsuranceData: insuranceDataArray,
                            };
                        }
                    }
                }
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultCheckClaimStatusListAllDto = new result_check_claim_status_listall_dto_1.ResultCheckClaimStatusListAllDto();
            newResultCheckClaimStatusListAllDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultCheckClaimStatusListAllDto;
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
exports.CheckClaimStatusService = CheckClaimStatusService;
exports.CheckClaimStatusService = CheckClaimStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        utils_service_1.UtilsService])
], CheckClaimStatusService);
//# sourceMappingURL=check-claim-status.service.js.map