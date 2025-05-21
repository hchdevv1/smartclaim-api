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
exports.PreauthSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const utils_service_1 = require("../../utils/utils.service");
const check_eligible_service_1 = require("../../aia/check-eligible/check-eligible.service");
const query_diagnoisis_preauth_submission_dto_1 = require("./dto/query-diagnoisis-preauth-submission.dto");
const query_preauthnote_preauth_submission_dto_1 = require("./dto/query-preauthnote-preauth-submission.dto");
const query_prebilling_preauth_submission_dto_1 = require("./dto/query-prebilling-preauth-submission.dto");
const result_listclaim_preauth_submission_dto_1 = require("./dto/result-listclaim-preauth-submission.dto");
const query_visit_preauth_submissiondto_1 = require("./dto/query-visit-preauth-submissiondto");
const query_updatereferencevn_preauth_submission_dto_1 = require("./dto/query-updatereferencevn-preauth-submission.dto");
const result_submit_preauth_submission_dto_1 = require("./dto/result-submit-preauth-submission.dto");
const result_accident_databse_dto_1 = require("../../utils/dto/result-accident-databse.dto");
const review_preauth_submission_dto_1 = require("./dto/review-preauth-submission.dto");
const result_visit_preauth_submission_dto_1 = require("./dto/result-visit-preauth-submission.dto");
const query_accident_preauth_submission_dto_1 = require("./dto/query-accident-preauth-submission.dto");
const query_procedure_preauth_submission_dto_1 = require("./dto/query-procedure-preauth-submission.dto");
const result_packagebundle_preauth_submission_dto_1 = require("./dto/result-packagebundle-preauth-submission.dto");
const result_ListBilling_dto_1 = require("./dto/result-ListBilling.dto");
const result_authnote_preauth_submissiondto_1 = require("./dto/result-authnote-preauth-submissiondto");
const result_doctor_preauth_submission_dto_1 = require("./dto/result-doctor-preauth-submission.dto");
const result_diagnosis_preauth_submission_dto_1 = require("./dto/result-diagnosis-preauth-submission.dto");
const result_procedure_preauth_submission_dto_1 = require("./dto/result-procedure-preauth-submission.dto");
const result_accident_preauth_submission_dto_1 = require("./dto/result-accident-preauth-submission.dto");
const result_billing_preauth_submission_dto_1 = require("./dto/result-billing-preauth-submission.dto");
const result_check_eligible_preadmission_dto_1 = require("./dto/result-check-eligible-preadmission.dto");
const result_ICDDx_dto_1 = require("./dto/result-ICDDx.dto");
const result_ICD9_dto_1 = require("./dto/result-ICD9.dto");
const result_BillingSub_dto_1 = require("./dto/result-BillingSub.dto");
const query_updateisadmission_preauth_submission_dto_1 = require("./dto/query-updateisadmission-preauth-submission.dto");
const review_preauth_submission_dto_2 = require("./dto/review-preauth-submission.dto");
const result_procedure_databse_dto_1 = require("../../utils/dto/result-procedure-databse.dto");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let PreauthSubmissionService = class PreauthSubmissionService {
    constructor(httpService, trakcareService, utilsService, checkEligibleService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
        this.utilsService = utilsService;
        this.checkEligibleService = checkEligibleService;
    }
    async getListBilling(xHN) {
        let arrayItemBillingCheckBalance;
        const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
        try {
            const TrakcarepatientInfo = await this.trakcareService.getListBilling(xHN);
            if (TrakcarepatientInfo.ItemBillingCheckBalance) {
                arrayItemBillingCheckBalance = {
                    ItemBillingCheckBalance: TrakcarepatientInfo.ItemBillingCheckBalance.map((item) => ({
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        SimbBillingCode: item.SimbBillingCode,
                        PayorBillingCode: item.PayorBillingCode,
                        BillingInitial: item.BillingInitial,
                        BillingDiscount: item.BillingDiscount,
                        BillingNetAmount: item.BillingNetAmount,
                        ItemCode: item.ItemCode,
                        ItemName: item.ItemName,
                        ItemAmount: item.ItemAmount,
                        Discount: item.Discount,
                        ItemUnitPrice: item.ItemUnitPrice,
                        netamt: item.netamt,
                        SimbVersion: item.SimbVersion,
                        Terminology: item.Terminology,
                    }))
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                arrayItemBillingCheckBalance = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                        ItemCode: '',
                        ItemName: '',
                        ItemAmount: '',
                        Discount: '',
                        ItemUnitPrice: '',
                        netamt: '',
                        SimbVersion: '',
                        Terminology: '',
                    }];
                this.addFormatHTTPStatus(newHttpMessageDto, 400, '', '');
            }
            let newResultlistBillingCheckBalanceDto = new result_ListBilling_dto_1.ResultlistBillingDto();
            newResultlistBillingCheckBalanceDto = {
                HTTPStatus: newHttpMessageDto,
                Result: arrayItemBillingCheckBalance
            };
            return newResultlistBillingCheckBalanceDto;
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
    async getListVisitClaimAIA(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getListVisitClaimAIA(queryPreauthSubmissionDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryClaimFormListInfo = [{
                        VN: '',
                        VisiDate: '',
                        LocationDesc: '',
                        DoctorFirstName: '',
                        PresentIllness: '',
                        InsuranceNote: ''
                    }];
                xResultInfo = {
                    ClaimFormListInfo: [xQueryClaimFormListInfo],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryClaimFormListInfo = TrakcarepatientInfo.ClaimFormListInfo ?
                    TrakcarepatientInfo.ClaimFormListInfo.map((item) => {
                        return {
                            VN: item.VN || '',
                            VisiDate: item.VisiDate || '',
                            LocationDesc: item.LocationDesc || '',
                            DoctorFirstName: item.DoctorFirstName || '',
                            PresentIllness: item.PresentIllness || '',
                            InsuranceNote: item.InsuranceNote || '',
                            DiagnosisInfo: item.DiagnosisInfo || [],
                        };
                    }) : [];
                xResultInfo = {
                    ClaimFormListInfo: xQueryClaimFormListInfo,
                };
            }
            let newResultClaimFormListDto = new result_listclaim_preauth_submission_dto_1.ResultClaimFormListDto();
            newResultClaimFormListDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultClaimFormListDto;
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
    async UpdateReferenceVN(queryUpdateReferenceVNBodyDto) {
        let updatestatus;
        try {
            const xRefId = queryUpdateReferenceVNBodyDto.PatientInfo.RefId;
            const xTransactionNo = queryUpdateReferenceVNBodyDto.PatientInfo.TransactionNo;
            const xHN = queryUpdateReferenceVNBodyDto.PatientInfo.HN;
            const xVN = queryUpdateReferenceVNBodyDto.PatientInfo.VN;
            const xReferenceVN = queryUpdateReferenceVNBodyDto.PatientInfo.ReferenceVN;
            if ((xTransactionNo) && (xReferenceVN)) {
                const checkVisitNumberAvailable = await this.trakcareService.checkVisitNumberAvailable(xHN, xReferenceVN);
                const checkVisitNumberStatusCode = checkVisitNumberAvailable.statusCode ? checkVisitNumberAvailable.statusCode : 400;
                if (checkVisitNumberStatusCode !== 200) {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid VisitNumber', 'Invalid VisitNumber');
                }
                else {
                    const existingTransaction = await database_1.prismaProgest.transactionclaim.findFirst({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo,
                            vn: xVN,
                            hn: xHN
                        },
                    });
                    if (existingTransaction) {
                        await database_1.prismaProgest.transactionclaim.update({
                            where: {
                                id: existingTransaction.id,
                            },
                            data: {
                                referencevn: xReferenceVN
                            },
                        });
                        updatestatus = 'The record has been successfully updated.';
                        this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    }
                    else {
                        updatestatus = 'The record has not been updated.';
                        this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid FurtherClaimVN', '');
                    }
                }
            }
            else {
                updatestatus = 'The record has not been updated.';
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid FurtherClaimVN', '');
            }
            let newResultSubmitUpdateReferenceVNDto = new query_updatereferencevn_preauth_submission_dto_1.ResultSubmitUpdateReferenceVNDto();
            newResultSubmitUpdateReferenceVNDto = {
                HTTPStatus: newHttpMessageDto,
                Result: updatestatus
            };
            return newResultSubmitUpdateReferenceVNDto;
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
                        statusCode: error.code,
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
    async UpdateIsAdmission(queryUpdateIsAdmissionBodyDto) {
        let updatestatus;
        try {
            const xRefId = queryUpdateIsAdmissionBodyDto.PatientInfo.RefId;
            const xTransactionNo = queryUpdateIsAdmissionBodyDto.PatientInfo.TransactionNo;
            const xHN = queryUpdateIsAdmissionBodyDto.PatientInfo.HN;
            const xVN = queryUpdateIsAdmissionBodyDto.PatientInfo.VN;
            const xIsAdmission = queryUpdateIsAdmissionBodyDto.PatientInfo.IsAdmission;
            if ((xTransactionNo)) {
                const existingTransaction = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        vn: xVN,
                        hn: xHN
                    },
                });
                if (existingTransaction) {
                    await database_1.prismaProgest.transactionclaim.update({
                        where: {
                            id: existingTransaction.id,
                        },
                        data: {
                            isadmission: xIsAdmission
                        },
                    });
                    updatestatus = 'The record has been successfully updated.';
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                }
                else {
                    updatestatus = 'The record has not been updated.';
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid TransactionNo', '');
                }
            }
            else {
                updatestatus = 'The record has not been updated.';
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid TransactionNo', '');
            }
            let newResultSubmitUpdateIsAdmissionDto = new query_updateisadmission_preauth_submission_dto_1.ResultSubmitUpdateIsAdmissionDto();
            newResultSubmitUpdateIsAdmissionDto = {
                HTTPStatus: newHttpMessageDto,
                Result: updatestatus
            };
            return newResultSubmitUpdateIsAdmissionDto;
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
                        statusCode: error.code,
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
    async getPreAuthVisit(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const newQueryVisitDatabaseBodyDto = {
                RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
                TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                InsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                HN: queryPreauthSubmissionDto.PatientInfo.HN,
                VN: queryPreauthSubmissionDto.PatientInfo.VN,
            };
            const getvisitformDatabase = await this.utilsService.getPrevisitformDatabase(newQueryVisitDatabaseBodyDto);
            if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length > 0) {
                if (getvisitformDatabase.Result.VisitInfo.ChiefComplaint) {
                    getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0, 200);
                }
                const newResultReviewVisitInfoDto = {
                    AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote || '',
                    AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated || false,
                    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint ? getvisitformDatabase.Result.VisitInfo.ChiefComplaint.slice(0, 200) : '',
                    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore || '',
                    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText ? getvisitformDatabase.Result.VisitInfo.DxFreeText.slice(0, 200) : '',
                    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery || '',
                    Height: getvisitformDatabase.Result.VisitInfo.Height || '',
                    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam ? getvisitformDatabase.Result.VisitInfo.PhysicalExam.slice(0, 1000) : '',
                    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment ? getvisitformDatabase.Result.VisitInfo.PlanOfTreatment.slice(0, 500) : '',
                    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant || false,
                    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness ? getvisitformDatabase.Result.VisitInfo.PresentIllness.slice(0, 500) : '',
                    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate || '',
                    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail ? getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail.slice(0, 20) : '',
                    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase || false,
                    ProcedureFreeText: getvisitformDatabase.Result.VisitInfo.ProcedureFreeText ? getvisitformDatabase.Result.VisitInfo.ProcedureFreeText.slice(0, 500) : '',
                    SignSymptomsDate: getvisitformDatabase.Result.VisitInfo.SignSymptomsDate || '',
                    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition || '',
                    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                    VN: getvisitformDatabase.Result.VisitInfo.VN || '',
                    Weight: getvisitformDatabase.Result.VisitInfo.Weight || '',
                    An: getvisitformDatabase.Result.VisitInfo.VN || '',
                    PreauthReferClaimNo: getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo || '',
                    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc || '',
                    IndicationForAdmission: getvisitformDatabase.Result.VisitInfo.IndicationForAdmission || '',
                    DscDateTime: getvisitformDatabase.Result.VisitInfo.DscDateTime || '',
                    AdmitDateTime: getvisitformDatabase.Result.VisitInfo.AdmitDateTime || '',
                    IsIPDDischarge: getvisitformDatabase.Result.VisitInfo.IsIPDDischarge,
                    IsPackage: getvisitformDatabase.Result.VisitInfo.IsPackage,
                    ExpectedAdmitDate: getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate || '',
                    TotalEstimatedCost: getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost || '',
                    AnesthesiaList: getvisitformDatabase.Result.VisitInfo.AnesthesiaList
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                xResultInfo = {
                    VisitInfo: newResultReviewVisitInfoDto,
                };
            }
            else {
                const TrakcarepatientInfo = await this.trakcareService.getIPDVisit(queryPreauthSubmissionDto.PatientInfo.VN);
                const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
                if (TrakcarepatientInfoStatusCode !== 200) {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                    const xQueryVisit = {
                        FurtherClaimId: '',
                        AccidentCauseOver45Days: '',
                        AdditionalNote: '',
                        AlcoholRelated: '',
                        ChiefComplaint: '',
                        ComaScore: '',
                        DxFreeText: '',
                        ExpectedDayOfRecovery: '',
                        Height: '',
                        PhysicalExam: '',
                        PlanOfTreatment: '',
                        Pregnant: '',
                        PresentIllness: '',
                        PreviousTreatmentDate: '',
                        PreviousTreatmentDetail: '',
                        PrivateCase: '',
                        ProcedureFreeText: '',
                        SignSymptomsDate: '',
                        UnderlyingCondition: '',
                        VisitDateTime: '',
                        Vn: '',
                        Weight: '',
                        IsIPDDischarge: '',
                        ExpectedAdmitDate: '',
                        TotalEstimatedCost: '',
                        AnesthesiaList: ''
                    };
                    xResultInfo = {
                        VisitInfo: xQueryVisit,
                    };
                }
                else {
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    const xQueryVisit = TrakcarepatientInfo.VisitInfo ? {
                        AccidentDate: TrakcarepatientInfo.VisitInfo.AccidentDate || '',
                        AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
                        AdmitDateTime: TrakcarepatientInfo.VisitInfo.AdmitDateTime || '',
                        AlcoholRelated: TrakcarepatientInfo.VisitInfo.AlcoholRelated || false,
                        ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint ? TrakcarepatientInfo.VisitInfo.ChiefComplaint.slice(0, 200) : '',
                        ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
                        DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText ? TrakcarepatientInfo.VisitInfo.DxFreeText.slice(0, 200) : '',
                        ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
                        ExpectedLos: TrakcarepatientInfo.VisitInfo.ExpectedLos || '',
                        Height: TrakcarepatientInfo.VisitInfo.Height || '',
                        IndicationForAdmission: TrakcarepatientInfo.VisitInfo.IndicationForAdmission || '',
                        PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam ? TrakcarepatientInfo.VisitInfo.PhysicalExam.slice(0, 1000) : '',
                        PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment ? TrakcarepatientInfo.VisitInfo.PlanOfTreatment.slice(0, 500) : '',
                        PreauthReferClaimNo: TrakcarepatientInfo.VisitInfo.PreauthReferClaimNo || '',
                        PreauthOcc: TrakcarepatientInfo.VisitInfo.PreauthOcc || '',
                        Pregnant: TrakcarepatientInfo.VisitInfo.Pregnant || false,
                        PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness ? TrakcarepatientInfo.VisitInfo.PresentIllness.slice(0, 500) : '',
                        PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
                        PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail ? TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail.slice(0, 20) : '',
                        PrivateCase: TrakcarepatientInfo.VisitInfo.PrivateCase || false,
                        ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText ? TrakcarepatientInfo.VisitInfo.ProcedureFreeText.slice(0, 500) : '',
                        SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
                        UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
                        VisitDate: TrakcarepatientInfo.VisitInfo.VisitDate || '',
                        VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
                        DscDateTime: TrakcarepatientInfo.VisitInfo.DscDateTime || '',
                        Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
                        An: TrakcarepatientInfo.VisitInfo.An || '',
                        Weight: TrakcarepatientInfo.VisitInfo.Weight || '',
                    } : {};
                    xResultInfo = {
                        VisitInfo: xQueryVisit,
                    };
                }
            }
            let newResultIpdDischargeVisitDto = new result_visit_preauth_submission_dto_1.ResultPreAuthVisitDto();
            newResultIpdDischargeVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultIpdDischargeVisitDto;
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
    async getPreAuthDoctor(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getIPDDoctor(queryPreauthSubmissionDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryDoctor = {
                    DoctorLicense: '0000000000',
                    DoctorRole: 'OWNER',
                    DoctorFirstName: '',
                    DoctorLastName: '',
                };
                xResultInfo = {
                    DoctorInfo: [xQueryDoctor],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryDoctor = TrakcarepatientInfo.DoctorInfo ? TrakcarepatientInfo.DoctorInfo.map((item) => {
                    return {
                        DoctorLicense: item.DoctorLicense || '',
                        DoctorRole: item.DoctorRole || '',
                        DoctorFirstName: item.DoctorFirstName || '',
                        DoctorLastName: item.DoctorLastName || '',
                    };
                }) : [];
                xResultInfo = {
                    DoctorInfo: xQueryDoctor,
                };
            }
            let newResultIpdDischargeDoctorDto = new result_doctor_preauth_submission_dto_1.ResultPreAuthDoctorDto();
            newResultIpdDischargeDoctorDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultIpdDischargeDoctorDto;
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
    async getPreAuthDiagnosis(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const existingRecordtransactionclaim = await database_1.prismaProgest.transactionclaim.findFirst({
                where: {
                    refid: queryPreauthSubmissionDto.PatientInfo.RefId,
                    transactionno: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                },
            });
            let xQueryDiagnosis;
            const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(queryPreauthSubmissionDto.PatientInfo);
            console.log('----- >getDiagnosisformDatabase-----');
            console.log(getDiagnosisformDatabase.Result.DiagnosisInfo);
            if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result?.DiagnosisInfo && getDiagnosisformDatabase.Result?.DiagnosisInfo.length > 0) {
                xQueryDiagnosis = await Promise.all(getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
                    return {
                        DxCode: item.Icd10,
                        DxName: item.DxName,
                        Dxtypenametrakcare: 'OT',
                        Dxtypecodeinsurance: 'OT',
                        Dxtypenameinsurance: 'OT'
                    };
                }));
                xResultInfo = {
                    DiagnosisInfo: xQueryDiagnosis,
                };
            }
            else {
                let xRreferencevn;
                if (existingRecordtransactionclaim?.referencevn) {
                    xRreferencevn = existingRecordtransactionclaim?.referencevn;
                }
                else {
                    xRreferencevn = queryPreauthSubmissionDto.PatientInfo.VN;
                }
                const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(xRreferencevn);
                const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
                if (TrakcarepatientInfoStatusCode !== 200) {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                    const xQueryDiagnosis = [{
                            DxTypeCode: '',
                            DxCode: '',
                            DxName: '',
                            Dxtypenametrakcare: '',
                            Dxtypecodeinsurance: '',
                            Dxtypenameinsurance: ''
                        }];
                    xResultInfo = {
                        DiagnosisInfo: [xQueryDiagnosis],
                    };
                }
                else {
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    const xQueryDiagnosis = TrakcarepatientInfo.DiagnosisInfo ?
                        await Promise.all(TrakcarepatientInfo.DiagnosisInfo.map(async (item) => {
                            const convertDxtypename = await this.convertDxTypeCode('' + queryPreauthSubmissionDto.PatientInfo.InsurerCode, item.DxTypeCode);
                            const dxtypenametrakcare = convertDxtypename?.Result?.dxtypenametrakcare || '';
                            const dxtypecodeinsurance = convertDxtypename?.Result?.dxtypecodeinsurance || '';
                            const dxtypenameinsurance = convertDxtypename?.Result?.dxtypenameinsurance || '';
                            return {
                                DxTypeCode: item.DxTypeCode || '',
                                DxCode: item.DxCode || '',
                                DxName: item.DxName || '',
                                Dxtypenametrakcare: dxtypenametrakcare || '',
                                Dxtypecodeinsurance: dxtypecodeinsurance || '',
                                Dxtypenameinsurance: dxtypenameinsurance || ''
                            };
                        })) : [];
                    xResultInfo = {
                        DiagnosisInfo: xQueryDiagnosis,
                    };
                }
            }
            let newResultIpdDischargeDiagnosisDto = new result_diagnosis_preauth_submission_dto_1.ResultPreAuthDiagnosisDto();
            newResultIpdDischargeDiagnosisDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultIpdDischargeDiagnosisDto;
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
    async getPreAuthProcedure(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const whereConditions = {
                ...(queryPreauthSubmissionDto.PatientInfo.VN ? { vn: { equals: queryPreauthSubmissionDto.PatientInfo.VN } } : {}),
                ...(queryPreauthSubmissionDto.PatientInfo.RefId ? { refid: { equals: queryPreauthSubmissionDto.PatientInfo.RefId } } : {}),
                ...(queryPreauthSubmissionDto.PatientInfo.TransactionNo ? { transactionno: { equals: queryPreauthSubmissionDto.PatientInfo.TransactionNo } } : {}),
            };
            const existingProcedureRecord = await database_1.prismaProgest.proceduretransactions.findFirst({
                where: whereConditions
            });
            if (existingProcedureRecord) {
                const newQueryProcedeureDatabaseBodyDto = {
                    RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
                    TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                    InsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                    HN: queryPreauthSubmissionDto.PatientInfo.HN,
                    VN: queryPreauthSubmissionDto.PatientInfo.VN
                };
                let newResultProcedureInfoDto = [];
                const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
                if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result?.ProcedureInfo && getIPDDischargeProcedure.Result?.ProcedureInfo.length > 0) {
                    newResultProcedureInfoDto = await Promise.all(getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
                        return {
                            Icd9: item.Icd9,
                            ProcedureName: item.ProcedureName,
                            ProcedureDate: item.ProcedureDate,
                        };
                    }));
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        ProcedureInfo: newResultProcedureInfoDto,
                    };
                }
                else {
                    newResultProcedureInfoDto = [{
                            Icd9: '',
                            ProcedureName: '',
                            ProcedureDate: '',
                        }];
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        ProcedureInfo: newResultProcedureInfoDto,
                    };
                }
            }
            else {
                const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeProcedure(queryPreauthSubmissionDto.PatientInfo.VN);
                const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
                if (TrakcarepatientInfoStatusCode !== 200) {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                    const xQueryProcedure = [{
                            Icd9: '',
                            ProcedureName: '',
                            ProcedureDate: '',
                        }];
                    xResultInfo = {
                        ProcedureInfo: [xQueryProcedure],
                    };
                }
                else {
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    const xQueryProcedure = TrakcarepatientInfo.ProcedureInfo ?
                        TrakcarepatientInfo.ProcedureInfo.map((item) => {
                            return {
                                Icd9: item.Icd9 || '',
                                ProcedureName: item.ProcedureName || '',
                                ProcedureDate: item.ProcedureDate || '',
                            };
                        }) : [];
                    xResultInfo = {
                        ProcedureInfo: xQueryProcedure,
                    };
                }
            }
            let newResultPreAuthProcedurDto = new result_procedure_preauth_submission_dto_1.ResultPreAuthProcedurDto();
            newResultPreAuthProcedurDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultPreAuthProcedurDto;
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
    async getPreAuthAccident(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const newQueryAccidentDatabaseBodyDto = {
                RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
                TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                InsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                VN: queryPreauthSubmissionDto.PatientInfo.VN,
                HN: queryPreauthSubmissionDto.PatientInfo.HN,
                IllnessTypeCode: queryPreauthSubmissionDto.PatientInfo.IllnessTypeCode
            };
            const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
            if (accidentDatabase.Result.AccidentDetailInfo.AccidentPlace.length > 0) {
                const accidentDetailInfo = new review_preauth_submission_dto_1.AccidentDetailDto();
                accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
                accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
                if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
                    accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
                        const causeDetail = new result_accident_databse_dto_1.CauseOfInjuryDetail();
                        causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
                        causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
                        return causeDetail;
                    });
                }
                if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
                    accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
                        const injuryDetail = new result_accident_databse_dto_1.InjuryDetail();
                        injuryDetail.WoundType = injury.WoundType || '';
                        injuryDetail.InjurySide = injury.InjurySide || '';
                        injuryDetail.InjuryArea = injury.InjuryArea || '';
                        return injuryDetail;
                    });
                }
                const xQueryAccident = {
                    AccidentPlace: accidentDetailInfo.AccidentPlace,
                    AccidentDate: accidentDetailInfo.AccidentDate,
                    CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
                    InjuryDetail: accidentDetailInfo.InjuryDetail
                };
                xResultInfo = {
                    AccidentDetailInfo: xQueryAccident,
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'suceess', '');
            }
            else {
                let xQueryAccident;
                if (newQueryAccidentDatabaseBodyDto.IllnessTypeCode = 'ACC') {
                    const xCauseOfInjuryDetail = [{
                            CauseOfInjury: 'X599',
                            CommentOfInjury: '',
                        }];
                    const xInjuryDetail = [{
                            WoundType: '',
                            InjurySide: '',
                            InjuryArea: 'X599',
                        }];
                    xQueryAccident = {
                        AccidentPlace: '',
                        AccidentDate: '',
                        CauseOfInjuryDetail: xCauseOfInjuryDetail,
                        InjuryDetail: xInjuryDetail
                    };
                }
                else {
                    const xCauseOfInjuryDetail = [{
                            CauseOfInjury: '',
                            CommentOfInjury: '',
                        }];
                    const xInjuryDetail = [{
                            WoundType: '',
                            InjurySide: '',
                            InjuryArea: '',
                        }];
                    xQueryAccident = {
                        AccidentPlace: '',
                        AccidentDate: '',
                        CauseOfInjuryDetail: xCauseOfInjuryDetail,
                        InjuryDetail: xInjuryDetail
                    };
                }
                xResultInfo = {
                    AccidentDetailInfo: xQueryAccident,
                };
            }
            let newResultPreAuthAccidentDto = new result_accident_preauth_submission_dto_1.ResultPreAuthAccidentDto();
            newResultPreAuthAccidentDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultPreAuthAccidentDto;
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
    async setPreBilling(queryPreBillingDto) {
        try {
            const xRefId = queryPreBillingDto.PatientInfo.RefId;
            const xTransactionNo = queryPreBillingDto.PatientInfo.TransactionNo;
            let PreBillingList, xTotalBillAmount;
            const existingPrebilling = await database_1.prismaProgest.prebillingtransactions.findMany({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo
                }
            });
            if (!existingPrebilling || existingPrebilling.length === 0) {
                PreBillingList = [{
                        LocalBillingCode: '2.1.1',
                        LocalBillingName: 'ค่าห้องผู้ป่วยใน',
                        SimbBillingCode: '2.1.1',
                        PayorBillingCode: '2.1.1',
                        BillingInitial: '10000',
                        BillingDiscount: '8000',
                        BillingNetAmount: '2000',
                    }];
                xTotalBillAmount = '8000';
            }
            else {
                PreBillingList = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                    }];
                xTotalBillAmount = '';
            }
            const xResultInfo = {
                TotalBillAmount: xTotalBillAmount,
                PackageBundleList: PreBillingList,
            };
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitPreBillingDto;
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
                        statusCode: error.code,
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
    async getPreBilling(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getPreAuthBilling(queryPreauthSubmissionDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryBilling = {
                    LocalBillingCode: '',
                    LocalBillingName: '',
                    SimbBillingCode: '',
                    PayorBillingCode: '',
                    BillingInitial: '',
                    BillingDiscount: '',
                    BillingNetAmount: ''
                };
                xResultInfo = {
                    TotalBillAmount: '',
                    BillingInfo: [xQueryBilling],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryBilling = TrakcarepatientInfo.BillingInfo ?
                    TrakcarepatientInfo.BillingInfo.map((item) => {
                        return {
                            LocalBillingCode: item.LocalBillingCode || '',
                            LocalBillingName: item.LocalBillingName || '',
                            SimbBillingCode: item.SimbBillingCode || '',
                            PayorBillingCode: item.PayorBillingCode || '',
                            BillingInitial: item.BillingInitial || '',
                            BillingDiscount: item.BillingDiscount || '',
                            BillingNetAmount: item.BillingNetAmount || '',
                        };
                    }) : [];
                xResultInfo = {
                    TotalBillAmount: TrakcarepatientInfo.TotalBillAmount ? TrakcarepatientInfo.TotalBillAmount : '',
                    BillingInfo: xQueryBilling,
                };
            }
            let newResultPreAuthBillingDto = new result_billing_preauth_submission_dto_1.ResultPreAuthBillingDto();
            newResultPreAuthBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultPreAuthBillingDto;
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
    async getPackageBundle(queryPackageBundleDto) {
        let xResultInfo;
        let newQueryPackageBundleBilling = [];
        try {
            const newqueryPackageBundleDto = {
                xPackageCode: queryPackageBundleDto.PackageInfo.PackageCode,
                xPackageDesc: queryPackageBundleDto.PackageInfo.PackageDesc
            };
            const GetPackageBundle = await this.utilsService.getPackageBundle(newqueryPackageBundleDto.xPackageCode + '');
            if (GetPackageBundle.HTTPStatus.statusCode == 200) {
                if (GetPackageBundle && GetPackageBundle.Result) {
                    newQueryPackageBundleBilling = await Promise.all(GetPackageBundle.Result.packagebundleinfo.map(async (item) => {
                        return {
                            LocalBillingCode: item.localbillingcode,
                            LocalBillingName: item.localbillingname,
                            SimbBillingCode: item.simbbillingcode,
                            PayorBillingCode: item.payorbillingcode,
                            BillingInitial: item.billinginitial,
                            BillingDiscount: item.billingdiscount,
                            BillingNetAmount: item.billingnetamount,
                        };
                    }));
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        PackageCode: GetPackageBundle.Result.packagecode,
                        PackageDesc: GetPackageBundle.Result.packagedesc,
                        PackagePrice: GetPackageBundle.Result.packagebundleinfo[0].totalbillamount,
                        PackageBundleList: newQueryPackageBundleBilling,
                    };
                }
                else {
                    newQueryPackageBundleBilling = [{
                            LocalBillingCode: '',
                            LocalBillingName: '',
                            SimbBillingCode: '',
                            PayorBillingCode: '',
                            BillingInitial: '',
                            BillingDiscount: '',
                            BillingNetAmount: ''
                        }];
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        PackageCode: '',
                        PackageDesc: '',
                        PackagePrice: '',
                        PackageBundleList: newQueryPackageBundleBilling,
                    };
                }
            }
            else {
                newQueryPackageBundleBilling = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: ''
                    }];
                xResultInfo = {
                    PackageCode: '',
                    PackageDesc: '',
                    PackagePrice: '',
                    PackageBundleList: newQueryPackageBundleBilling,
                };
            }
            let newResultPackageBundleDto = new result_packagebundle_preauth_submission_dto_1.ResultPackageBundleDto();
            newResultPackageBundleDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultPackageBundleDto;
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
    async SubmitPreBilling(queryPreBillingDto) {
        try {
            const xRefId = queryPreBillingDto.PatientInfo.RefId;
            const xTransactionNo = queryPreBillingDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryPreBillingDto.PatientInfo.InsurerCode;
            const xHN = queryPreBillingDto.PatientInfo.HN;
            const xVN = queryPreBillingDto.PatientInfo.VN;
            let PreBillingList;
            if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
                PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
                    LocalBillingCode: prebilling.LocalBillingCode || '',
                    LocalBillingName: prebilling.LocalBillingName || '',
                    SimbBillingCode: prebilling.SimbBillingCode || '',
                    PayorBillingCode: prebilling.PayorBillingCode || '',
                    BillingInitial: prebilling.BillingInitial || '',
                    BillingDiscount: prebilling.BillingDiscount || '',
                    BillingNetAmount: prebilling.BillingNetAmount || '',
                    TotalBillAmount: prebilling.TotalBillAmount || '',
                }));
                const existingPrebilling = await database_1.prismaProgest.prebillingtransactions.findMany({
                    where: {
                        refid: xRefId,
                        transactionno: xTransactionNo
                    }
                });
                if (existingPrebilling.length > 0) {
                    await Promise.all(existingPrebilling.map(async (prebilling) => {
                        return await database_1.prismaProgest.prebillingtransactions.delete({
                            where: {
                                id: prebilling.id
                            }
                        });
                    }));
                }
                await Promise.all(PreBillingList.map(async (prebilling) => {
                    return await database_1.prismaProgest.prebillingtransactions.create({
                        data: {
                            insurerid: xInsurerCode,
                            refid: xRefId,
                            transactionno: xTransactionNo,
                            hn: xHN,
                            vn: xVN,
                            localbillingcode: prebilling.LocalBillingCode,
                            localbillingname: prebilling.LocalBillingName,
                            simbbillingcode: prebilling.SimbBillingCode,
                            payorbillingcode: prebilling.PayorBillingCode,
                            billingdiscount: prebilling.BillingDiscount,
                            billinginitial: prebilling.BillingInitial,
                            billingnetamount: prebilling.BillingInitial,
                            totalbillamount: prebilling.TotalBillAmount
                        }
                    });
                }));
            }
            else {
                PreBillingList = [];
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: PreBillingList
            };
            return newResultSubmitPreBillingDto;
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
                        statusCode: error.code,
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
    async InsertPreBilling(queryPreBillingDto) {
        try {
            const xRefId = queryPreBillingDto.PatientInfo.RefId;
            const xTransactionNo = queryPreBillingDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryPreBillingDto.PatientInfo.InsurerCode;
            const xHN = queryPreBillingDto.PatientInfo.HN;
            const xVN = queryPreBillingDto.PatientInfo.VN;
            let PreBillingList;
            if (Array.isArray(queryPreBillingDto.PatientInfo.PreBillingInfo)) {
                PreBillingList = queryPreBillingDto.PatientInfo.PreBillingInfo.map((prebilling) => ({
                    LocalBillingCode: prebilling.LocalBillingCode || '',
                    LocalBillingName: prebilling.LocalBillingName || '',
                    SimbBillingCode: prebilling.SimbBillingCode || '',
                    PayorBillingCode: prebilling.PayorBillingCode || '',
                    BillingInitial: prebilling.BillingInitial || '',
                    BillingDiscount: prebilling.BillingDiscount || '',
                    BillingNetAmount: prebilling.BillingNetAmount || '',
                    TotalBillAmount: prebilling.TotalBillAmount || '',
                }));
                await Promise.all(PreBillingList.map(async (prebilling) => {
                    console.log('-----^^^^^------');
                    console.log(prebilling.LocalBillingName);
                    return await database_1.prismaProgest.prebillingtransactions.create({
                        data: {
                            insurerid: xInsurerCode,
                            refid: xRefId,
                            transactionno: xTransactionNo,
                            hn: xHN,
                            vn: xVN,
                            localbillingcode: prebilling.LocalBillingCode,
                            localbillingname: prebilling.LocalBillingName,
                            simbbillingcode: prebilling.SimbBillingCode,
                            payorbillingcode: prebilling.PayorBillingCode,
                            billingdiscount: prebilling.BillingDiscount,
                            billinginitial: prebilling.BillingInitial,
                            billingnetamount: prebilling.BillingInitial,
                            totalbillamount: prebilling.TotalBillAmount
                        }
                    });
                }));
            }
            else {
                PreBillingList = [];
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: PreBillingList
            };
            return newResultSubmitPreBillingDto;
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
                        statusCode: error.code,
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
    async deletePreBillingByRefId(deletePreBillingDto) {
        try {
            const xRefId = deletePreBillingDto.PatientInfo.RefId;
            const xTransactionNo = deletePreBillingDto.PatientInfo.TransactionNo;
            let PreBillingList;
            const existingPrebilling = await database_1.prismaProgest.prebillingtransactions.findMany({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo
                }
            });
            if (existingPrebilling.length > 0) {
                await Promise.all(existingPrebilling.map(async (prebilling) => {
                    return await database_1.prismaProgest.prebillingtransactions.delete({
                        where: {
                            id: prebilling.id
                        }
                    });
                }));
                PreBillingList = [];
            }
            else {
                PreBillingList = [];
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, 'delete sucess', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: PreBillingList
            };
            return newResultSubmitPreBillingDto;
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
                        statusCode: error.code,
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
    async previewPreBilling(queryPreBillingDto) {
        try {
            console.log('--- > previewPreBilling');
            const xRefId = queryPreBillingDto.PatientInfo.RefId;
            const xTransactionNo = queryPreBillingDto.PatientInfo.TransactionNo;
            const xTotalBillAmount = '';
            let PreBillingList;
            const existingPrebilling = await database_1.prismaProgest.prebillingtransactions.findMany({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo
                }
            });
            console.log(existingPrebilling);
            console.log(existingPrebilling.length);
            if ((existingPrebilling) && (existingPrebilling.length > 0)) {
                PreBillingList = await Promise.all(existingPrebilling.map(async (item) => {
                    return {
                        BillingID: item.id,
                        LocalBillingCode: item.localbillingcode,
                        LocalBillingName: item.localbillingname,
                        SimbBillingCode: item.simbbillingcode,
                        PayorBillingCode: item.payorbillingcode,
                        BillingInitial: item.billinginitial,
                        BillingDiscount: item.billingdiscount,
                        BillingNetAmount: item.billingnetamount,
                    };
                }));
            }
            else {
                console.log('B');
                PreBillingList = [{
                        BillingID: '1',
                        LocalBillingCode: '0101012',
                        LocalBillingName: '1.1.1(12) ค่ายาผู้ป่วยใน',
                        SimbBillingCode: '1.1.1(12)',
                        PayorBillingCode: '1.1.1(12)',
                        BillingInitial: '0',
                        BillingDiscount: '0',
                        BillingNetAmount: '0',
                    }];
            }
            const xResultInfo = {
                TotalBillAmount: xTotalBillAmount,
                BillingInfo: PreBillingList,
                InvoiceNumber: ''
            };
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitPreBillingDto;
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
    async deletePreBillingById(deletePreBillingDto) {
        try {
            const xRefId = deletePreBillingDto.PatientInfo.RefId;
            const xTransactionNo = deletePreBillingDto.PatientInfo.TransactionNo;
            const xBillingID = Number(deletePreBillingDto.PatientInfo.BillingID);
            const xTotalBillAmount = '';
            let PreBillingList;
            const existingPrebilling = await database_1.prismaProgest.prebillingtransactions.findFirst({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo,
                    id: xBillingID
                }
            });
            if (existingPrebilling) {
                PreBillingList = [{
                        BillingID: existingPrebilling.id,
                        LocalBillingCode: existingPrebilling.localbillingcode,
                        LocalBillingName: existingPrebilling.localbillingname,
                        SimbBillingCode: existingPrebilling.simbbillingcode,
                        PayorBillingCode: existingPrebilling.payorbillingcode,
                        BillingInitial: existingPrebilling.billinginitial,
                        BillingDiscount: existingPrebilling.billingdiscount,
                        BillingNetAmount: existingPrebilling.billingnetamount,
                    }];
                await await database_1.prismaProgest.prebillingtransactions.delete({ where: { id: xBillingID, }, });
            }
            else {
                PreBillingList = [{
                        BillingID: '',
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                    }];
            }
            const xResultInfo = {
                TotalBillAmount: xTotalBillAmount,
                BillingInfo: PreBillingList,
                InvoiceNumber: ''
            };
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultSubmitPreBillingDto = new query_prebilling_preauth_submission_dto_1.ResultSubmitPreBillingDto();
            newResultSubmitPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitPreBillingDto;
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
    async getPreAuthNote(querySubmitPreAuthDto) {
        let xResultInfo;
        try {
            const whereConditions = {
                ...(querySubmitPreAuthDto.PatientInfo.VN ? { vn: { equals: querySubmitPreAuthDto.PatientInfo.VN } } : {}),
                ...(querySubmitPreAuthDto.PatientInfo.RefId ? { refid: { equals: querySubmitPreAuthDto.PatientInfo.RefId } } : {}),
                ...(querySubmitPreAuthDto.PatientInfo.TransactionNo ? { transactionno: { equals: querySubmitPreAuthDto.PatientInfo.TransactionNo } } : {}),
            };
            const existingpreauthNoteRecord = await database_1.prismaProgest.preauthnotetransactions.findFirst({
                where: whereConditions
            });
            let newQueryPreAuthNote = [];
            if (existingpreauthNoteRecord) {
                const newQueryConcurrentNoteDatabaseBodyDto = {
                    RefId: querySubmitPreAuthDto.PatientInfo.RefId,
                    TransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,
                    InsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode,
                    HN: querySubmitPreAuthDto.PatientInfo.HN,
                    VN: querySubmitPreAuthDto.PatientInfo.VN
                };
                const getpreauthNoteformDatabase = await this.utilsService.getPreAuthNoteformDatabase(newQueryConcurrentNoteDatabaseBodyDto);
                if (getpreauthNoteformDatabase && getpreauthNoteformDatabase.Result.PreAuthNote && getpreauthNoteformDatabase.Result.PreAuthNote.length > 0) {
                    newQueryPreAuthNote = await Promise.all(getpreauthNoteformDatabase.Result.PreAuthNote.map(async (item) => {
                        return {
                            PreAuthDateTime: item.PreAuthDateTime,
                            PreAuthDetail: item.PreAuthDetail,
                        };
                    }));
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        ConcurNoteList: newQueryPreAuthNote,
                    };
                }
                else {
                    newQueryPreAuthNote = [{
                            PreAuthDateTime: '',
                            PreAuthDetail: '',
                        }];
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    xResultInfo = {
                        ConcurNoteList: newQueryPreAuthNote,
                    };
                }
            }
            else {
                newQueryPreAuthNote = [{
                        PreAuthDateTime: '',
                        PreAuthDetail: '',
                    }];
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                xResultInfo = {
                    ConcurNoteList: newQueryPreAuthNote,
                };
            }
            let newResultAuthNoteDto = new result_authnote_preauth_submissiondto_1.ResultAuthNoteDto();
            newResultAuthNoteDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultAuthNoteDto;
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
    async SubmitPreAuthVisit(querySubmitPreAuthDto) {
        let medicalTransaction;
        try {
            const xRefId = querySubmitPreAuthDto.PatientInfo.RefId;
            const xTransactionNo = querySubmitPreAuthDto.PatientInfo.TransactionNo;
            const xInsurerCode = querySubmitPreAuthDto.PatientInfo.InsurerCode;
            const xHN = querySubmitPreAuthDto.PatientInfo.HN;
            const xVN = querySubmitPreAuthDto.PatientInfo.VN;
            const xVisitDateTime = querySubmitPreAuthDto.PatientInfo.VisitDateTime || '';
            const xComaScore = querySubmitPreAuthDto.PatientInfo.ComaScore || '';
            const xExpectedDayOfRecovery = querySubmitPreAuthDto.PatientInfo.ExpectedDayOfRecovery || '';
            const xPreauthReferClaimNo = querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo || '';
            const xPreauthOcc = querySubmitPreAuthDto.PatientInfo.PreauthReferOcc || '';
            const xIsPackage = querySubmitPreAuthDto.PatientInfo.IsPackage || false;
            const xAnesthesiaList = querySubmitPreAuthDto.PatientInfo.AnesthesiaList || '';
            const xExpectedAdmitDate = querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate || '';
            const xDscDateTime = querySubmitPreAuthDto.PatientInfo.DscDateTime || '';
            const xTotalEstimatedCost = querySubmitPreAuthDto.PatientInfo.TotalEstimatedCost || null;
            const xIndicationForAdmission = querySubmitPreAuthDto.PatientInfo.IndicationForAdmission || '';
            const xDxFreeText = querySubmitPreAuthDto.PatientInfo.DxFreeText ? querySubmitPreAuthDto.PatientInfo.DxFreeText.slice(0, 200) : '';
            const xPhysicalExam = querySubmitPreAuthDto.PatientInfo.PhysicalExam ? querySubmitPreAuthDto.PatientInfo.PhysicalExam.slice(0, 1000) : '';
            const xChiefComplaint = querySubmitPreAuthDto.PatientInfo.ChiefComplaint ? querySubmitPreAuthDto.PatientInfo.ChiefComplaint.slice(0, 200) : '';
            const xPresentIllness = querySubmitPreAuthDto.PatientInfo.PresentIllness ? querySubmitPreAuthDto.PatientInfo.PresentIllness.slice(0, 500) : '';
            const xSignSymptomsDate = querySubmitPreAuthDto.PatientInfo.SignSymptomsDate || '';
            const xAlcoholRelated = Boolean(querySubmitPreAuthDto.PatientInfo.AlcoholRelated) || false;
            const xPregnant = Boolean(querySubmitPreAuthDto.PatientInfo.Pregnant) || false;
            const xPrivateCase = Boolean(querySubmitPreAuthDto.PatientInfo.PrivateCase) || false;
            const xPreviousTreatmentDate = querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate || '';
            const xPreviousTreatmentDetail = querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail ? querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail.slice(0, 200) : '';
            const xHaveProcedure = Boolean(querySubmitPreAuthDto.PatientInfo.HaveProcedure) || false;
            const xHaveAccidentCauseOfInjuryDetail = (querySubmitPreAuthDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
            const xHaveAccidentInjuryDetail = (querySubmitPreAuthDto.PatientInfo.HaveAccidentInjuryDetail) || false;
            const xHaveDiagnosis = querySubmitPreAuthDto.PatientInfo.HaveDiagnosis || false;
            const xHavepreBilling = querySubmitPreAuthDto.PatientInfo.HavepreBilling || false;
            const xHavePreAuthNote = querySubmitPreAuthDto.PatientInfo.HavePreAuthNote || false;
            console.log('---->');
            console.log(xDxFreeText);
            if (xTransactionNo) {
                try {
                    const existingTransaction = await database_1.prismaProgest.medicaltransactions.findFirst({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo,
                        },
                    });
                    if (existingTransaction) {
                        await database_1.prismaProgest.medicaltransactions.delete({
                            where: { id: existingTransaction.id },
                        });
                    }
                    medicalTransaction = await database_1.prismaProgest.medicaltransactions.create({
                        data: {
                            insurerid: xInsurerCode,
                            refid: xRefId,
                            transactionno: xTransactionNo,
                            hn: xHN,
                            vn: xVN,
                            visitdatetime: xVisitDateTime,
                            preauthreferclaimno: xPreauthReferClaimNo,
                            preauthreferocc: xPreauthOcc,
                            ispackage: xIsPackage,
                            anesthesialist: xAnesthesiaList,
                            expectedadmitdate: xExpectedAdmitDate,
                            expecteddayofrecovery: xExpectedDayOfRecovery,
                            comascore: xComaScore,
                            dscdatetime: xDscDateTime,
                            totalestimatedcost: xTotalEstimatedCost,
                            indicationforadmission: xIndicationForAdmission,
                            dxfreetext: this.ReplaceSpacialCharacter(xDxFreeText),
                            physicalexam: xPhysicalExam,
                            chiefcomplaint: xChiefComplaint,
                            presentillness: xPresentIllness,
                            signsymptomsdate: xSignSymptomsDate,
                            alcoholrelated: xAlcoholRelated,
                            pregnant: xPregnant,
                            privatecase: xPrivateCase,
                            previoustreatmentdate: xPreviousTreatmentDate,
                            previoustreatmentdetail: xPreviousTreatmentDetail,
                            haveaccidentinjurydetail: xHaveAccidentInjuryDetail,
                            haveaccidentcauseofinjurydetail: xHaveAccidentCauseOfInjuryDetail,
                            haveprocedure: xHaveProcedure,
                            havediagnosis: xHaveDiagnosis,
                            havepreauthnote: xHavePreAuthNote,
                            haveprebilling: xHavepreBilling,
                        },
                    });
                    if (xPreauthReferClaimNo.length > 0) {
                        const existingTransactionClaim = await database_1.prismaProgest.transactionclaim.findFirst({
                            where: {
                                refid: xRefId,
                                transactionno: xTransactionNo,
                            },
                        });
                        if (existingTransactionClaim) {
                            await database_1.prismaProgest.transactionclaim.update({
                                where: {
                                    id: existingTransactionClaim.id,
                                },
                                data: {
                                    preauthreferclaimno: xPreauthReferClaimNo,
                                    preauthreferocc: xPreauthOcc,
                                },
                            });
                        }
                    }
                }
                catch (error) {
                    throw new Error(`Error creating medical transaction: ${error.message}`);
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid VisitDetail', '');
            }
            let newResultSubmitIPDVisitDto = new query_visit_preauth_submissiondto_1.ResultSubmitIPDVisitDto();
            newResultSubmitIPDVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: medicalTransaction
            };
            return newResultSubmitIPDVisitDto;
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
                        statusCode: error.code,
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
    async ReloadDiagnosis(queryDiagnosisDto) {
        try {
            const xRefId = queryDiagnosisDto.PatientInfo.RefId;
            const xTransactionNo = queryDiagnosisDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryDiagnosisDto.PatientInfo.InsurerCode;
            const xHN = queryDiagnosisDto.PatientInfo.HN;
            const xVN = queryDiagnosisDto.PatientInfo.VN;
            const xHaveDiagnosis = Boolean(queryDiagnosisDto.PatientInfo.HaveDiagnosis) || false;
            let DiagnosisList;
            if (xHaveDiagnosis == true) {
                if (Array.isArray(queryDiagnosisDto.PatientInfo.DiagnosisInfo)) {
                    DiagnosisList = queryDiagnosisDto.PatientInfo.DiagnosisInfo.map((diagnosis) => ({
                        DXCode: diagnosis.DxCode || '',
                        DxName: diagnosis.DxName || '',
                        DxType: diagnosis.DxType || ''
                    }));
                    const existingProcedures = await database_1.prismaProgest.diagnosistransactions.findMany({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo
                        }
                    });
                    const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(xVN);
                    if (TrakcarepatientInfo.statusCode == 200) {
                        const xQueryDiagnosis = TrakcarepatientInfo.DiagnosisInfo ?
                            await Promise.all(TrakcarepatientInfo.DiagnosisInfo.map(async (item) => {
                                return {
                                    DxTypeCode: item.DxTypeCode || '',
                                    DxCode: item.DxCode || '',
                                    DxName: item.DxName || '',
                                };
                            })) : [];
                        const EntriesfromTrakcare = xQueryDiagnosis.map((item) => ({
                            DXCode: item.DxCode,
                            DxName: item.DxName,
                            DxType: ''
                        }));
                        DiagnosisList.push(...EntriesfromTrakcare);
                    }
                    if (existingProcedures.length > 0) {
                        await Promise.all(existingProcedures.map(async (diagnosis) => {
                            return await database_1.prismaProgest.diagnosistransactions.delete({
                                where: {
                                    id: diagnosis.id
                                }
                            });
                        }));
                    }
                    await Promise.all(DiagnosisList.map(async (diagnosis) => {
                        return await database_1.prismaProgest.diagnosistransactions.create({
                            data: {
                                insurerid: xInsurerCode,
                                refid: xRefId,
                                transactionno: xTransactionNo,
                                hn: xHN,
                                vn: xVN,
                                icd10: diagnosis.DXCode,
                                dxname: diagnosis.DxName,
                                dxtype: diagnosis.DxType
                            }
                        });
                    }));
                }
                else {
                    DiagnosisList = [];
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                DiagnosisList = [
                    {
                        "Icd10": "",
                        "DxName": "",
                        "DxType": ""
                    }
                ];
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Invalid Diagnosis', '');
            }
            let newResultSubmitDiagnosisDto = new query_diagnoisis_preauth_submission_dto_1.ResultSubmitDiagnosisDto();
            newResultSubmitDiagnosisDto = {
                HTTPStatus: newHttpMessageDto,
                Result: DiagnosisList
            };
            return newResultSubmitDiagnosisDto;
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
                        statusCode: error.code,
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
    async SubmitDiagnosis(queryDiagnosisDto) {
        try {
            const xRefId = queryDiagnosisDto.PatientInfo.RefId;
            const xTransactionNo = queryDiagnosisDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryDiagnosisDto.PatientInfo.InsurerCode;
            const xHN = queryDiagnosisDto.PatientInfo.HN;
            const xVN = queryDiagnosisDto.PatientInfo.VN;
            const xHaveDiagnosis = Boolean(queryDiagnosisDto.PatientInfo.HaveDiagnosis) || false;
            let DiagnosisList;
            if (xHaveDiagnosis == true) {
                if (Array.isArray(queryDiagnosisDto.PatientInfo.DiagnosisInfo)) {
                    DiagnosisList = queryDiagnosisDto.PatientInfo.DiagnosisInfo.map((diagnosis) => ({
                        DXCode: diagnosis.DxCode || '',
                        DxName: diagnosis.DxName || '',
                        DxType: diagnosis.DxType || ''
                    }));
                    const existingProcedures = await database_1.prismaProgest.diagnosistransactions.findMany({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo
                        }
                    });
                    if (existingProcedures.length > 0) {
                        await Promise.all(existingProcedures.map(async (diagnosis) => {
                            return await database_1.prismaProgest.diagnosistransactions.delete({
                                where: {
                                    id: diagnosis.id
                                }
                            });
                        }));
                    }
                    await Promise.all(DiagnosisList.map(async (diagnosis) => {
                        return await database_1.prismaProgest.diagnosistransactions.create({
                            data: {
                                insurerid: xInsurerCode,
                                refid: xRefId,
                                transactionno: xTransactionNo,
                                hn: xHN,
                                vn: xVN,
                                icd10: diagnosis.DXCode,
                                dxname: diagnosis.DxName,
                                dxtype: diagnosis.DxType
                            }
                        });
                    }));
                }
                else {
                    DiagnosisList = [];
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                DiagnosisList = [
                    {
                        "Icd10": "",
                        "DxName": "",
                        "DxType": ""
                    }
                ];
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Invalid Diagnosis', '');
            }
            let newResultSubmitDiagnosisDto = new query_diagnoisis_preauth_submission_dto_1.ResultSubmitDiagnosisDto();
            newResultSubmitDiagnosisDto = {
                HTTPStatus: newHttpMessageDto,
                Result: DiagnosisList
            };
            return newResultSubmitDiagnosisDto;
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
                        statusCode: error.code,
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
    async SubmitPreAuthNote(queryPreAuthNoteDto) {
        try {
            const xRefId = queryPreAuthNoteDto.PatientInfo.RefId;
            const xTransactionNo = queryPreAuthNoteDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryPreAuthNoteDto.PatientInfo.InsurerCode;
            const xHN = queryPreAuthNoteDto.PatientInfo.HN;
            const xVN = queryPreAuthNoteDto.PatientInfo.VN;
            const xHavePreAuthNote = queryPreAuthNoteDto.PatientInfo.HavePreAuthNote;
            let PreAuthNoteList;
            if (xHavePreAuthNote == true) {
                if (Array.isArray(queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo)) {
                    PreAuthNoteList = queryPreAuthNoteDto.PatientInfo.PreAuthNoteInfo.map((preauthnote) => ({
                        PreAuthDatetime: preauthnote.PreAuthDatetime || '',
                        PreAuthDetail: preauthnote.PreAuthDetail || '',
                    }));
                    const existingPreauthnote = await database_1.prismaProgest.preauthnotetransactions.findMany({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo
                        }
                    });
                    if (existingPreauthnote.length > 0) {
                        await Promise.all(existingPreauthnote.map(async (preauthnote) => {
                            return await database_1.prismaProgest.preauthnotetransactions.delete({
                                where: {
                                    id: preauthnote.id
                                }
                            });
                        }));
                    }
                    await Promise.all(PreAuthNoteList.map(async (preauthnote) => {
                        return await database_1.prismaProgest.preauthnotetransactions.create({
                            data: {
                                insurerid: xInsurerCode,
                                refid: xRefId,
                                transactionno: xTransactionNo,
                                hn: xHN,
                                vn: xVN,
                                preauthdatetime: preauthnote.PreAuthDatetime,
                                preauthdetail: preauthnote.PreAuthDetail,
                            }
                        });
                    }));
                }
                else {
                    PreAuthNoteList = [];
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                PreAuthNoteList = [
                    {
                        "PreAuthDatetime": "",
                        "PreAuthDetail": "",
                    }
                ];
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Invalid Procedure', '');
            }
            let newResultSubmitPreAuthNoteDto = new query_preauthnote_preauth_submission_dto_1.ResultSubmitPreAuthNoteDto();
            newResultSubmitPreAuthNoteDto = {
                HTTPStatus: newHttpMessageDto,
                Result: PreAuthNoteList
            };
            return newResultSubmitPreAuthNoteDto;
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
                        statusCode: error.code,
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
    async SubmitAccident(queryAccidentDto) {
        let xResultInfo, xCauseOfInjuryDetail, xInjuryDetail;
        try {
            const xRefId = queryAccidentDto.PatientInfo.RefId;
            const xTransactionNo = queryAccidentDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryAccidentDto.PatientInfo.InsurerCode;
            const xHN = queryAccidentDto.PatientInfo.HN;
            const xVN = queryAccidentDto.PatientInfo.VN;
            const xHaveAccidentCauseOfInjuryDetail = queryAccidentDto.PatientInfo.HaveAccidentCauseOfInjuryDetail || false;
            const xHaveAccidentInjuryDetail = queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail || false;
            const xAccidentPlace = queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentPlace;
            const xAccidentDate = queryAccidentDto.PatientInfo.AccidentDetailInfo.AccidentDate;
            if ((xHaveAccidentCauseOfInjuryDetail == true) || (xHaveAccidentInjuryDetail == true)) {
                await database_1.prismaProgest.$transaction(async (prisma) => {
                    const existingTransaction = await prisma.accidenttransactions.findFirst({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo
                        },
                    });
                    if (existingTransaction) {
                        await prisma.injurydetail.deleteMany({
                            where: {
                                accidentid: existingTransaction.id,
                            },
                        });
                        await prisma.causeofinjurydetail.deleteMany({
                            where: {
                                accidentid: existingTransaction.id,
                            },
                        });
                        await prisma.accidenttransactions.delete({
                            where: {
                                id: existingTransaction.id,
                            },
                        });
                    }
                    const accidentTransaction = await prisma.accidenttransactions.create({
                        data: {
                            insurerid: xInsurerCode,
                            refid: xRefId,
                            transactionno: xTransactionNo,
                            hn: xHN,
                            vn: xVN,
                            accidentplace: xAccidentPlace,
                            accidentdate: xAccidentDate
                        },
                    });
                    if (xHaveAccidentCauseOfInjuryDetail == true) {
                        if (queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail) {
                            xCauseOfInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.CauseOfInjuryDetail.map((cause) => ({
                                accidentid: accidentTransaction.id,
                                causeofinjury: cause.CauseOfInjury,
                                commentofinjury: cause.CommentOfInjury,
                            }));
                            await prisma.causeofinjurydetail.createMany({
                                data: xCauseOfInjuryDetail,
                            });
                        }
                    }
                    else {
                        await prisma.causeofinjurydetail.deleteMany({
                            where: {
                                accidentid: existingTransaction.id,
                            },
                        });
                        xCauseOfInjuryDetail = [{
                                CauseOfInjury: '',
                                CommentOfInjury: '',
                            }];
                    }
                    if (xHaveAccidentInjuryDetail == true) {
                        if (queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) {
                            xInjuryDetail = queryAccidentDto.PatientInfo.AccidentDetailInfo.InjuryDetail.map((injury) => ({
                                accidentid: accidentTransaction.id,
                                woundtype: injury.WoundType,
                                injuryside: injury.InjurySide,
                                injuryarea: injury.InjuryArea,
                            }));
                            await prisma.injurydetail.createMany({
                                data: xInjuryDetail,
                            });
                        }
                    }
                    else {
                        if ((xHaveAccidentInjuryDetail == false)) {
                            await prisma.injurydetail.deleteMany({
                                where: {
                                    accidentid: existingTransaction.id,
                                },
                            });
                            xInjuryDetail = [{
                                    WoundType: '',
                                    InjurySide: '',
                                    InjuryArea: '',
                                }];
                        }
                    }
                });
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                if ((xHaveAccidentCauseOfInjuryDetail == false)) {
                    xCauseOfInjuryDetail = [{
                            CauseOfInjury: '',
                            CommentOfInjury: '',
                        }];
                }
                if ((xHaveAccidentInjuryDetail == false)) {
                    xInjuryDetail = [{
                            WoundType: '',
                            InjurySide: '',
                            InjuryArea: '',
                        }];
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Invalid Accident', '');
            }
            const xQueryAccident = {
                AccidentPlace: xAccidentPlace,
                AccidentDate: xAccidentDate,
                CauseOfInjuryDetail: xCauseOfInjuryDetail,
                InjuryDetail: xInjuryDetail
            };
            xResultInfo = {
                AccidentDetailInfo: xQueryAccident,
            };
            let newResultSubmitAccidentDto = new query_accident_preauth_submission_dto_1.ResultSubmitAccidentDto();
            newResultSubmitAccidentDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitAccidentDto;
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
                        statusCode: error.code,
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
    async SubmitProcedure(queryProcedureDto) {
        try {
            const xRefId = queryProcedureDto.PatientInfo.RefId;
            const xTransactionNo = queryProcedureDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryProcedureDto.PatientInfo.InsurerCode;
            const xHN = queryProcedureDto.PatientInfo.HN;
            const xVN = queryProcedureDto.PatientInfo.VN;
            const xHaveProcedure = Boolean(queryProcedureDto.PatientInfo.HaveProcedure) || false;
            let ProcedureList;
            if (xHaveProcedure == true) {
                if (Array.isArray(queryProcedureDto.PatientInfo.ProcedureInfo)) {
                    ProcedureList = queryProcedureDto.PatientInfo.ProcedureInfo.map((procedure) => ({
                        Icd9: procedure.Icd9 || '',
                        ProcedureName: procedure.ProcedureName || '',
                        ProcedureDate: procedure.ProcedureDate || ''
                    }));
                    const existingProcedures = await database_1.prismaProgest.proceduretransactions.findMany({
                        where: {
                            refid: xRefId,
                            transactionno: xTransactionNo
                        }
                    });
                    if (existingProcedures.length > 0) {
                        await Promise.all(existingProcedures.map(async (procedure) => {
                            return await database_1.prismaProgest.proceduretransactions.delete({
                                where: {
                                    id: procedure.id
                                }
                            });
                        }));
                    }
                    await Promise.all(ProcedureList.map(async (procedure) => {
                        return await database_1.prismaProgest.proceduretransactions.create({
                            data: {
                                insurerid: xInsurerCode,
                                refid: xRefId,
                                transactionno: xTransactionNo,
                                hn: xHN,
                                vn: xVN,
                                icd9: procedure.Icd9,
                                procedurename: procedure.ProcedureName,
                                proceduredate: procedure.ProcedureDate
                            }
                        });
                    }));
                }
                else {
                    ProcedureList = [];
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                ProcedureList = [
                    {
                        "Icd9": "",
                        "ProcedureName": "",
                        "ProcedureDate": ""
                    }
                ];
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Invalid Procedure', '');
            }
            let newResultSubmitProcedureDto = new query_procedure_preauth_submission_dto_1.ResultSubmitProcedureDto();
            newResultSubmitProcedureDto = {
                HTTPStatus: newHttpMessageDto,
                Result: ProcedureList
            };
            return newResultSubmitProcedureDto;
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
                        statusCode: error.code,
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
    async SubmitPreSubmissionToAIA(querySubmitPreAuthDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: querySubmitPreAuthDto.PatientInfo.RefId,
                xTransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,
                xHN: querySubmitPreAuthDto.PatientInfo.HN,
                xInsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode,
                xVN: querySubmitPreAuthDto.PatientInfo.VN,
                xVisitDateTime: querySubmitPreAuthDto.PatientInfo.VisitDateTime,
                xAccidentDate: querySubmitPreAuthDto.PatientInfo.AccidentDate,
                xAccidentPlaceCode: querySubmitPreAuthDto.PatientInfo.AccidentPlaceCode,
                xIdType: querySubmitPreAuthDto.PatientInfo.IdType,
                xPolicyTypeCode: querySubmitPreAuthDto.PatientInfo.PolicyTypeCode,
                xServiceSettingCode: querySubmitPreAuthDto.PatientInfo.ServiceSettingCode,
                xSurgeryTypeCode: querySubmitPreAuthDto.PatientInfo.SurgeryTypeCode,
                xIllnessTypeCode: querySubmitPreAuthDto.PatientInfo.IllnessTypeCode,
                xRunningdocument: querySubmitPreAuthDto.PatientInfo.Runningdocument,
                xPreviousTreatmentDate: querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate,
                xPreviousTreatmentDetail: querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail,
                xPreauthReferClaimNo: querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo,
                xPreauthReferOcc: querySubmitPreAuthDto.PatientInfo.PreauthReferOcc,
                xExpectedAdmitDate: querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate,
                xDxFreeText: querySubmitPreAuthDto.PatientInfo.DxFreeText,
                xDscDateTime: querySubmitPreAuthDto.PatientInfo.DscDateTime,
                xIndicationForAdmission: querySubmitPreAuthDto.PatientInfo.IndicationForAdmission,
            };
            const xRreferencevn = RequesetBody.xVN;
            const getSubmitPreAuthPatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
            let newResultPatientInfoDto;
            if (getSubmitPreAuthPatient && getSubmitPreAuthPatient.PatientInfo && getSubmitPreAuthPatient.PatientInfo.HN.length > 0) {
                newResultPatientInfoDto = {
                    Dob: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.Dob, AIA_APISecretkey),
                    Hn: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.HN, AIA_APISecretkey),
                    Gender: getSubmitPreAuthPatient.PatientInfo.Gender
                };
            }
            else {
                newResultPatientInfoDto = {
                    Dob: '',
                    Hn: '',
                    Gender: ''
                };
            }
            const whereConditionsGetVisit = {
                ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
                ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
                ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
            };
            const existingVisitRecord = await database_1.prismaProgest.medicaltransactions.findFirst({
                where: whereConditionsGetVisit
            });
            let newResultVisitInfoDto = new result_submit_preauth_submission_dto_1.ResultVisitInfoDto();
            if (existingVisitRecord) {
                const newQueryVisitDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN,
                };
                const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto);
                newResultVisitInfoDto = {
                    AccidentDate: getvisitformDatabase.Result.VisitInfo.AccidentDate,
                    AdmitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                    AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote || '',
                    AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated || false,
                    An: await this.utilsService.EncryptAESECB(getvisitformDatabase.Result.VisitInfo.VN, AIA_APISecretkey),
                    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint || '',
                    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore || '',
                    DscDateTime: getvisitformDatabase.Result.VisitInfo.DscDateTime,
                    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText || '',
                    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery || '',
                    ExpectedLos: null,
                    ExpectedAdmitDate: getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate,
                    Height: getvisitformDatabase.Result.VisitInfo.Height || '',
                    IndicationForAdmission: getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
                    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam || '',
                    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment || '',
                    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant || false,
                    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness || '',
                    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate || '',
                    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail || '',
                    PreauthReferClaimNo: getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
                    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
                    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase || false,
                    SignSymptomsDate: getvisitformDatabase.Result.VisitInfo.SignSymptomsDate || '',
                    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition || '',
                    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                    VisitDate: getvisitformDatabase.Result.VisitInfo.VisitDateTime.split(' ')[0],
                    Vn: await this.utilsService.EncryptAESECB(getvisitformDatabase.Result.VisitInfo.VN, AIA_APISecretkey),
                    AnesthesiaList: getvisitformDatabase.Result.VisitInfo.AnesthesiaList,
                    Weight: getvisitformDatabase.Result.VisitInfo.Weight || '',
                    TotalEstimatedCost: getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost,
                    IsPackage: getvisitformDatabase.Result.VisitInfo.IsPackage,
                };
            }
            newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);
            let newResultVitalSignInfoDto = [];
            newResultVitalSignInfoDto = [{
                    DiastolicBp: '',
                    HeartRate: '',
                    OxygenSaturation: '',
                    PainScore: '',
                    RespiratoryRate: '',
                    SystolicBp: '',
                    Temperature: '',
                    VitalSignEntryDateTime: '',
                }];
            let newQueryDiagnosisInfoDto = [];
            const newQueryPreDiagnosisDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(newQueryPreDiagnosisDatabaseBodyDto);
            if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result?.DiagnosisInfo && getDiagnosisformDatabase.Result?.DiagnosisInfo.length > 0) {
                newQueryDiagnosisInfoDto = await Promise.all(getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
                    return {
                        Icd10: item.Icd10,
                        DxName: item.DxName,
                        DxType: 'OT',
                    };
                }));
            }
            else {
                newQueryDiagnosisInfoDto = [{
                        DxName: '',
                        DxType: '',
                        Icd10: '',
                    }];
            }
            let newAccidentDetail;
            if ((RequesetBody.xIllnessTypeCode = 'ACC') || (RequesetBody.xIllnessTypeCode = 'ER')) {
                let newQueryAccidentDatabaseBodyDto = new result_accident_databse_dto_1.QueryAccidentDatabaseBodyDto();
                newQueryAccidentDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN,
                };
                const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
                const accidentDetailInfo = new review_preauth_submission_dto_1.AccidentDetailDto();
                accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
                accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
                if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
                    accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
                        const causeDetail = new result_accident_databse_dto_1.CauseOfInjuryDetail();
                        causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
                        causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
                        return causeDetail;
                    });
                }
                if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
                    accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
                        const injuryDetail = new result_accident_databse_dto_1.InjuryDetail();
                        injuryDetail.WoundType = injury.WoundType || '';
                        injuryDetail.InjurySide = injury.InjurySide || '';
                        injuryDetail.InjuryArea = injury.InjuryArea || '';
                        return injuryDetail;
                    });
                }
                newAccidentDetail = {
                    AccidentPlace: accidentDetailInfo.AccidentPlace,
                    AccidentDate: accidentDetailInfo.AccidentDate,
                    CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
                    InjuryDetail: accidentDetailInfo.InjuryDetail
                };
            }
            else {
                newAccidentDetail = {
                    "AccidentPlace": '',
                    "AccidentDate": '',
                    "CauseOfInjuryDetail": [
                        {
                            "CauseOfInjury": '',
                            "CommentOfInjury": ''
                        }
                    ],
                    "InjuryDetail": [
                        {
                            "WoundType": "",
                            "InjurySide": "",
                            "InjuryArea": ''
                        }
                    ]
                };
            }
            let newResultProcedureInfoDto = [];
            const newQueryProcedeureDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
            if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
                newResultProcedureInfoDto = await Promise.all(getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
                    return {
                        Icd9: item.Icd9,
                        ProcedureName: item.ProcedureName,
                        ProcedureDate: item.ProcedureDate,
                    };
                }));
            }
            else {
                newResultProcedureInfoDto = [{
                        Icd9: '',
                        ProcedureName: '',
                        ProcedureDate: '',
                    }];
            }
            let newResultInvestigationInfoDto = [];
            newResultInvestigationInfoDto = [{
                    InvestigationCode: '',
                    InvestigationGroup: '',
                    InvestigationName: '',
                    InvestigationResult: '',
                    ResultDateTime: ''
                }];
            let newResultOrderItemInfoDto = [];
            newResultOrderItemInfoDto = [{
                    ItemId: '',
                    ItemName: '',
                    ItemAmount: '',
                    Discount: '',
                    Initial: '',
                    LocalBillingCode: '',
                    LocalBillingName: '',
                    Location: '',
                    NetAmount: '',
                    SimbVersion: '',
                    Terminology: ''
                }];
            const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(xRreferencevn);
            let newResultDoctorInfoDto = [];
            if (getOPDDischargeDoctor && getOPDDischargeDoctor.DoctorInfo && getOPDDischargeDoctor.DoctorInfo.length > 0) {
                newResultDoctorInfoDto = await Promise.all(getOPDDischargeDoctor.DoctorInfo.map(async (item) => {
                    return {
                        DoctorLicense: item.DoctorLicense.toString().padStart(10, '0'),
                        DoctorRole: item.DoctorRole,
                        DoctorFirstName: await this.utilsService.EncryptAESECB(item.DoctorFirstName, AIA_APISecretkey),
                        DoctorLastName: ''
                    };
                }));
            }
            else {
                newResultDoctorInfoDto = [{
                        DoctorLicense: '',
                        DoctorRole: '',
                        DoctorFirstName: '',
                        DoctorLastName: '',
                    }];
            }
            const newResultPSSInfoDto = {
                "Exclusion": "0",
                "FinalScore": "0",
                "Findings": [
                    {
                        "Description": "0",
                        "Exclusion": "0",
                        "Medical": "0",
                        "Reference": "0"
                    }
                ],
                "Id": "0",
                "Medical": "0"
            };
            let newResultPreAuthNoteDto = [];
            newResultPreAuthNoteDto = [{
                    PreAuthDatetime: '',
                    PreAuthDetail: '',
                }];
            let newTotalBillAmount = '';
            let newResultBillingInfoDto = [];
            const newQueryBillingInfoDtoDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getPreBillingformDatabase = await this.utilsService.getPreBillingformDatabase(newQueryBillingInfoDtoDatabaseBodyDto);
            if (getPreBillingformDatabase && getPreBillingformDatabase.Result.PreBillingInfo && getPreBillingformDatabase.Result.PreBillingInfo.length > 0) {
                newResultBillingInfoDto = await Promise.all(getPreBillingformDatabase.Result.PreBillingInfo.map(async (item) => {
                    newTotalBillAmount = item.TotalBillAmount;
                    return {
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        SimbBillingCode: item.SimbBillingCode,
                        PayorBillingCode: item.PayorBillingCode,
                        BillingDiscount: item.BillingDiscount,
                        BillingInitial: item.BillingInitial,
                        BillingNetAmount: item.BillingNetAmount,
                    };
                }));
            }
            else {
                newResultBillingInfoDto = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                    }];
            }
            const QueryCreateClaimDocumentDtoBody = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: 13,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
                DocumentName: '',
                DocumenttypeCode: '',
                UploadedBy: '',
                Runningdocument: 0
            };
            const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody);
            let newResultAttachDocListInfoDto = [];
            newResultAttachDocListInfoDto = await Promise.all(getListDocumentByTransection.map(async (doc) => {
                const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
                return {
                    Base64Data: EncryptDocument,
                    DocName: doc.DocName,
                };
            }));
            const newIsPackage = newResultVisitInfoDto.IsPackage;
            const newAnesthesiaList = [newResultVisitInfoDto.AnesthesiaList];
            const newTotalEstimatedCost = newResultVisitInfoDto.TotalEstimatedCost;
            let newResultDataJsonDto = new result_submit_preauth_submission_dto_1.ResultDataJsonDto();
            newResultDataJsonDto = {
                Patient: newResultPatientInfoDto,
                Visit: newResultVisitInfoDto,
                VitalSign: newResultVitalSignInfoDto,
                Diagnosis: newQueryDiagnosisInfoDto,
                AccidentDetail: newAccidentDetail,
                Procedure: newResultProcedureInfoDto,
                AnesthesiaList: newAnesthesiaList,
                IsPackage: newIsPackage,
                Investigation: newResultInvestigationInfoDto,
                OrderItem: newResultOrderItemInfoDto,
                Doctor: newResultDoctorInfoDto,
                Billing: newResultBillingInfoDto,
                TotalEstimatedCost: newTotalEstimatedCost,
                TotalBillAmount: newTotalBillAmount,
                Pss: newResultPSSInfoDto,
                PreAuthNote: newResultPreAuthNoteDto
            };
            const newOPDDischargeResponseDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                Username: AIA_APIHopitalUsername,
                HospitalCode: await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey),
                InsurerCode: RequesetBody.xInsurerCode,
                ElectronicSignature: '',
                DataJsonType: "3",
                DataJson: newResultDataJsonDto,
                AttachDocList: newResultAttachDocListInfoDto
            };
            const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
            const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
            const apiURL = `${AIA_APIURL}/SmartClaim/preauthSubmission`;
            const body = newOPDDischargeResponseDto;
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
                let xInsuranceResult = new result_submit_preauth_submission_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                let xInsuranceData = new result_submit_preauth_submission_dto_1.InsuranceData();
                xInsuranceData = {
                    RefId: responsefromAIA.Data.RefId || '',
                    TransactionNo: responsefromAIA.Data.TransactionNo || '',
                    InsurerCode: responsefromAIA.Data.InsurerCode || '',
                    Message: responsefromAIA.Data.Message || '',
                    MessageTh: responsefromAIA.Data.MessageTh || '',
                    ClaimNo: responsefromAIA.Data.ClaimNo || '',
                    OccurrenceNo: responsefromAIA.Data.OccurrenceNo || '',
                    TotalApprovedAmount: responsefromAIA.Data.TotalApprovedAmount || '',
                    TotalExcessAmount: responsefromAIA.Data.TotalExcessAmount || '',
                    IsReimbursement: Boolean(responsefromAIA.Data.IsReimbursement),
                    CoverageList: responsefromAIA.Data.CoverageList
                        ? responsefromAIA.Data.CoverageList.map((Coverage) => ({
                            type: Coverage.type || '',
                            status: Boolean(Coverage.status),
                        }))
                        : [],
                    MessageList: responsefromAIA.Data.MessageList
                        ? responsefromAIA.Data.MessageList.map((message) => ({
                            policyNo: message.policyNo ? this.utilsService.DecryptAESECB(message.policyNo, AIA_APISecretkey) : '',
                            planName: message.planName || '',
                            messageTh: message.messageTh || '',
                            messageEn: message.messageEn || '',
                        }))
                        : [],
                };
                xResultInfo = {
                    InsuranceResult: xInsuranceResult,
                    InsuranceData: xInsuranceData
                };
                const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];
                if (existingRecord) {
                    await database_1.prismaProgest.transactionclaim.update({
                        where: {
                            id: existingRecord.id,
                        },
                        data: {
                            claimno: responsefromAIA.Data.ClaimNo,
                            occurrenceno: responsefromAIA.Data.OccurrenceNo,
                            invoicenumber: responsefromAIA.Data.InvoiceNumber,
                            totalapprovedamount: responsefromAIA.Data.TotalApprovedAmount,
                            totalexcessamount: responsefromAIA.Data.TotalExcessAmount,
                            isreimbursement: responsefromAIA.Data.IsReimbursement,
                            totalbillamount: newTotalBillAmount,
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefId,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            visitdate: formattedEffectiveDate,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                            runningdocument: RequesetBody.xRunningdocument,
                            preauthreferclaimno: RequesetBody.xPreauthReferClaimNo,
                            preauthreferocc: RequesetBody.xPreauthReferOcc
                        },
                    });
                }
                else {
                    await database_1.prismaProgest.transactionclaim.create({
                        data: {
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefId,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            visitdate: formattedEffectiveDate,
                            claimno: responsefromAIA.Data.ClaimNo,
                            occurrenceno: responsefromAIA.Data.OccurrenceNo,
                            invoicenumber: responsefromAIA.Data.InvoiceNumber,
                            totalapprovedamount: responsefromAIA.Data.TotalApprovedAmount,
                            totalexcessamount: responsefromAIA.Data.TotalExcessAmount,
                            isreimbursement: responsefromAIA.Data.IsReimbursement,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                            runningdocument: RequesetBody.xRunningdocument,
                            preauthreferclaimno: RequesetBody.xPreauthReferClaimNo,
                            preauthreferocc: RequesetBody.xPreauthReferOcc
                        },
                    });
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultSubmitIpdDischargeDto = new result_submit_preauth_submission_dto_1.ResultSubmitPreAuthSubmissionDto();
            newResultSubmitIpdDischargeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitIpdDischargeDto;
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
    async SubmitPreSubmissionToAIA_OLD(querySubmitPreAuthDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: querySubmitPreAuthDto.PatientInfo.RefId,
                xTransactionNo: querySubmitPreAuthDto.PatientInfo.TransactionNo,
                xHN: querySubmitPreAuthDto.PatientInfo.HN,
                xInsurerCode: querySubmitPreAuthDto.PatientInfo.InsurerCode,
                xVN: querySubmitPreAuthDto.PatientInfo.VN,
                xVisitDateTime: querySubmitPreAuthDto.PatientInfo.VisitDateTime,
                xAccidentDate: querySubmitPreAuthDto.PatientInfo.AccidentDate,
                xAccidentPlaceCode: querySubmitPreAuthDto.PatientInfo.AccidentPlaceCode,
                xIdType: querySubmitPreAuthDto.PatientInfo.IdType,
                xPolicyTypeCode: querySubmitPreAuthDto.PatientInfo.PolicyTypeCode,
                xServiceSettingCode: querySubmitPreAuthDto.PatientInfo.ServiceSettingCode,
                xSurgeryTypeCode: querySubmitPreAuthDto.PatientInfo.SurgeryTypeCode,
                xIllnessTypeCode: querySubmitPreAuthDto.PatientInfo.IllnessTypeCode,
                xRunningdocument: querySubmitPreAuthDto.PatientInfo.Runningdocument,
                xPreviousTreatmentDate: querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDate,
                xPreviousTreatmentDetail: querySubmitPreAuthDto.PatientInfo.PreviousTreatmentDetail,
                xPreauthReferClaimNo: querySubmitPreAuthDto.PatientInfo.PreauthReferClaimNo,
                xPreauthReferOcc: querySubmitPreAuthDto.PatientInfo.PreauthReferOcc,
                xExpectedAdmitDate: querySubmitPreAuthDto.PatientInfo.ExpectedAdmitDate,
                xDxFreeText: querySubmitPreAuthDto.PatientInfo.DxFreeText,
                xDscDateTime: querySubmitPreAuthDto.PatientInfo.DscDateTime,
                xIndicationForAdmission: querySubmitPreAuthDto.PatientInfo.IndicationForAdmission,
            };
            const getSubmitPreAuthPatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
            let newResultPatientInfoDto;
            if (getSubmitPreAuthPatient && getSubmitPreAuthPatient.PatientInfo && getSubmitPreAuthPatient.PatientInfo.HN.length > 0) {
                newResultPatientInfoDto = {
                    Dob: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.Dob, AIA_APISecretkey),
                    Hn: await this.utilsService.EncryptAESECB(getSubmitPreAuthPatient.PatientInfo.HN, AIA_APISecretkey),
                    Gender: getSubmitPreAuthPatient.PatientInfo.Gender
                };
            }
            else {
                newResultPatientInfoDto = {
                    Dob: '',
                    Hn: '',
                    Gender: ''
                };
            }
            const whereConditionsGetVisit = {
                ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
                ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
                ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
            };
            const existingVisitRecord = await database_1.prismaProgest.medicaltransactions.findFirst({
                where: whereConditionsGetVisit
            });
            let newResultVisitInfoDto = new result_submit_preauth_submission_dto_1.ResultVisitInfoDto();
            if (existingVisitRecord) {
                const newQueryVisitDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN,
                };
                const getvisitformDatabase = await this.utilsService.getvisitIPDformDatabase(newQueryVisitDatabaseBodyDto);
                newResultVisitInfoDto = {
                    AccidentDate: getvisitformDatabase.Result.VisitInfo.AccidentDate,
                    AdmitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                    AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote || '',
                    AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated || false,
                    An: await this.utilsService.EncryptAESECB(getvisitformDatabase.Result.VisitInfo.VN, AIA_APISecretkey),
                    ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint || '',
                    ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore || '',
                    DscDateTime: getvisitformDatabase.Result.VisitInfo.DscDateTime,
                    DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText || '',
                    ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery || '',
                    ExpectedLos: null,
                    ExpectedAdmitDate: getvisitformDatabase.Result.VisitInfo.ExpectedAdmitDate,
                    Height: getvisitformDatabase.Result.VisitInfo.Height || '',
                    IndicationForAdmission: getvisitformDatabase.Result.VisitInfo.IndicationForAdmission,
                    PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam || '',
                    PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment || '',
                    Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant || false,
                    PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness || '',
                    PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate || '',
                    PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail || '',
                    PreauthReferClaimNo: getvisitformDatabase.Result.VisitInfo.PreauthReferClaimNo,
                    PreauthReferOcc: getvisitformDatabase.Result.VisitInfo.PreauthReferOcc,
                    PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase || false,
                    SignSymptomsDate: getvisitformDatabase.Result.VisitInfo.SignSymptomsDate || '',
                    UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition || '',
                    VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                    VisitDate: getvisitformDatabase.Result.VisitInfo.VisitDateTime.split(' ')[0],
                    Vn: await this.utilsService.EncryptAESECB(getvisitformDatabase.Result.VisitInfo.VN, AIA_APISecretkey),
                    AnesthesiaList: getvisitformDatabase.Result.VisitInfo.AnesthesiaList,
                    Weight: getvisitformDatabase.Result.VisitInfo.Weight || '',
                    TotalEstimatedCost: getvisitformDatabase.Result.VisitInfo.TotalEstimatedCost,
                    IsPackage: getvisitformDatabase.Result.VisitInfo.IsPackage
                };
            }
            else {
                let VNForVisitinfo;
                const getIPDDischargeVisit = await this.trakcareService.getIPDVisit(VNForVisitinfo);
                newResultVisitInfoDto = {
                    AccidentDate: getIPDDischargeVisit.VisitInfo.AccidentDate,
                    AdmitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
                    AdditionalNote: getIPDDischargeVisit.VisitInfo.AdditionalNote,
                    AlcoholRelated: getIPDDischargeVisit.VisitInfo.AlcoholRelated,
                    An: await this.utilsService.EncryptAESECB(getIPDDischargeVisit.VisitInfo.vn, AIA_APISecretkey),
                    ChiefComplaint: getIPDDischargeVisit.VisitInfo.ChiefComplaint,
                    ComaScore: getIPDDischargeVisit.VisitInfo.ComaScore,
                    DscDateTime: getIPDDischargeVisit.VisitInfo.DscDateTime,
                    DxFreeText: getIPDDischargeVisit.VisitInfo.DxFreeText,
                    ExpectedDayOfRecovery: '',
                    ExpectedLos: null,
                    ExpectedAdmitDate: getIPDDischargeVisit.VisitInfo.ExpectedAdmitDate,
                    Height: '',
                    IndicationForAdmission: RequesetBody.xIndicationForAdmission,
                    PhysicalExam: '',
                    PlanOfTreatment: '',
                    Pregnant: getIPDDischargeVisit.VisitInfo.Pregnant,
                    PresentIllness: '',
                    PreviousTreatmentDate: '',
                    PreviousTreatmentDetail: '',
                    PreauthReferClaimNo: RequesetBody.xPreauthReferClaimNo || '',
                    PreauthReferOcc: RequesetBody.xPreauthReferOcc || '',
                    PrivateCase: getIPDDischargeVisit.VisitInfo.PrivateCase,
                    SignSymptomsDate: '',
                    UnderlyingCondition: '',
                    VisitDateTime: getIPDDischargeVisit.VisitInfo.VisitDateTime,
                    VisitDate: getIPDDischargeVisit.VisitInfo.VisitDateTime.split(' ')[0],
                    Vn: await this.utilsService.EncryptAESECB(getIPDDischargeVisit.VisitInfo.vn, AIA_APISecretkey),
                    Weight: '',
                    AnesthesiaList: '',
                    TotalEstimatedCost: '',
                    IsPackage: null
                };
            }
            newResultVisitInfoDto.ExpectedLos = this.calculateDaysBetweenDates(newResultVisitInfoDto.VisitDateTime, newResultVisitInfoDto.DscDateTime);
            let newResultVitalSignInfoDto = [];
            newResultVitalSignInfoDto = [{
                    DiastolicBp: '',
                    HeartRate: '',
                    OxygenSaturation: '',
                    PainScore: '',
                    RespiratoryRate: '',
                    SystolicBp: '',
                    Temperature: '',
                    VitalSignEntryDateTime: '',
                }];
            let newQueryDiagnosisInfoDto = [];
            const newQueryPreDiagnosisDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getDiagnosisformDatabase = await this.utilsService.getDiagnosisformDatabase(newQueryPreDiagnosisDatabaseBodyDto);
            if (getDiagnosisformDatabase && getDiagnosisformDatabase.Result.DiagnosisInfo && getDiagnosisformDatabase.Result.DiagnosisInfo.length > 0) {
                newQueryDiagnosisInfoDto = await Promise.all(getDiagnosisformDatabase.Result.DiagnosisInfo.map(async (item) => {
                    return {
                        Icd10: item.Icd10,
                        DxName: item.DxName,
                        DxType: 'OT',
                    };
                }));
            }
            else {
                newQueryDiagnosisInfoDto = [{
                        DxName: '',
                        DxType: '',
                        Icd10: '',
                    }];
            }
            let newAccidentDetail;
            if ((RequesetBody.xIllnessTypeCode = 'ACC') || (RequesetBody.xIllnessTypeCode = 'ER')) {
                let newQueryAccidentDatabaseBodyDto = new result_accident_databse_dto_1.QueryAccidentDatabaseBodyDto();
                newQueryAccidentDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN,
                };
                const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
                const accidentDetailInfo = new review_preauth_submission_dto_1.AccidentDetailDto();
                accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
                accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
                if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
                    accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
                        const causeDetail = new result_accident_databse_dto_1.CauseOfInjuryDetail();
                        causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
                        causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
                        return causeDetail;
                    });
                }
                if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
                    accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
                        const injuryDetail = new result_accident_databse_dto_1.InjuryDetail();
                        injuryDetail.WoundType = injury.WoundType || '';
                        injuryDetail.InjurySide = injury.InjurySide || '';
                        injuryDetail.InjuryArea = injury.InjuryArea || '';
                        return injuryDetail;
                    });
                }
                newAccidentDetail = {
                    AccidentPlace: accidentDetailInfo.AccidentPlace,
                    AccidentDate: accidentDetailInfo.AccidentDate,
                    CauseOfInjuryDetail: accidentDetailInfo.CauseOfInjuryDetail,
                    InjuryDetail: accidentDetailInfo.InjuryDetail
                };
            }
            else {
                newAccidentDetail = {
                    "AccidentPlace": '',
                    "AccidentDate": '',
                    "CauseOfInjuryDetail": [
                        {
                            "CauseOfInjury": '',
                            "CommentOfInjury": ''
                        }
                    ],
                    "InjuryDetail": [
                        {
                            "WoundType": "",
                            "InjurySide": "",
                            "InjuryArea": ''
                        }
                    ]
                };
            }
            let newResultProcedureInfoDto = [];
            const newQueryProcedeureDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getIPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
            if (getIPDDischargeProcedure && getIPDDischargeProcedure.Result.ProcedureInfo && getIPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
                newResultProcedureInfoDto = await Promise.all(getIPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
                    return {
                        Icd9: item.Icd9,
                        ProcedureName: item.ProcedureName,
                        ProcedureDate: item.ProcedureDate,
                    };
                }));
            }
            else {
                newResultProcedureInfoDto = [{
                        Icd9: '',
                        ProcedureName: '',
                        ProcedureDate: '',
                    }];
            }
            let newResultInvestigationInfoDto = [];
            newResultInvestigationInfoDto = [{
                    InvestigationCode: '',
                    InvestigationGroup: '',
                    InvestigationName: '',
                    InvestigationResult: '',
                    ResultDateTime: ''
                }];
            let newResultOrderItemInfoDto = [];
            newResultOrderItemInfoDto = [{
                    ItemId: '',
                    ItemName: '',
                    ItemAmount: '',
                    Discount: '',
                    Initial: '',
                    LocalBillingCode: '',
                    LocalBillingName: '',
                    Location: '',
                    NetAmount: '',
                    SimbVersion: '',
                    Terminology: ''
                }];
            let newResultDoctorInfoDto = [];
            newResultDoctorInfoDto = [{
                    DoctorLicense: '0000000000',
                    DoctorRole: '',
                    DoctorFirstName: '',
                    DoctorLastName: '',
                }];
            let newTotalBillAmount = '';
            let newResultBillingInfoDto = [];
            const newQueryBillingInfoDtoDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN
            };
            const getPreBillingformDatabase = await this.utilsService.getPreBillingformDatabase(newQueryBillingInfoDtoDatabaseBodyDto);
            if (getPreBillingformDatabase && getPreBillingformDatabase.Result.PreBillingInfo && getPreBillingformDatabase.Result.PreBillingInfo.length > 0) {
                newResultBillingInfoDto = await Promise.all(getPreBillingformDatabase.Result.PreBillingInfo.map(async (item) => {
                    newTotalBillAmount = item.TotalBillAmount;
                    return {
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        SimbBillingCode: item.SimbBillingCode,
                        PayorBillingCode: item.PayorBillingCode,
                        BillingDiscount: item.BillingDiscount,
                        BillingInitial: item.BillingInitial,
                        BillingNetAmount: item.BillingNetAmount,
                    };
                }));
            }
            else {
                newResultBillingInfoDto = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                    }];
            }
            const newResultPSSInfoDto = {
                "Exclusion": "0",
                "FinalScore": "0",
                "Findings": [
                    {
                        "Description": "0",
                        "Exclusion": "0",
                        "Medical": "0",
                        "Reference": "0"
                    }
                ],
                "Id": "0",
                "Medical": "0"
            };
            let newResultPreAuthNoteDto = [];
            newResultPreAuthNoteDto = [{
                    PreAuthDatetime: '',
                    PreAuthDetail: '',
                }];
            const QueryCreateClaimDocumentDtoBody = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: 13,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
                DocumentName: '',
                DocumenttypeCode: '',
                UploadedBy: '',
                Runningdocument: 0
            };
            const getListDocumentByTransection = await this.utilsService.getListDocumentByTransactionNo(QueryCreateClaimDocumentDtoBody);
            let newResultAttachDocListInfoDto = [];
            newResultAttachDocListInfoDto = await Promise.all(getListDocumentByTransection.map(async (doc) => {
                const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
                return {
                    Base64Data: EncryptDocument,
                    DocName: doc.DocName,
                };
            }));
            const newIsPackage = newResultVisitInfoDto.IsPackage;
            const newAnesthesiaList = [newResultVisitInfoDto.AnesthesiaList];
            const newTotalEstimatedCost = newResultVisitInfoDto.TotalEstimatedCost;
            let newResultDataJsonDto = new result_submit_preauth_submission_dto_1.ResultDataJsonDto();
            newResultDataJsonDto = {
                Patient: newResultPatientInfoDto,
                Visit: newResultVisitInfoDto,
                VitalSign: newResultVitalSignInfoDto,
                Diagnosis: newQueryDiagnosisInfoDto,
                AccidentDetail: newAccidentDetail,
                Procedure: newResultProcedureInfoDto,
                AnesthesiaList: newAnesthesiaList,
                IsPackage: newIsPackage,
                Investigation: newResultInvestigationInfoDto,
                OrderItem: newResultOrderItemInfoDto,
                Doctor: newResultDoctorInfoDto,
                Billing: newResultBillingInfoDto,
                TotalEstimatedCost: newTotalEstimatedCost,
                TotalBillAmount: newTotalBillAmount,
                Pss: newResultPSSInfoDto,
                PreAuthNote: newResultPreAuthNoteDto
            };
            const newOPDDischargeResponseDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                Username: AIA_APIHopitalUsername,
                HospitalCode: await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey),
                InsurerCode: RequesetBody.xInsurerCode,
                ElectronicSignature: '',
                DataJsonType: "3",
                DataJson: newResultDataJsonDto,
                AttachDocList: newResultAttachDocListInfoDto
            };
            const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
            const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
            const apiURL = `${AIA_APIURL}/SmartClaim/preauthSubmission`;
            const body = newOPDDischargeResponseDto;
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
                let xInsuranceResult = new result_submit_preauth_submission_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                let xInsuranceData = new result_submit_preauth_submission_dto_1.InsuranceData();
                xInsuranceData = {
                    RefId: responsefromAIA.Data.RefId || '',
                    TransactionNo: responsefromAIA.Data.TransactionNo || '',
                    InsurerCode: responsefromAIA.Data.InsurerCode || '',
                    Message: responsefromAIA.Data.Message || '',
                    MessageTh: responsefromAIA.Data.MessageTh || '',
                    ClaimNo: responsefromAIA.Data.ClaimNo || '',
                    OccurrenceNo: responsefromAIA.Data.OccurrenceNo || '',
                    TotalApprovedAmount: responsefromAIA.Data.TotalApprovedAmount || '',
                    TotalExcessAmount: responsefromAIA.Data.TotalExcessAmount || '',
                    IsReimbursement: Boolean(responsefromAIA.Data.IsReimbursement),
                    CoverageList: responsefromAIA.Data.CoverageList
                        ? responsefromAIA.Data.CoverageList.map((Coverage) => ({
                            type: Coverage.type || '',
                            status: Boolean(Coverage.status),
                        }))
                        : [],
                    MessageList: responsefromAIA.Data.MessageList
                        ? responsefromAIA.Data.MessageList.map((message) => ({
                            policyNo: message.policyNo ? this.utilsService.DecryptAESECB(message.policyNo, AIA_APISecretkey) : '',
                            planName: message.planName || '',
                            messageTh: message.messageTh || '',
                            messageEn: message.messageEn || '',
                        }))
                        : [],
                };
                xResultInfo = {
                    InsuranceResult: xInsuranceResult,
                    InsuranceData: xInsuranceData
                };
                const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];
                if (existingRecord) {
                    await database_1.prismaProgest.transactionclaim.update({
                        where: {
                            id: existingRecord.id,
                        },
                        data: {
                            claimno: responsefromAIA.Data.ClaimNo,
                            occurrenceno: responsefromAIA.Data.OccurrenceNo,
                            invoicenumber: responsefromAIA.Data.InvoiceNumber,
                            totalapprovedamount: responsefromAIA.Data.TotalApprovedAmount,
                            totalexcessamount: responsefromAIA.Data.TotalExcessAmount,
                            isreimbursement: responsefromAIA.Data.IsReimbursement,
                            totalbillamount: newTotalBillAmount,
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefId,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            visitdate: formattedEffectiveDate,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                            runningdocument: RequesetBody.xRunningdocument
                        },
                    });
                }
                else {
                    await database_1.prismaProgest.transactionclaim.create({
                        data: {
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefId,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            visitdate: formattedEffectiveDate,
                            claimno: responsefromAIA.Data.ClaimNo,
                            occurrenceno: responsefromAIA.Data.OccurrenceNo,
                            invoicenumber: responsefromAIA.Data.InvoiceNumber,
                            totalapprovedamount: responsefromAIA.Data.TotalApprovedAmount,
                            totalexcessamount: responsefromAIA.Data.TotalExcessAmount,
                            isreimbursement: responsefromAIA.Data.IsReimbursement,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                            runningdocument: RequesetBody.xRunningdocument
                        },
                    });
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultSubmitIpdDischargeDto = new result_submit_preauth_submission_dto_1.ResultSubmitPreAuthSubmissionDto();
            newResultSubmitIpdDischargeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitIpdDischargeDto;
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
    async checkeligiblePreAdmission(queryPreauthSubmissionDto) {
        let RequesetBody, PreauthInfo, xResultInfo;
        try {
            RequesetBody = {
                xRefID: queryPreauthSubmissionDto.PatientInfo.RefId || '',
                xTransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo || '',
                xInsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                xHN: queryPreauthSubmissionDto.PatientInfo.HN || '',
                xVN: queryPreauthSubmissionDto.PatientInfo.VN || '',
                xPID: queryPreauthSubmissionDto.PatientInfo.PID || '',
                xPassportnumber: queryPreauthSubmissionDto.PatientInfo.PassportNumber || '',
                xGivenNameTH: queryPreauthSubmissionDto.PatientInfo.GivenNameTH || '',
                xSurnameTH: queryPreauthSubmissionDto.PatientInfo.SurnameTH || '',
                xDateOfBirth: queryPreauthSubmissionDto.PatientInfo.DateOfBirth || ''
            };
            const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                where: {
                    refid: RequesetBody.xRefId,
                    transactionno: RequesetBody.xTransactionNo,
                },
            });
            if (existingRecord) {
                PreauthInfo = {
                    xTransactionno: existingRecord.transactionno,
                    xRefid: existingRecord.refid,
                    xHN: existingRecord.hn,
                    xVN: existingRecord.vn,
                    xVisitDate: existingRecord.visitdate,
                    xVisitDateTime: existingRecord.visitdatetime,
                    xAccidentDate: existingRecord.accidentdate,
                    xPolicyTypeCode: existingRecord.policytypecode,
                    xSurgeryTypeCode: existingRecord.surgerytypecode,
                    xIdType: existingRecord.idtype,
                    xMembershipid: existingRecord.membershipid,
                    xPolicynumber: existingRecord.policynumber,
                    xCustomerid: existingRecord.customerid,
                    xIllnessTypeCode: existingRecord.illnesstypecode,
                    xPreauthReferClaimno: existingRecord.preauthreferclaimno,
                    xPreauthReferOCC: existingRecord.preauthreferocc,
                    xServiceSettingCode: "IPD",
                    xInsurerCode: 13,
                    xClaimno: existingRecord.claimno,
                    xOccurrenceno: existingRecord.occurrenceno
                };
                const xRefId = await this.checkEligibleService.generateRefId('PRE' + PreauthInfo.xVN, PreauthInfo.xInsurerCode, PreauthInfo.xServiceSettingCode);
                const xUsername = AIA_APIHopitalUsername;
                const xHospitalCode = await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey);
                const xInsurerCode = RequesetBody.xInsurerCode;
                const xElectronicSignature = '';
                const xDataJsonType = 3;
                let DataJson_Id;
                const xDataJson_IdType = PreauthInfo.xIdType;
                if (xDataJson_IdType === 'NATIONAL_ID') {
                    DataJson_Id = RequesetBody.xPID;
                }
                else if (xDataJson_IdType === 'PASSPORT') {
                    DataJson_Id = RequesetBody.xPassportnumber;
                }
                else if (xDataJson_IdType === 'MEMBERSHIP_ID') {
                    DataJson_Id = PreauthInfo.xMembershipid;
                }
                else if (xDataJson_IdType === 'POLICY_NUMBER') {
                    DataJson_Id = PreauthInfo.xPolicynumber;
                }
                else if (xDataJson_IdType === 'CUSTOMER_ID') {
                    DataJson_Id = PreauthInfo.xCustomerid;
                }
                else {
                    DataJson_Id = RequesetBody.xPID;
                }
                const xDataJson_Id = await this.utilsService.EncryptAESECB(DataJson_Id, AIA_APISecretkey);
                const xPolicyType = PreauthInfo.xPolicyTypeCode;
                const xServiceSetting = PreauthInfo.xServiceSettingCode;
                const xIllnessType = PreauthInfo.xIllnessTypeCode;
                const xSurgeryType = PreauthInfo.xSurgeryTypeCode;
                let xFirstName = RequesetBody.xGivenNameTH;
                if (xFirstName) {
                    xFirstName = await this.utilsService.EncryptAESECB(xFirstName, AIA_APISecretkey);
                }
                let xLastName = RequesetBody.xSurnameTH;
                if (xLastName) {
                    xLastName = await this.utilsService.EncryptAESECB(xLastName, AIA_APISecretkey);
                }
                let xDob = RequesetBody.xDateOfBirth;
                if (xDob) {
                    xDob = await this.utilsService.EncryptAESECB(xDob, AIA_APISecretkey);
                }
                const xVisitDateTime = PreauthInfo.xVisitDateTime || '';
                const xAccidentDate = PreauthInfo.xAccidentDate || '';
                const body_DataJson = {
                    IdType: xDataJson_IdType,
                    Id: xDataJson_Id,
                    PolicyType: xPolicyType,
                    ServiceSetting: xServiceSetting,
                    IllnessType: xIllnessType,
                    SurgeryType: xSurgeryType,
                    Patient: {
                        FirstName: xFirstName,
                        LastName: xLastName,
                        Dob: xDob,
                    },
                    Visit: {
                        VisitDateTime: xVisitDateTime,
                        AccidentDate: xAccidentDate || ''
                    }
                };
                const body = {
                    RefId: xRefId,
                    Username: xUsername,
                    HospitalCode: xHospitalCode,
                    InsurerCode: xInsurerCode,
                    ElectronicSignature: xElectronicSignature,
                    DataJsonType: xDataJsonType,
                    DataJson: body_DataJson
                };
                const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
                const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
                const apiURL = `${AIA_APIURL}/SmartClaim/checkEligible`;
                const headers = {
                    'Content-Type': API_CONTENTTYPE,
                    'Ocp-Apim-Subscription-Key': AIA_APISubscription,
                    'Apim-Auth-Secure-Token': ObjAccessTokenKey
                };
                const responsefromAIA = await (0, rxjs_1.lastValueFrom)(this.httpService.post(apiURL, body, { headers }));
                const responeInputcode = responsefromAIA.data.Result.Code;
                if (responeInputcode !== 'S') {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, responsefromAIA.data.Result.MessageTh, responsefromAIA.data.Result.MessageTh);
                }
                else {
                    let xInsuranceResult = new result_submit_preauth_submission_dto_1.InsuranceResult();
                    xInsuranceResult = {
                        Code: responsefromAIA.data.Result.Code || '',
                        Message: responsefromAIA.data.Result.Message || '',
                        MessageTh: responsefromAIA.data.Result.MessageTh || '',
                    };
                    const xMessageList = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.flatMap((coverageItem) => {
                        return coverageItem.MessageList.map((item) => {
                            const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
                            return {
                                PolicyNo: decryptedPolicyNo,
                                PlanName: item.PlanName,
                                MessageTh: item.MessageTh,
                                MessageEn: item.MessageEn,
                                RuleNo: item.RuleNo
                            };
                        });
                    }) : [];
                    const xCoverageList = responsefromAIA.data.Data.CoverageList ? responsefromAIA.data.Data.CoverageList.map((item) => {
                        const convertCoverageType = this.checkEligibleService.convertCoverageListType(item.Type);
                        return {
                            Type: convertCoverageType,
                            Status: item.Status,
                            MessageList: Array.isArray(xMessageList) ? xMessageList : [],
                        };
                    }) : [];
                    const xPolicyInfoList = responsefromAIA.data.Data.PolicyInfoList ? responsefromAIA.data.Data.PolicyInfoList.map((item) => {
                        const decryptedPolicyNo = this.utilsService.DecryptAESECB(item.PolicyNo, AIA_APISecretkey) || '';
                        const decryptedMembershipNo = this.utilsService.DecryptAESECB(item.MembershipNo, AIA_APISecretkey) || '';
                        const effectiveDate = new Date(item.EffectiveDate);
                        const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];
                        return {
                            PolicyNo: decryptedPolicyNo,
                            MembershipNo: decryptedMembershipNo,
                            PolicyDescription: item.PolicyDescription,
                            EffectiveDate: formattedEffectiveDate,
                            Remark1: item.Remark1,
                            Remark2: item.Remark2,
                            SpecialRemark1: item.SpecialRemark1,
                            SpecialRemark2: item.SpecialRemark2
                        };
                    }) : [];
                    let xInsuranceData = new result_check_eligible_preadmission_dto_1.InsuranceEligibleData();
                    xInsuranceData = {
                        RefId: responsefromAIA.data.Data.RefId || '',
                        TransactionNo: responsefromAIA.data.Data.TransactionNo || '',
                        InsurerCode: responsefromAIA.data.Data.InsurerCode || '',
                        CoverageClaimStatus: Boolean(responsefromAIA.data.Data.CoverageClaimStatus) || false,
                        RemarkList: [],
                        PolicyCoverageDesc: [],
                        CoverageList: Array.isArray(xCoverageList) ? xCoverageList : [],
                        PolicyInfoList: Array.isArray(xPolicyInfoList) ? xPolicyInfoList : []
                    };
                    let xinsuranceCustomerDetail = new result_check_eligible_preadmission_dto_1.InsuranceCustomerDetail();
                    xinsuranceCustomerDetail = {
                        PolicyNo: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.PolicyNo, AIA_APISecretkey) || '',
                        MemberShipId: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.MemberShipId, AIA_APISecretkey) || '',
                        FirstName: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.FirstName, AIA_APISecretkey) || '',
                        LastName: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.LastName, AIA_APISecretkey) || '',
                        NationalId: await this.utilsService.DecryptAESECB(responsefromAIA.data.CustomerDetail.NationalId, AIA_APISecretkey) || '',
                    };
                    xResultInfo = {
                        InsuranceResult: xInsuranceResult,
                        InsuranceData: xInsuranceData,
                        InsuranceCustomerDetail: xinsuranceCustomerDetail
                    };
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    if (xInsuranceData.CoverageClaimStatus = true) {
                        const existingRecordTransactionc = await database_1.prismaProgest.transactionclaim.findFirst({
                            where: {
                                refid: xInsuranceData.RefId,
                            },
                        });
                        if (!existingRecordTransactionc) {
                            await database_1.prismaProgest.transactionclaim.create({
                                data: {
                                    visitdate: PreauthInfo.xVisitDate,
                                    insurerid: 13,
                                    refid: xInsuranceData.RefId,
                                    transactionno: xInsuranceData.TransactionNo,
                                    hn: RequesetBody.xHN,
                                    vn: RequesetBody.xVN,
                                    idtype: PreauthInfo.xIdType,
                                    servicesettingcode: 'IPD',
                                    policytypecode: PreauthInfo.xPolicyTypeCode,
                                    illnesstypecode: PreauthInfo.xIllnessTypeCode,
                                    surgerytypecode: PreauthInfo.xSurgeryTypeCode,
                                    preauthreferclaimno: PreauthInfo.xClaimno,
                                    preauthreferocc: PreauthInfo.xOccurrenceno,
                                    visitdatetime: PreauthInfo.xVisitDateTime,
                                    accidentdate: PreauthInfo.xAccidentDate,
                                    runningdocument: 0,
                                    membershipid: PreauthInfo.xMembershipid,
                                    policynumber: PreauthInfo.xPolicynumber,
                                    customerid: PreauthInfo.xCustomerid,
                                    claimstatusdesc: 'waitting for discharge',
                                    claimstatusdesc_en: 'waitting for discharge',
                                    claimstatusdesc_th: 'รอการส่งเคลม',
                                },
                            });
                        }
                        else {
                            if (existingRecordTransactionc) {
                                await database_1.prismaProgest.transactionclaim.delete({
                                    where: { id: existingRecordTransactionc.id },
                                });
                                await database_1.prismaProgest.transactionclaim.create({
                                    data: {
                                        visitdate: PreauthInfo.xVisitDate,
                                        insurerid: 13,
                                        refid: xInsuranceData.RefId,
                                        transactionno: xInsuranceData.TransactionNo,
                                        hn: RequesetBody.xHN,
                                        vn: RequesetBody.xVN,
                                        idtype: PreauthInfo.xIdType,
                                        servicesettingcode: 'IPD',
                                        policytypecode: PreauthInfo.xPolicyTypeCode,
                                        illnesstypecode: PreauthInfo.xIllnessTypeCode,
                                        surgerytypecode: PreauthInfo.xSurgeryTypeCode,
                                        preauthreferclaimno: PreauthInfo.xClaimno,
                                        preauthreferocc: PreauthInfo.xOccurrenceno,
                                        visitdatetime: PreauthInfo.xVisitDateTime,
                                        accidentdate: PreauthInfo.xAccidentDate,
                                        runningdocument: 0,
                                        membershipid: PreauthInfo.xMembershipid,
                                        policynumber: PreauthInfo.xPolicynumber,
                                        customerid: PreauthInfo.xCustomerid,
                                        claimstatusdesc: 'waitting for discharge',
                                        claimstatusdesc_en: 'waitting for discharge',
                                        claimstatusdesc_th: 'รอการส่งเคลม',
                                    },
                                });
                            }
                        }
                    }
                }
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'TransactionNo not found', 'TransactionNo not found');
            }
            let newResultCheckeligiblePreAdmissionDto = new result_check_eligible_preadmission_dto_1.ResultCheckeligiblePreAdmissionDto();
            newResultCheckeligiblePreAdmissionDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultCheckeligiblePreAdmissionDto;
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
    async ReviewPreAuth(queryPreauthSubmissionDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryPreauthSubmissionDto.PatientInfo.RefId,
                xTransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                xHN: queryPreauthSubmissionDto.PatientInfo.HN,
                xInsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                xVN: queryPreauthSubmissionDto.PatientInfo.VN
            };
            const getOPDDischargePatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
            let newResultReviewPatientInfoDto;
            if (getOPDDischargePatient && getOPDDischargePatient.PatientInfo && getOPDDischargePatient.PatientInfo.HN.length > 0) {
                let convertgender = getOPDDischargePatient.PatientInfo.Gender;
                if (convertgender === 'F') {
                    convertgender = 'Female';
                }
                else {
                    convertgender = 'Male';
                }
                newResultReviewPatientInfoDto = {
                    Dob: getOPDDischargePatient.PatientInfo.Dob,
                    Hn: getOPDDischargePatient.PatientInfo.HN,
                    Gender: convertgender
                };
            }
            else {
                newResultReviewPatientInfoDto = {
                    Dob: '',
                    Hn: '',
                    Gender: ''
                };
            }
            const newQueryVisitDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
            };
            const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto);
            const newResultReviewVisitInfoDto = {
                FurtherClaimId: getvisitformDatabase.Result.VisitInfo.FurtherClaimId || '',
                AccidentCauseOver45Days: getvisitformDatabase.Result.VisitInfo.AccidentCauseOver45Days || '',
                AdditionalNote: getvisitformDatabase.Result.VisitInfo.AdditionalNote || '',
                AlcoholRelated: getvisitformDatabase.Result.VisitInfo.AlcoholRelated || false,
                ChiefComplaint: getvisitformDatabase.Result.VisitInfo.ChiefComplaint || '',
                ComaScore: getvisitformDatabase.Result.VisitInfo.ComaScore || '',
                DxFreeText: getvisitformDatabase.Result.VisitInfo.DxFreeText || '',
                ExpectedDayOfRecovery: getvisitformDatabase.Result.VisitInfo.ExpectedDayOfRecovery || '',
                Height: getvisitformDatabase.Result.VisitInfo.Height || '',
                PhysicalExam: getvisitformDatabase.Result.VisitInfo.PhysicalExam || '',
                PlanOfTreatment: getvisitformDatabase.Result.VisitInfo.PlanOfTreatment || '',
                Pregnant: getvisitformDatabase.Result.VisitInfo.Pregnant || false,
                PresentIllness: getvisitformDatabase.Result.VisitInfo.PresentIllness || '',
                PreviousTreatmentDate: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDate || '',
                PreviousTreatmentDetail: getvisitformDatabase.Result.VisitInfo.PreviousTreatmentDetail || '',
                PrivateCase: getvisitformDatabase.Result.VisitInfo.PrivateCase || false,
                ProcedureFreeText: getvisitformDatabase.Result.VisitInfo.ProcedureFreeText,
                SignSymptomsDate: getvisitformDatabase.Result.VisitInfo.SignSymptomsDate || '',
                UnderlyingCondition: getvisitformDatabase.Result.VisitInfo.UnderlyingCondition || '',
                VisitDateTime: getvisitformDatabase.Result.VisitInfo.VisitDateTime,
                VN: getvisitformDatabase.Result.VisitInfo.VN || '',
                Weight: getvisitformDatabase.Result.VisitInfo.Weight || ''
            };
            const getOPDDischargeVitalSign = await this.trakcareService.getOPDDischargeVitalSign(RequesetBody.xVN);
            let newResultReviewVitalSignInfoDto = [];
            if (getOPDDischargeVitalSign && getOPDDischargeVitalSign.VitalSignInfo && getOPDDischargeVitalSign.VitalSignInfo.length > 0) {
                newResultReviewVitalSignInfoDto = await Promise.all(getOPDDischargeVitalSign.VitalSignInfo.map(async (item) => {
                    return {
                        DiastolicBp: +item.DiastolicBp,
                        HeartRate: +item.HeartRate,
                        OxygenSaturation: +item.OxygenSaturation,
                        PainScore: +item.PainScore,
                        RespiratoryRate: +item.RespiratoryRate,
                        SystolicBp: +item.SystolicBp,
                        Temperature: +parseFloat(item.Temperature).toFixed(2),
                        VitalSignEntryDateTime: item.VitalSignEntryDateTime,
                    };
                }));
            }
            else {
                newResultReviewVitalSignInfoDto = [{
                        DiastolicBp: '',
                        HeartRate: '',
                        OxygenSaturation: '',
                        PainScore: '',
                        RespiratoryRate: '',
                        SystolicBp: '',
                        Temperature: '',
                        VitalSignEntryDateTime: '',
                    }];
            }
            const getOPDDischargeDiagnosis = await this.trakcareService.getOPDDischargeDiagnosis(RequesetBody.xVN);
            let getDiagnosisTypeMapping;
            let newResultReviewDiagnosisInfoDto = [];
            if (getOPDDischargeDiagnosis && getOPDDischargeDiagnosis.DiagnosisInfo && getOPDDischargeDiagnosis.DiagnosisInfo.length > 0) {
                newResultReviewDiagnosisInfoDto = await Promise.all(getOPDDischargeDiagnosis.DiagnosisInfo.map(async (item) => {
                    getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping('' + RequesetBody.xInsurerCode, item.DxTypeCode);
                    if (item.DxTypeCode === getDiagnosisTypeMapping.dxtypecodetrakcare) {
                        item.DxTypeCode = getDiagnosisTypeMapping.dxtypecodeinsurance;
                    }
                    return {
                        DxName: item.DxName,
                        DxType: item.Dxtypenameinsurance,
                        Icd10: item.DxCode,
                    };
                }));
            }
            else {
                newResultReviewDiagnosisInfoDto = [{
                        DxName: '',
                        DxType: '',
                        Icd10: '',
                    }];
            }
            let newResultProcedureDatabaseInfoDto = [];
            let newQueryProcedeureDatabaseBodyDto = new result_procedure_databse_dto_1.QueryProcedeureDatabaseBodyDto();
            newQueryProcedeureDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
            };
            const getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
            if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
                newResultProcedureDatabaseInfoDto = await Promise.all(getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
                    return {
                        Icd9: item.Icd9,
                        ProcedureName: item.ProcedureName,
                        ProcedureDate: item.ProcedureDate,
                    };
                }));
            }
            else {
                newResultProcedureDatabaseInfoDto = [{
                        Icd9: '',
                        ProcedureName: '',
                        ProcedureDate: '',
                    }];
            }
            let newQueryAccidentDatabaseBodyDto = new result_accident_databse_dto_1.QueryAccidentDatabaseBodyDto();
            newQueryAccidentDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
            };
            const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
            const accidentDetailInfo = new review_preauth_submission_dto_1.AccidentDetailDto();
            accidentDetailInfo.AccidentPlace = accidentDatabase.Result.AccidentDetailInfo.AccidentPlace || '';
            accidentDetailInfo.AccidentDate = accidentDatabase.Result.AccidentDetailInfo.AccidentDate || '';
            if (accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail) {
                accidentDetailInfo.CauseOfInjuryDetail = accidentDatabase.Result.AccidentDetailInfo.CauseOfInjuryDetail.map(cause => {
                    const causeDetail = new result_accident_databse_dto_1.CauseOfInjuryDetail();
                    causeDetail.CauseOfInjury = cause.CauseOfInjury || '';
                    causeDetail.CommentOfInjury = cause.CommentOfInjury || '';
                    return causeDetail;
                });
            }
            if (accidentDatabase.Result.AccidentDetailInfo.InjuryDetail) {
                accidentDetailInfo.InjuryDetail = accidentDatabase.Result.AccidentDetailInfo.InjuryDetail.map(injury => {
                    const injuryDetail = new result_accident_databse_dto_1.InjuryDetail();
                    injuryDetail.WoundType = injury.WoundType || '';
                    injuryDetail.InjurySide = injury.InjurySide || '';
                    injuryDetail.InjuryArea = injury.InjuryArea || '';
                    return injuryDetail;
                });
            }
            let newResultReviewInvestigationInfoDto = [];
            const getIPDInvestigation = await this.trakcareService.getIPDInvestigation(RequesetBody.xVN);
            if (getIPDInvestigation && getIPDInvestigation.InvestigationInfo && getIPDInvestigation.InvestigationInfo.length > 0) {
                newResultReviewInvestigationInfoDto = await Promise.all(getIPDInvestigation.InvestigationInfo.map(async (item) => {
                    return {
                        InvestigationCode: item.InvestigationCode,
                        InvestigationGroup: item.InvestigationGroup,
                        InvestigationName: item.InvestigationName,
                        InvestigationResult: item.InvestigationResult,
                        ResultDateTime: item.ResultDateTime,
                    };
                }));
            }
            else {
                newResultReviewInvestigationInfoDto = [{
                        InvestigationCode: '',
                        InvestigationGroup: '',
                        InvestigationName: '',
                        InvestigationResult: '',
                        ResultDateTime: ''
                    }];
            }
            let newResultReviewOrderItemInfoDto = [];
            const getOPDDischargeOrderItem = await this.trakcareService.getOPDDischargeOrderItem(RequesetBody.xVN);
            if (getOPDDischargeOrderItem && getOPDDischargeOrderItem.OrderItemInfo && getOPDDischargeOrderItem.OrderItemInfo.length > 0) {
                newResultReviewOrderItemInfoDto = await Promise.all(getOPDDischargeOrderItem.OrderItemInfo.map(async (item) => {
                    return {
                        ItemId: item.ItemId,
                        ItemName: item.ItemName,
                        ItemAmount: item.ItemAmount,
                        Discount: item.Discount,
                        Initial: item.Initial,
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        Location: item.Location,
                        NetAmount: item.NetAmount,
                        SimbVersion: item.SimbVersion,
                        Terminology: item.Terminology,
                    };
                }));
            }
            else {
                newResultReviewOrderItemInfoDto = [{
                        ItemId: '',
                        ItemName: '',
                        ItemAmount: '',
                        Discount: '',
                        Initial: '',
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        Location: '',
                        NetAmount: '',
                        SimbVersion: '',
                        Terminology: ''
                    }];
            }
            let newResultReviewDoctorInfoDto = [];
            const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(RequesetBody.xVN);
            if (getOPDDischargeDoctor && getOPDDischargeDoctor.DoctorInfo && getOPDDischargeDoctor.DoctorInfo.length > 0) {
                newResultReviewDoctorInfoDto = await Promise.all(getOPDDischargeDoctor.DoctorInfo.map(async (item) => {
                    return {
                        DoctorLicense: item.DoctorLicense.toString().padStart(10, '0'),
                        DoctorRole: item.DoctorRole,
                        DoctorFirstName: item.DoctorFirstName,
                        DoctorLastName: ''
                    };
                }));
            }
            else {
                newResultReviewDoctorInfoDto = [{
                        DoctorLicense: '',
                        DoctorRole: '',
                        DoctorFirstName: '',
                        DoctorLastName: '',
                    }];
            }
            let newResultReviewBillingInfoDto = [];
            let newTotalBillAmount;
            let newInvoiceNumber;
            const getOPDDischargeBilling = await this.trakcareService.getOPDDischargeBilling(RequesetBody.xVN);
            if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
                newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount;
                newInvoiceNumber = getOPDDischargeBilling.InvoiceNumber;
                newResultReviewBillingInfoDto = await Promise.all(getOPDDischargeBilling.BillingInfo.map(async (item) => {
                    return {
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        SimbBillingCode: item.SimbBillingCode,
                        PayorBillingCode: item.PayorBillingCode,
                        BillingInitial: item.BillingInitial,
                        BillingDiscount: item.BillingDiscount,
                        BillingNetAmount: item.BillingNetAmount,
                    };
                }));
            }
            else {
                newResultReviewBillingInfoDto = [{
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                        BillingInitial: '',
                        BillingDiscount: '',
                        BillingNetAmount: '',
                    }];
                newTotalBillAmount = 0;
            }
            const whereConditions = {
                ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
                ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
                ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
            };
            const existingConcurrentNoteRecord = await database_1.prismaProgest.concurrentnotetransactions.findFirst({
                where: whereConditions
            });
            let newQueryConcurNote = [];
            if (existingConcurrentNoteRecord) {
                const newQueryConcurrentNoteDatabaseBodyDto = {
                    RefId: queryPreauthSubmissionDto.PatientInfo.RefId,
                    TransactionNo: queryPreauthSubmissionDto.PatientInfo.TransactionNo,
                    InsurerCode: queryPreauthSubmissionDto.PatientInfo.InsurerCode,
                    HN: queryPreauthSubmissionDto.PatientInfo.HN,
                    VN: queryPreauthSubmissionDto.PatientInfo.VN
                };
                const getConcurNoteformDatabase = await this.utilsService.getConcurNoteformDatabase(newQueryConcurrentNoteDatabaseBodyDto);
                if (getConcurNoteformDatabase && getConcurNoteformDatabase.Result.ConcurNoteList && getConcurNoteformDatabase.Result.ConcurNoteList.length > 0) {
                    newQueryConcurNote = await Promise.all(getConcurNoteformDatabase.Result.ConcurNoteList.map(async (item) => {
                        return {
                            ConcurrentDatetime: item.ConcurrentDatetime,
                            ConcurrentDetail: item.ConcurrentDetail,
                        };
                    }));
                }
                else {
                    newQueryConcurNote = [{
                            ConcurrentDatetime: '',
                            ConcurrentDetail: '',
                        }];
                }
            }
            else {
                newQueryConcurNote = [{
                        ConcurrentDatetime: '',
                        ConcurrentDetail: '',
                    }];
            }
            let newResultReviewDataJsonDto = new review_preauth_submission_dto_2.ResultReviewDataJsonDto();
            newResultReviewDataJsonDto = {
                Patient: newResultReviewPatientInfoDto,
                Visit: newResultReviewVisitInfoDto,
                VitalSign: newResultReviewVitalSignInfoDto,
                Diagnosis: newResultReviewDiagnosisInfoDto,
                AccidentDetail: accidentDetailInfo,
                Procedure: newResultProcedureDatabaseInfoDto,
                Investigation: newResultReviewInvestigationInfoDto,
                OrderItem: newResultReviewOrderItemInfoDto,
                Doctor: newResultReviewDoctorInfoDto,
                Billing: newResultReviewBillingInfoDto,
                TotalBillAmount: newTotalBillAmount,
                InvoiceNumber: newInvoiceNumber,
                Note: newQueryConcurNote
            };
            let xInsuranceResult = new result_submit_preauth_submission_dto_1.InsuranceResult();
            xInsuranceResult = {
                Code: '200',
                Message: 'sucess',
                MessageTh: 'test'
            };
            xResultInfo = {
                InsuranceResult: xInsuranceResult,
                InsuranceData: newResultReviewDataJsonDto
            };
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultReviewOpdDischargeDto = new review_preauth_submission_dto_2.ResultReviewOpdDischargeDto();
            newResultReviewOpdDischargeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultReviewOpdDischargeDto;
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
    async getICDDx(xICDDxCode) {
        let arrayICDDxInfo;
        const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
        try {
            const TrakcareICDDxInfo = await this.trakcareService.getICDDx(xICDDxCode);
            if (TrakcareICDDxInfo.ICDDxInfo) {
                arrayICDDxInfo = {
                    ICDDxInfo: TrakcareICDDxInfo.ICDDxInfo.map((item) => ({
                        ICDDxId: item.ICDDxId,
                        ICDDxCode: item.ICDDxCode,
                        ICDDx: item.ICDDx,
                    }))
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                arrayICDDxInfo = [{
                        ICDDxId: '',
                        ICDDxCode: '',
                        ICDDx: '',
                    }];
                this.addFormatHTTPStatus(newHttpMessageDto, 400, '', '');
            }
            let newResultlistBillingCheckBalanceDto = new result_ICDDx_dto_1.ResultlistICDDxInfoDto();
            newResultlistBillingCheckBalanceDto = {
                HTTPStatus: newHttpMessageDto,
                Result: arrayICDDxInfo
            };
            return newResultlistBillingCheckBalanceDto;
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
    async getICD9(xICD9Code) {
        let arrayICD9Info;
        const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
        try {
            const TrakcareICD9Info = await this.trakcareService.getICD9(xICD9Code);
            if (TrakcareICD9Info.ObjICD9Info) {
                arrayICD9Info = {
                    ICD9Info: TrakcareICD9Info.ObjICD9Info.map((item) => ({
                        ICD9Id: item.ICD9Id,
                        ICD9Code: item.ICD9Code,
                        ICD9Desc: item.ICD9Desc,
                    }))
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                arrayICD9Info = [{
                        ICD9Id: '',
                        ICD9Code: '',
                        ICD9Desc: '',
                    }];
                this.addFormatHTTPStatus(newHttpMessageDto, 400, '', '');
            }
            let newResultlistBillingCheckBalanceDto = new result_ICD9_dto_1.ResultlistICD9InfoDto();
            newResultlistBillingCheckBalanceDto = {
                HTTPStatus: newHttpMessageDto,
                Result: arrayICD9Info
            };
            return newResultlistBillingCheckBalanceDto;
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
    async getBillingSubgroup(xBillingCode) {
        let arrayBillingSubInfo;
        const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
        try {
            const TrakcareBillingSubInfo = await this.trakcareService.getBillingSubgroup(xBillingCode);
            if (TrakcareBillingSubInfo.ObjBillingSubInfo) {
                arrayBillingSubInfo = {
                    BillingSubInfo: TrakcareBillingSubInfo.ObjBillingSubInfo.map((item) => ({
                        LocalBillingId: item.LocalBillingId,
                        LocalBillingCode: item.LocalBillingCode,
                        LocalBillingName: item.LocalBillingName,
                        SimbBillingCode: item.SimbBillingCode,
                        PayorBillingCode: item.PayorBillingCode,
                    }))
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                arrayBillingSubInfo = [{
                        LocalBillingId: '',
                        LocalBillingCode: '',
                        LocalBillingName: '',
                        SimbBillingCode: '',
                        PayorBillingCode: '',
                    }];
                this.addFormatHTTPStatus(newHttpMessageDto, 400, '', '');
            }
            let newResultBillingSubInfoDto = new result_BillingSub_dto_1.ResultBillingSubInfoDto();
            newResultBillingSubInfoDto = {
                HTTPStatus: newHttpMessageDto,
                Result: arrayBillingSubInfo
            };
            return newResultBillingSubInfoDto;
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
    async convertDxTypeCode(inputInsurerCode, inputdxTypeCodeTrakcare) {
        const convertDxtypename = await this.utilsService.getDiagnosisTypeMapping(inputInsurerCode, inputdxTypeCodeTrakcare);
        return convertDxtypename;
    }
    calculateDaysBetweenDates(startDate, endDate) {
        const start = new Date(startDate.split(' ')[0]);
        const end = new Date(endDate.split(' ')[0]);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Invalid date format. Please use a valid date string (e.g., 'YYYY-MM-DD').");
        }
        const differenceInMilliseconds = end.getTime() - start.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return Math.ceil(differenceInDays) === 0 ? 1 : differenceInDays;
    }
    ReplaceSpacialCharacter(inputString) {
        const SpacialCharacter = {
            '-': '',
            '+': '',
            '*': '',
            '&': '',
            '^': '',
            '$': '',
            '#': '',
            '%': '',
            '@': '',
            ';': '',
            '!': '',
            ':': '',
            '{': '',
            '}': ''
        };
        const newinputString = inputString.replace(/[-+*&^$#%@;{}:!]/g, m => SpacialCharacter[m]);
        return newinputString;
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
exports.PreauthSubmissionService = PreauthSubmissionService;
exports.PreauthSubmissionService = PreauthSubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService,
        utils_service_1.UtilsService,
        check_eligible_service_1.CheckEligibleService])
], PreauthSubmissionService);
//# sourceMappingURL=preauth-submission.service.js.map