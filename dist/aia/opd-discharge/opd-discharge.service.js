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
exports.OpdDischargeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
const result_vitalsign_opd_discharge_dto_1 = require("./dto/result-vitalsign-opd-discharge.dto");
const result_doctor_opd_discharge_dto_1 = require("./dto/result-doctor-opd-discharge.dto");
const result_diagnosis_opd_discharge_dto_1 = require("./dto/result-diagnosis-opd-discharge.dto");
const result_investigation_opd_discharge_dto_1 = require("./dto/result-investigation-opd-discharge.dto");
const result_orderitem_opd_discharge_dto_1 = require("./dto/result-orderitem-opd-discharge.dto");
const result_billing_opd_discharge_dto_1 = require("./dto/result-billing-opd-discharge.dto");
const result_procedure_opd_discharge_dto_1 = require("./dto/result-procedure-opd-discharge.dto");
const result_accident_opd_discharge_dto_1 = require("./dto/result-accident-opd-discharge.dto");
const result_visit_opd_discharge_dto_1 = require("./dto/result-visit-opd-discharge.dto");
const result_submit_opd_discharge_dto_1 = require("./dto/result-submit-opd-discharge.dto");
const query_procedure_opd_discharge_dto_1 = require("./dto/query-procedure-opd-discharge.dto");
const query_accident_opd_discharge_dto_1 = require("./dto/query-accident-opd-discharge.dto");
const review_opd_discharge_dto_1 = require("./dto/review-opd-discharge.dto");
const result_procedure_databse_dto_1 = require("../../utils/dto/result-procedure-databse.dto");
const result_accident_databse_dto_1 = require("../../utils/dto/result-accident-databse.dto");
const query_updatefurtherclaimvn_opd_discharge_dto_1 = require("./dto/query-updatefurtherclaimvn-opd-discharge.dto");
const result_listclaim_opd_discharge_dto_1 = require("./dto/result-listclaim-opd-discharge.dto");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let OpdDischargeService = class OpdDischargeService {
    constructor(httpService, trakcareService, utilsService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
        this.utilsService = utilsService;
    }
    async getOPDDischargeVisit(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const newQueryVisitDatabaseBodyDto = {
                RefId: queryOpdDischargeDto.PatientInfo.RefId,
                TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
                InsurerCode: queryOpdDischargeDto.PatientInfo.InsurerCode,
                HN: queryOpdDischargeDto.PatientInfo.HN,
                VN: queryOpdDischargeDto.PatientInfo.VN,
            };
            const existingTransaction = await database_1.prismaProgest.transactionclaim.findFirst({
                where: {
                    refid: queryOpdDischargeDto.PatientInfo.RefId,
                    transactionno: queryOpdDischargeDto.PatientInfo.TransactionNo,
                },
            });
            let xAccidentcauseover45days = '';
            if (existingTransaction?.accidentcauseover45days) {
                xAccidentcauseover45days = existingTransaction.accidentcauseover45days;
            }
            else {
                xAccidentcauseover45days = '';
            }
            const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto);
            if (getvisitformDatabase?.Result?.VisitInfo?.VisitDateTime?.length > 0) {
                const newResultReviewVisitInfoDto = {
                    FurtherClaimId: getvisitformDatabase.Result.VisitInfo.FurtherClaimId || '',
                    AccidentCauseOver45Days: getvisitformDatabase.Result.VisitInfo.AccidentCauseOver45Days || '',
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
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                xResultInfo = {
                    VisitInfo: newResultReviewVisitInfoDto,
                };
            }
            else {
                const FurtherClaimVN = queryOpdDischargeDto.PatientInfo.FurtherClaimVN;
                if (FurtherClaimVN) {
                    queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN;
                }
                const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeVisit(queryOpdDischargeDto.PatientInfo.VN);
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
                    };
                    xResultInfo = {
                        VisitInfo: xQueryVisit,
                    };
                }
                else {
                    if (FurtherClaimVN) {
                        const getVisitDateTimeCurrentVN = await this.trakcareService.getEpisodeInfoByVN(queryOpdDischargeDto.PatientInfo.VN);
                        const CurrentVisitDateTime = getVisitDateTimeCurrentVN?.VisitInfo?.VisitDateTime;
                        TrakcarepatientInfo.VisitInfo.VisitDateTime = CurrentVisitDateTime;
                    }
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    const xQueryVisit = TrakcarepatientInfo.VisitInfo ? {
                        FurtherClaimId: TrakcarepatientInfo.VisitInfo.FurtherClaimId || '',
                        AccidentCauseOver45Days: xAccidentcauseover45days,
                        AdditionalNote: TrakcarepatientInfo.VisitInfo.AdditionalNote || '',
                        AlcoholRelated: Boolean(TrakcarepatientInfo.VisitInfo.AlcoholRelated) || false,
                        ChiefComplaint: TrakcarepatientInfo.VisitInfo.ChiefComplaint.slice(0, 200) || '',
                        ComaScore: TrakcarepatientInfo.VisitInfo.ComaScore || '',
                        DxFreeText: TrakcarepatientInfo.VisitInfo.DxFreeText.slice(0, 200) || '',
                        ExpectedDayOfRecovery: TrakcarepatientInfo.VisitInfo.ExpectedDayOfRecovery || '',
                        Height: TrakcarepatientInfo.VisitInfo.Height || '',
                        PhysicalExam: TrakcarepatientInfo.VisitInfo.PhysicalExam.slice(0, 1000) || '',
                        PlanOfTreatment: TrakcarepatientInfo.VisitInfo.PlanOfTreatment.slice(0, 500) || '',
                        Pregnant: Boolean(TrakcarepatientInfo.VisitInfo.Pregnant) || false,
                        PresentIllness: TrakcarepatientInfo.VisitInfo.PresentIllness.slice(0, 500) || '',
                        PreviousTreatmentDate: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDate || '',
                        PreviousTreatmentDetail: TrakcarepatientInfo.VisitInfo.PreviousTreatmentDetail.slice(0, 20) || '',
                        PrivateCase: Boolean(TrakcarepatientInfo.VisitInfo.PrivateCase) || false,
                        ProcedureFreeText: TrakcarepatientInfo.VisitInfo.ProcedureFreeText.slice(0, 500) || '',
                        SignSymptomsDate: TrakcarepatientInfo.VisitInfo.SignSymptomsDate || '',
                        UnderlyingCondition: TrakcarepatientInfo.VisitInfo.UnderlyingCondition || '',
                        VisitDateTime: TrakcarepatientInfo.VisitInfo.VisitDateTime || '',
                        Vn: TrakcarepatientInfo.VisitInfo.Vn || '',
                        Weight: TrakcarepatientInfo.VisitInfo.Weight || '',
                    } : {};
                    xResultInfo = {
                        VisitInfo: xQueryVisit,
                    };
                }
            }
            let newResultOpdDischargeVisitDto = new result_visit_opd_discharge_dto_1.ResultOpdDischargeVisitDto();
            newResultOpdDischargeVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeVisitDto;
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
    async getOPDDischargeVitalSign(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeVitalSign(queryOpdDischargeDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryVitalSign = {
                    DiastolicBp: '',
                    HeartRate: '',
                    OxygenSaturation: '',
                    PainScore: '',
                    RespiratoryRate: '',
                    SystolicBp: '',
                    Temperature: '',
                    VitalSignEntryDateTime: '',
                };
                xResultInfo = {
                    VitalSignInfo: [xQueryVitalSign],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryVitalSign = TrakcarepatientInfo.VitalSignInfo ? TrakcarepatientInfo.VitalSignInfo.map((item) => {
                    return {
                        DiastolicBp: item.DiastolicBp || '',
                        HeartRate: item.HeartRate || '',
                        OxygenSaturation: item.OxygenSaturation || '',
                        PainScore: item.PainScore || '',
                        RespiratoryRate: item.RespiratoryRate || '',
                        SystolicBp: item.SystolicBp || '',
                        Temperature: item.Temperature || '',
                        VitalSignEntryDateTime: item.VitalSignEntryDateTime || '',
                    };
                }) : [];
                xResultInfo = {
                    VitalSignInfo: xQueryVitalSign,
                };
            }
            let newResultOpdDischargeVitalSignDto = new result_vitalsign_opd_discharge_dto_1.ResultOpdDischargeVitalSignDto();
            newResultOpdDischargeVitalSignDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeVitalSignDto;
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
    async getOPDDischargeDoctor(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const FurtherClaimVN = queryOpdDischargeDto.PatientInfo.FurtherClaimVN;
            if (FurtherClaimVN) {
                queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN;
            }
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDoctor(queryOpdDischargeDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryDoctor = {
                    DoctorLicense: '',
                    DoctorRole: '',
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
            let newResultOpdDischargeDoctorDto = new result_doctor_opd_discharge_dto_1.ResultOpdDischargeDoctorDto();
            newResultOpdDischargeDoctorDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeDoctorDto;
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
    async getOPDDischargeDiagnosis(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const FurtherClaimVN = queryOpdDischargeDto.PatientInfo.FurtherClaimVN;
            if (FurtherClaimVN) {
                queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN;
            }
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeDiagnosis(queryOpdDischargeDto.PatientInfo.VN);
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
                        const convertDxtypename = await this.convertDxTypeCode('' + queryOpdDischargeDto.PatientInfo.InsurerCode, item.DxTypeCode);
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
            let newResultOpdDischargeDiagnosisDto = new result_diagnosis_opd_discharge_dto_1.ResultOpdDischargeDiagnosisDto();
            newResultOpdDischargeDiagnosisDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeDiagnosisDto;
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
    async getOPDDischargeInvestigation(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeInvestigation(queryOpdDischargeDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryInvestigation = [{
                        InvestigationCode: '',
                        InvestigationGroup: '',
                        InvestigationName: '',
                        InvestigationResult: '',
                        ResultDateTime: ''
                    }];
                xResultInfo = {
                    InvestigationInfo: [xQueryInvestigation],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryInvestigation = TrakcarepatientInfo.InvestigationInfo ?
                    TrakcarepatientInfo.InvestigationInfo.map((item) => {
                        return {
                            InvestigationCode: item.InvestigationCode || '',
                            InvestigationGroup: item.InvestigationGroup || '',
                            InvestigationName: item.InvestigationName || '',
                            InvestigationResult: item.InvestigationResult || '',
                            ResultDateTime: item.ResultDateTime || ''
                        };
                    }) : [];
                xResultInfo = {
                    InvestigationInfo: xQueryInvestigation,
                };
            }
            let newResultOpdDischargeInvestigationDto = new result_investigation_opd_discharge_dto_1.ResultOpdDischargeInvestigationDto();
            newResultOpdDischargeInvestigationDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeInvestigationDto;
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
    async getOPDDischargeOrderItem(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeOrderItem(queryOpdDischargeDto.PatientInfo.VN);
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                const xQueryOrderItem = {
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
                };
                xResultInfo = {
                    OrderItemInfo: [xQueryOrderItem],
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryOrderItem = TrakcarepatientInfo.OrderItemInfo ?
                    TrakcarepatientInfo.OrderItemInfo.map((item) => {
                        return {
                            ItemId: item.ItemId || '',
                            ItemName: item.ItemName || '',
                            ItemAmount: item.ItemAmount || '',
                            Discount: item.Discount || '',
                            Initial: item.Initial || '',
                            LocalBillingCode: item.LocalBillingCode || '',
                            LocalBillingName: item.LocalBillingName || '',
                            Location: item.Location || '',
                            NetAmount: item.NetAmount || '',
                            SimbVersion: item.SimbVersion || '',
                            Terminology: item.Terminology || ''
                        };
                    }) : [];
                xResultInfo = {
                    OrderItemInfo: xQueryOrderItem,
                };
            }
            let newResultOpdDischargeOrderItemDto = new result_orderitem_opd_discharge_dto_1.ResultOpdDischargeOrderItemDto();
            newResultOpdDischargeOrderItemDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeOrderItemDto;
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
    async getOPDDischargeBilling(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeBilling(queryOpdDischargeDto.PatientInfo.VN);
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
                    BillingInfo: [xQueryBilling],
                    TotalBillAmount: '',
                    InvoiceNumber: ''
                };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                const xQueryBilling = TrakcarepatientInfo.BillingInfo ?
                    TrakcarepatientInfo.BillingInfo.map((item) => {
                        if (item.LocalBillingCode == '0101015') {
                            console.log('Vitamin');
                            item.LocalBillingCode = '0101013';
                            item.LocalBillingName = '1.1.1(13) ค่ายาผู้ป่วยนอก';
                            item.SimbBillingCode = '1.1.1(13)';
                            item.PayorBillingCode = '1.1.1(13)';
                        }
                        if (item.LocalBillingCode == '01230001') {
                            console.log('ค่าวิสัญญีแพทย์');
                            item.LocalBillingCode = '0121001';
                            item.LocalBillingName = '1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก';
                            item.SimbBillingCode = '1.2.1(1)';
                            item.PayorBillingCode = '1.2.1(1)';
                        }
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
                    BillingInfo: xQueryBilling,
                    TotalBillAmount: TrakcarepatientInfo.TotalBillAmount ? TrakcarepatientInfo.TotalBillAmount : '',
                    InvoiceNumber: TrakcarepatientInfo.InvoiceNumber ? TrakcarepatientInfo.InvoiceNumber : '',
                };
            }
            let newResultOpdDischargeBillingDto = new result_billing_opd_discharge_dto_1.ResultOpdDischargeBillingDto();
            newResultOpdDischargeBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeBillingDto;
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
    async getOPDDischargeProcedure(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const whereConditions = {
                ...(queryOpdDischargeDto.PatientInfo.VN ? { vn: { equals: queryOpdDischargeDto.PatientInfo.VN } } : {}),
                ...(queryOpdDischargeDto.PatientInfo.RefId ? { refid: { equals: queryOpdDischargeDto.PatientInfo.RefId } } : {}),
                ...(queryOpdDischargeDto.PatientInfo.TransactionNo ? { transactionno: { equals: queryOpdDischargeDto.PatientInfo.TransactionNo } } : {}),
            };
            const existingProcedureRecord = await database_1.prismaProgest.proceduretransactions.findFirst({
                where: whereConditions
            });
            if (existingProcedureRecord) {
                const newQueryProcedeureDatabaseBodyDto = {
                    RefId: queryOpdDischargeDto.PatientInfo.RefId,
                    TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
                    InsurerCode: queryOpdDischargeDto.PatientInfo.InsurerCode,
                    HN: queryOpdDischargeDto.PatientInfo.HN,
                    VN: queryOpdDischargeDto.PatientInfo.VN
                };
                let newResultProcedureInfoDto = [];
                const getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
                if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
                    newResultProcedureInfoDto = await Promise.all(getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
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
                const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeProcedure(queryOpdDischargeDto.PatientInfo.VN);
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
            let newResultOpdDischargeProcedurDto = new result_procedure_opd_discharge_dto_1.ResultOpdDischargeProcedurDto();
            newResultOpdDischargeProcedurDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeProcedurDto;
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
    async getOPDDischargeAccident(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const newQueryAccidentDatabaseBodyDto = {
                RefId: queryOpdDischargeDto.PatientInfo.RefId,
                TransactionNo: queryOpdDischargeDto.PatientInfo.TransactionNo,
                InsurerCode: queryOpdDischargeDto.PatientInfo.InsurerCode,
                VN: queryOpdDischargeDto.PatientInfo.VN,
                HN: queryOpdDischargeDto.PatientInfo.HN,
            };
            const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
            if (accidentDatabase.Result.AccidentDetailInfo.AccidentPlace.length > 0) {
                const accidentDetailInfo = new review_opd_discharge_dto_1.AccidentDetailDto();
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
                const FurtherClaimVN = queryOpdDischargeDto.PatientInfo.FurtherClaimVN;
                if (FurtherClaimVN) {
                    queryOpdDischargeDto.PatientInfo.VN = FurtherClaimVN;
                }
                const TrakcarepatientInfo = await this.trakcareService.getOPDDischargeAccident(queryOpdDischargeDto.PatientInfo.VN);
                const xAccientdata = queryOpdDischargeDto.PatientInfo.AccidentDate;
                const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode ? TrakcarepatientInfo.statusCode : 400;
                if (TrakcarepatientInfoStatusCode !== 200) {
                    this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
                    let xCauseOfInjuryDetail, xInjuryDetail, xQueryAccident;
                    if (xAccientdata) {
                        xCauseOfInjuryDetail = [{
                                CauseOfInjury: 'X599',
                                CommentOfInjury: '',
                            }];
                        xInjuryDetail = [{
                                WoundType: '',
                                InjurySide: '',
                                InjuryArea: 'T149',
                            }];
                        xQueryAccident = {
                            AccidentPlace: '',
                            AccidentDate: '',
                            CauseOfInjuryDetail: xCauseOfInjuryDetail,
                            InjuryDetail: xInjuryDetail
                        };
                    }
                    else {
                        xCauseOfInjuryDetail = [{
                                CauseOfInjury: '',
                                CommentOfInjury: '',
                            }];
                        xInjuryDetail = [{
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
                else {
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    const xQueryAccident = TrakcarepatientInfo.AccidentDetailInfo ? {
                        AccidentPlace: TrakcarepatientInfo.AccidentDetailInfo.AccidentPlace || '',
                        AccidentDate: TrakcarepatientInfo.AccidentDetailInfo.AccidentDate || '',
                        CauseOfInjuryDetail: TrakcarepatientInfo.AccidentDetailInfo.CauseOfInjuryDetail
                            ? TrakcarepatientInfo.AccidentDetailInfo.CauseOfInjuryDetail.map((cause) => ({
                                CauseOfInjury: cause.CauseOfInjury || '',
                                CommentOfInjury: cause.CommentOfInjury || ''
                            }))
                            : [],
                        InjuryDetail: TrakcarepatientInfo.AccidentDetailInfo.InjuryDetail
                            ? TrakcarepatientInfo.AccidentDetailInfo.InjuryDetail.map((injury) => ({
                                WoundType: injury.WoundType || '',
                                InjurySide: injury.InjurySide || '',
                                InjuryArea: injury.InjuryArea || ''
                            }))
                            : []
                    }
                        : {};
                    xResultInfo = {
                        AccidentDetailInfo: xQueryAccident,
                    };
                }
            }
            let newResultOpdDischargeAccidentDto = new result_accident_opd_discharge_dto_1.ResultOpdDischargeAccidentDto();
            newResultOpdDischargeAccidentDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultOpdDischargeAccidentDto;
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
    async getListVisitClaimAIA(queryOpdDischargeDto) {
        let xResultInfo;
        try {
            const TrakcarepatientInfo = await this.trakcareService.getListVisitClaimAIA(queryOpdDischargeDto.PatientInfo.VN);
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
            let newResultClaimFormListDto = new result_listclaim_opd_discharge_dto_1.ResultClaimFormListDto();
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
    async SubmitVisit(queryVisitDto) {
        let medicalTransaction;
        try {
            const xRefId = queryVisitDto.PatientInfo.RefId;
            const xTransactionNo = queryVisitDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryVisitDto.PatientInfo.InsurerCode;
            const xHN = queryVisitDto.PatientInfo.HN;
            const xVN = queryVisitDto.PatientInfo.VN;
            const xVisitDateTime = queryVisitDto.PatientInfo.VisitDateTime || '';
            const xDxFreeText = queryVisitDto.PatientInfo.DxFreeText || '';
            const xPresentIllness = queryVisitDto.PatientInfo.PresentIllness || '';
            const xChiefComplaint = queryVisitDto.PatientInfo.ChiefComplaint || '';
            const xAccidentCauseOver45Days = queryVisitDto.PatientInfo.AccidentCauseOver45Days || '';
            const xUnderlyingCondition = queryVisitDto.PatientInfo.UnderlyingCondition || '';
            const xPhysicalExam = queryVisitDto.PatientInfo.PhysicalExam || '';
            const xPlanOfTreatment = queryVisitDto.PatientInfo.PlanOfTreatment || '';
            const xProcedureFreeText = queryVisitDto.PatientInfo.ProcedureFreeText || '';
            const xAdditionalNote = queryVisitDto.PatientInfo.AdditionalNote || '';
            const xSignSymptomsDate = queryVisitDto.PatientInfo.SignSymptomsDate || '';
            const xComaScore = queryVisitDto.PatientInfo.ComaScore || '';
            const xExpectedDayOfRecovery = queryVisitDto.PatientInfo.ExpectedDayOfRecovery || '';
            const xHaveProcedure = Boolean(queryVisitDto.PatientInfo.HaveProcedure) || false;
            const xHaveAccidentCauseOfInjuryDetail = Boolean(queryVisitDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
            const xHaveAccidentInjuryDetail = Boolean(queryVisitDto.PatientInfo.HaveAccidentInjuryDetail) || false;
            const xAlcoholRelated = Boolean(queryVisitDto.PatientInfo.AlcoholRelated) || false;
            const xPregnant = Boolean(queryVisitDto.PatientInfo.Pregnant) || false;
            const xPrivateCase = Boolean(queryVisitDto.PatientInfo.PrivateCase) || false;
            const xHeight = queryVisitDto.PatientInfo.Height || '';
            const xWeight = queryVisitDto.PatientInfo.Weight || '';
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
                            dxfreetext: xDxFreeText,
                            presentillness: xPresentIllness,
                            chiefcomplaint: xChiefComplaint,
                            accidentcauseover45days: xAccidentCauseOver45Days,
                            underlyingcondition: xUnderlyingCondition,
                            physicalexam: xPhysicalExam,
                            planoftreatment: xPlanOfTreatment,
                            procedurefreetext: xProcedureFreeText,
                            additionalnote: xAdditionalNote,
                            signsymptomsdate: xSignSymptomsDate,
                            comascore: xComaScore,
                            expecteddayofrecovery: xExpectedDayOfRecovery,
                            pregnant: xPregnant,
                            alcoholrelated: xAlcoholRelated,
                            haveaccidentinjurydetail: xHaveAccidentInjuryDetail,
                            haveaccidentcauseofinjurydetail: xHaveAccidentCauseOfInjuryDetail,
                            haveprocedure: xHaveProcedure,
                            privatecase: xPrivateCase,
                            visitdatetime: xVisitDateTime,
                            height: xHeight,
                            weight: xWeight
                        },
                    });
                }
                catch (error) {
                    throw new Error(`Error creating medical transaction: ${error.message}`);
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid VisitDetail', '');
            }
            let newResultSubmitProcedureDto = new query_procedure_opd_discharge_dto_1.ResultSubmitProcedureDto();
            newResultSubmitProcedureDto = {
                HTTPStatus: newHttpMessageDto,
                Result: medicalTransaction
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
            let newResultSubmitProcedureDto = new query_procedure_opd_discharge_dto_1.ResultSubmitProcedureDto();
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
    async SubmitAccident(queryAccidentDto) {
        let xResultInfo, xCauseOfInjuryDetail, xInjuryDetail;
        try {
            const xRefId = queryAccidentDto.PatientInfo.RefId;
            const xTransactionNo = queryAccidentDto.PatientInfo.TransactionNo;
            const xInsurerCode = queryAccidentDto.PatientInfo.InsurerCode;
            const xHN = queryAccidentDto.PatientInfo.HN;
            const xVN = queryAccidentDto.PatientInfo.VN;
            const xHaveAccidentCauseOfInjuryDetail = Boolean(queryAccidentDto.PatientInfo.HaveAccidentCauseOfInjuryDetail) || false;
            const xHaveAccidentInjuryDetail = Boolean(queryAccidentDto.PatientInfo.HaveAccidentInjuryDetail) || false;
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
            let newResultSubmitAccidentDto = new query_accident_opd_discharge_dto_1.ResultSubmitAccidentDto();
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
    async SubmitOPDDischargeToAIA(querySubmitOpdDischargeDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: querySubmitOpdDischargeDto.PatientInfo.RefId,
                xTransactionNo: querySubmitOpdDischargeDto.PatientInfo.TransactionNo,
                xHN: querySubmitOpdDischargeDto.PatientInfo.HN,
                xInsurerCode: querySubmitOpdDischargeDto.PatientInfo.InsurerCode,
                xVN: querySubmitOpdDischargeDto.PatientInfo.VN,
                xVisitDateTime: querySubmitOpdDischargeDto.PatientInfo.VisitDateTime,
                xFurtherClaimId: querySubmitOpdDischargeDto.PatientInfo.FurtherClaimId,
                xFurtherClaimNo: querySubmitOpdDischargeDto.PatientInfo.FurtherClaimNo,
                xAccidentDate: querySubmitOpdDischargeDto.PatientInfo.AccidentDate,
                xAccidentPlaceCode: querySubmitOpdDischargeDto.PatientInfo.AccidentPlaceCode,
                xIdType: querySubmitOpdDischargeDto.PatientInfo.IdType,
                xPolicyTypeCode: querySubmitOpdDischargeDto.PatientInfo.PolicyTypeCode,
                xServiceSettingCode: querySubmitOpdDischargeDto.PatientInfo.ServiceSettingCode,
                xSurgeryTypeCode: querySubmitOpdDischargeDto.PatientInfo.SurgeryTypeCode,
                xIllnessTypeCode: querySubmitOpdDischargeDto.PatientInfo.IllnessTypeCode,
                xRunningdocument: querySubmitOpdDischargeDto.PatientInfo.Runningdocument,
                xFurtherClaimVN: querySubmitOpdDischargeDto.PatientInfo.FurtherClaimVN,
                xOrderVitamin: querySubmitOpdDischargeDto.PatientInfo.OrderVitamin,
            };
            const FurtherClaimVN = RequesetBody.xFurtherClaimVN;
            const getOPDDischargePatient = await this.trakcareService.getOPDDischargePatient(RequesetBody.xHN);
            let newResultPatientInfoDto;
            if (getOPDDischargePatient && getOPDDischargePatient.PatientInfo && getOPDDischargePatient.PatientInfo.HN.length > 0) {
                newResultPatientInfoDto = {
                    Dob: await this.utilsService.EncryptAESECB(getOPDDischargePatient.PatientInfo.Dob, AIA_APISecretkey),
                    Hn: await this.utilsService.EncryptAESECB(getOPDDischargePatient.PatientInfo.HN, AIA_APISecretkey),
                    Gender: getOPDDischargePatient.PatientInfo.Gender
                };
            }
            else {
                newResultPatientInfoDto = {
                    Dob: '',
                    Hn: '',
                    Gender: ''
                };
            }
            console.log('getOPDDischargePatient done');
            const whereConditionsGetVisit = {
                ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
                ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
                ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
            };
            const existingVisitRecord = await database_1.prismaProgest.medicaltransactions.findFirst({
                where: whereConditionsGetVisit
            });
            let newResultVisitInfoDto = new result_submit_opd_discharge_dto_1.ResultVisitInfoDto();
            if (existingVisitRecord) {
                const newQueryVisitDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN,
                };
                const getvisitformDatabase = await this.utilsService.getvisitformDatabase(newQueryVisitDatabaseBodyDto);
                newResultVisitInfoDto = {
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
                    Vn: getvisitformDatabase.Result.VisitInfo.VN || '',
                    Weight: getvisitformDatabase.Result.VisitInfo.Weight || ''
                };
                console.log('getOPDDischargeVisit done from database');
            }
            else {
                let VNForVisitinfo;
                if (FurtherClaimVN) {
                    VNForVisitinfo = FurtherClaimVN;
                }
                else {
                    VNForVisitinfo = RequesetBody.xVN;
                }
                const getOPDDischargeVisit = await this.trakcareService.getOPDDischargeVisit(VNForVisitinfo);
                newResultVisitInfoDto = {
                    FurtherClaimId: '',
                    AccidentCauseOver45Days: '',
                    AdditionalNote: getOPDDischargeVisit.VisitInfo.AdditionalNote,
                    AlcoholRelated: getOPDDischargeVisit.VisitInfo.AlcoholRelated,
                    ChiefComplaint: getOPDDischargeVisit.VisitInfo.ChiefComplaint,
                    ComaScore: getOPDDischargeVisit.VisitInfo.ComaScore,
                    DxFreeText: getOPDDischargeVisit.VisitInfo.DxFreeText,
                    ExpectedDayOfRecovery: '',
                    Height: '',
                    PhysicalExam: '',
                    PlanOfTreatment: '',
                    Pregnant: getOPDDischargeVisit.VisitInfo.Pregnant,
                    PresentIllness: '',
                    PreviousTreatmentDate: '',
                    PreviousTreatmentDetail: '',
                    PrivateCase: getOPDDischargeVisit.VisitInfo.PrivateCase,
                    ProcedureFreeText: getOPDDischargeVisit.VisitInfo.ProcedureFreeText,
                    SignSymptomsDate: '',
                    UnderlyingCondition: '',
                    VisitDateTime: getOPDDischargeVisit.VisitInfo.VisitDateTime,
                    Vn: await this.utilsService.EncryptAESECB(getOPDDischargeVisit.VisitInfo.VisitDateTime, AIA_APISecretkey),
                    Weight: ''
                };
                console.log('getOPDDischargeVisit done from trakcare');
            }
            const getOPDDischargeVitalSign = await this.trakcareService.getOPDDischargeVitalSign(RequesetBody.xVN);
            let newResultVitalSignInfoDto = [];
            if (getOPDDischargeVitalSign && getOPDDischargeVitalSign.VitalSignInfo && getOPDDischargeVitalSign.VitalSignInfo.length > 0) {
                newResultVitalSignInfoDto = await Promise.all(getOPDDischargeVitalSign.VitalSignInfo.map(async (item) => {
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
            }
            console.log('getOPDDischargeVitalSign done');
            let VNForDiagnosisinfo;
            if (FurtherClaimVN) {
                VNForDiagnosisinfo = FurtherClaimVN;
            }
            else {
                VNForDiagnosisinfo = RequesetBody.xVN;
            }
            const getOPDDischargeDiagnosis = await this.trakcareService.getOPDDischargeDiagnosis(VNForDiagnosisinfo);
            let getDiagnosisTypeMapping;
            let newQueryDiagnosisInfoDto = [];
            if (getOPDDischargeDiagnosis && getOPDDischargeDiagnosis?.DiagnosisInfo && getOPDDischargeDiagnosis?.DiagnosisInfo.length > 0) {
                newQueryDiagnosisInfoDto = await Promise.all(getOPDDischargeDiagnosis.DiagnosisInfo.map(async (item) => {
                    getDiagnosisTypeMapping = await this.utilsService.getDiagnosisTypeMapping('' + RequesetBody.xInsurerCode, item.DxTypeCode);
                    if (item.DxTypeCode === getDiagnosisTypeMapping.Result.dxtypecodetrakcare) {
                        item.DxTypeCode = getDiagnosisTypeMapping.Result.dxtypecodeinsurance;
                    }
                    return {
                        DxName: item.DxName,
                        DxType: item.DxTypeCode,
                        Icd10: item.DxCode,
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
            console.log("newQueryDiagnosisInfoDto");
            console.log(newQueryDiagnosisInfoDto);
            console.log('getOPDDischargeDiagnosis done');
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
                const accidentDetailInfo = new review_opd_discharge_dto_1.AccidentDetailDto();
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
            const whereConditions = {
                ...(RequesetBody.xVN ? { vn: { equals: RequesetBody.xVN } } : {}),
                ...(RequesetBody.xRefId ? { refid: { equals: RequesetBody.xRefId } } : {}),
                ...(RequesetBody.xTransactionNo ? { transactionno: { equals: RequesetBody.xTransactionNo } } : {}),
            };
            let newResultProcedureInfoDto = [];
            const existingProcedureRecord = await database_1.prismaProgest.proceduretransactions.findFirst({
                where: whereConditions
            });
            let getOPDDischargeProcedure;
            if (existingProcedureRecord) {
                getOPDDischargeProcedure = await this.trakcareService.getOPDDischargeProcedure(RequesetBody.xVN);
                if (getOPDDischargeProcedure && getOPDDischargeProcedure.ProcedureInfo && getOPDDischargeProcedure.ProcedureInfo.length > 0) {
                    newResultProcedureInfoDto = await Promise.all(getOPDDischargeProcedure.ProcedureInfo.map(async (item) => {
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
            }
            else {
                const newQueryProcedeureDatabaseBodyDto = {
                    RefId: RequesetBody.xRefId,
                    TransactionNo: RequesetBody.xTransactionNo,
                    InsurerCode: RequesetBody.xInsurerCode,
                    HN: RequesetBody.xHN,
                    VN: RequesetBody.xVN
                };
                getOPDDischargeProcedure = await this.utilsService.getProcedureformDatabase(newQueryProcedeureDatabaseBodyDto);
                if (getOPDDischargeProcedure && getOPDDischargeProcedure.Result.ProcedureInfo && getOPDDischargeProcedure.Result.ProcedureInfo.length > 0) {
                    newResultProcedureInfoDto = await Promise.all(getOPDDischargeProcedure.Result.ProcedureInfo.map(async (item) => {
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
            }
            const getOPDDischargeInvestigation = await this.trakcareService.getOPDDischargeInvestigation(RequesetBody.xVN);
            let newResultInvestigationInfoDto = [];
            if (getOPDDischargeInvestigation && getOPDDischargeInvestigation.InvestigationInfo && getOPDDischargeInvestigation.InvestigationInfo.length > 0) {
                newResultInvestigationInfoDto = await Promise.all(getOPDDischargeInvestigation.InvestigationInfo.map(async (item) => {
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
                newResultInvestigationInfoDto = [{
                        InvestigationCode: '',
                        InvestigationGroup: '',
                        InvestigationName: '',
                        InvestigationResult: '',
                        ResultDateTime: ''
                    }];
            }
            console.log('Investigation done');
            const getOPDDischargeOrderItem = await this.trakcareService.getOPDDischargeOrderItem(RequesetBody.xVN);
            let newResultOrderItemInfoDto = [];
            if (getOPDDischargeOrderItem && getOPDDischargeOrderItem.OrderItemInfo && getOPDDischargeOrderItem.OrderItemInfo.length > 0) {
                newResultOrderItemInfoDto = await Promise.all(getOPDDischargeOrderItem.OrderItemInfo.map(async (item) => {
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
            }
            console.log('OrderItem done');
            let VNForDoctorinfo;
            if (FurtherClaimVN) {
                VNForDoctorinfo = FurtherClaimVN;
            }
            else {
                VNForDoctorinfo = RequesetBody.xVN;
            }
            const getOPDDischargeDoctor = await this.trakcareService.getOPDDischargeDoctor(VNForDoctorinfo);
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
            console.log('Doctor done');
            const getOPDDischargeBilling = await this.trakcareService.getOPDDischargeBilling(RequesetBody.xVN);
            let newResultBillingInfoDto = [];
            let newTotalBillAmount;
            if (getOPDDischargeBilling && getOPDDischargeBilling.BillingInfo && getOPDDischargeBilling.BillingInfo.length > 0) {
                newTotalBillAmount = getOPDDischargeBilling.TotalBillAmount;
                newResultBillingInfoDto = await Promise.all(getOPDDischargeBilling.BillingInfo.map(async (item) => {
                    if (item.LocalBillingCode == '0101015') {
                        console.log('Vitamin');
                        item.LocalBillingCode = '0101013';
                        item.LocalBillingName = '1.1.1(13) ค่ายาผู้ป่วยนอก';
                        item.SimbBillingCode = '1.1.1(13)';
                        item.PayorBillingCode = '1.1.1(13)';
                    }
                    if (item.LocalBillingCode == '01230001') {
                        console.log('ค่าวิสัญญีแพทย์ และ/ หรือ วิสัญญีพยาบาล');
                        item.LocalBillingCode = '0121001';
                        item.LocalBillingName = '1.2.1(1) ค่าตรวจรักษากรณีผู้ป่วยนอก';
                        item.SimbBillingCode = '1.2.1(1)';
                        item.PayorBillingCode = '1.2.1(1)';
                    }
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
                newResultBillingInfoDto = [{
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
            console.log('billing done');
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
            let newResultDataJsonDto = new result_submit_opd_discharge_dto_1.ResultDataJsonDto();
            newResultDataJsonDto = {
                Patient: newResultPatientInfoDto,
                Visit: newResultVisitInfoDto,
                VitalSign: newResultVitalSignInfoDto,
                Diagnosis: newQueryDiagnosisInfoDto,
                AccidentDetail: newAccidentDetail,
                Procedure: newResultProcedureInfoDto,
                Investigation: newResultInvestigationInfoDto,
                OrderItem: newResultOrderItemInfoDto,
                Doctor: newResultDoctorInfoDto,
                Billing: newResultBillingInfoDto,
                TotalBillAmount: newTotalBillAmount,
                Pss: newResultPSSInfoDto
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
            const apiURL = `${AIA_APIURL}/SmartClaim/opdDischarge`;
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
                let xInsuranceResult = new result_submit_opd_discharge_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                let xInsuranceData = new result_submit_opd_discharge_dto_1.InsuranceData();
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
                            furtherclaimid: RequesetBody.xFurtherClaimId,
                            furtherclaimno: RequesetBody.xFurtherClaimNo,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
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
                            furtherclaimid: RequesetBody.xFurtherClaimId,
                            furtherclaimno: RequesetBody.xFurtherClaimNo,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                        },
                    });
                }
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultSubmitOpdDischargeDto = new result_submit_opd_discharge_dto_1.ResultSubmitOpdDischargeDto();
            newResultSubmitOpdDischargeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultSubmitOpdDischargeDto;
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
    async ReviewOPDDischarge(queryReviewOpdDischargeDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryReviewOpdDischargeDto.PatientInfo.RefId,
                xTransactionNo: queryReviewOpdDischargeDto.PatientInfo.TransactionNo,
                xHN: queryReviewOpdDischargeDto.PatientInfo.HN,
                xInsurerCode: queryReviewOpdDischargeDto.PatientInfo.InsurerCode,
                xVN: queryReviewOpdDischargeDto.PatientInfo.VN,
                xHaveProcedure: queryReviewOpdDischargeDto.PatientInfo.VN,
                xHaveAccidentCauseOfInjuryDetail: queryReviewOpdDischargeDto.PatientInfo.HaveAccidentCauseOfInjuryDetail,
                xHaveAccidentInjuryDetail: queryReviewOpdDischargeDto.PatientInfo.HaveAccidentInjuryDetail,
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
            console.log('getOPDDischargePatient done');
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
            console.log('getOPDDischargeVisit done');
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
            console.log('getOPDDischargeVitalSign done');
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
            console.log('getOPDDischargeDiagnosis done');
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
            console.log('Procedure done');
            let newQueryAccidentDatabaseBodyDto = new result_accident_databse_dto_1.QueryAccidentDatabaseBodyDto();
            newQueryAccidentDatabaseBodyDto = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: RequesetBody.xInsurerCode,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
            };
            const accidentDatabase = await this.utilsService.getAccidentformDatabase(newQueryAccidentDatabaseBodyDto);
            const accidentDetailInfo = new review_opd_discharge_dto_1.AccidentDetailDto();
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
            console.log('AccidentDatabase done');
            let newResultReviewInvestigationInfoDto = [];
            const getOPDDischargeInvestigation = await this.trakcareService.getOPDDischargeInvestigation(RequesetBody.xVN);
            if (getOPDDischargeInvestigation && getOPDDischargeInvestigation.InvestigationInfo && getOPDDischargeInvestigation.InvestigationInfo.length > 0) {
                newResultReviewInvestigationInfoDto = await Promise.all(getOPDDischargeInvestigation.InvestigationInfo.map(async (item) => {
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
            console.log('Investigation done');
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
            console.log('OrderItem done');
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
            console.log('Doctor done');
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
            console.log('billing done');
            let newResultReviewDataJsonDto = new review_opd_discharge_dto_1.ResultReviewDataJsonDto();
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
                InvoiceNumber: newInvoiceNumber
            };
            let xInsuranceResult = new result_submit_opd_discharge_dto_1.InsuranceResult();
            xInsuranceResult = {
                Code: '200',
                Message: 'sucess',
                MessageTh: 'test'
            };
            xResultInfo = {
                InsuranceResult: xInsuranceResult,
                InsuranceData: newResultReviewDataJsonDto
            };
            if ((newResultReviewDataJsonDto.TotalBillAmount) || (newResultReviewDataJsonDto.InvoiceNumber)) {
                const QueryUpdateBill = {
                    ...(newResultReviewDataJsonDto.TotalBillAmount ? { totalbillamount: newResultReviewDataJsonDto.TotalBillAmount } : {}),
                    ...(newResultReviewDataJsonDto.InvoiceNumber ? { invoicenumber: newResultReviewDataJsonDto.InvoiceNumber } : {}),
                };
                await database_1.prismaProgest.transactionclaim.updateMany({
                    where: {
                        refid: RequesetBody.xRefId,
                        transactionno: RequesetBody.xTransactionNo,
                        vn: RequesetBody.xVN
                    },
                    data: QueryUpdateBill
                });
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultReviewOpdDischargeDto = new review_opd_discharge_dto_1.ResultReviewOpdDischargeDto();
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
    async UpdateFurtherClaimVN(queryVisitDto) {
        let updatestatus;
        try {
            const xRefId = queryVisitDto.PatientInfo.RefId;
            const xTransactionNo = queryVisitDto.PatientInfo.TransactionNo;
            const xHN = queryVisitDto.PatientInfo.HN;
            const xVN = queryVisitDto.PatientInfo.VN;
            const xFurtherClaimVN = queryVisitDto.PatientInfo.FurtherClaimVN;
            if ((xTransactionNo) && (xFurtherClaimVN)) {
                const checkVisitNumberAvailable = await this.trakcareService.checkVisitNumberAvailable(xHN, xFurtherClaimVN);
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
                                furtherclaimvn: xFurtherClaimVN
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
            let newResultSubmitUpdateFurtherClaimVNDto = new query_updatefurtherclaimvn_opd_discharge_dto_1.ResultSubmitUpdateFurtherClaimVNDto();
            newResultSubmitUpdateFurtherClaimVNDto = {
                HTTPStatus: newHttpMessageDto,
                Result: updatestatus
            };
            return newResultSubmitUpdateFurtherClaimVNDto;
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
    async convertDxTypeCode(inputInsurerCode, inputdxTypeCodeTrakcare) {
        const convertDxtypename = await this.utilsService.getDiagnosisTypeMapping(inputInsurerCode, inputdxTypeCodeTrakcare);
        return convertDxtypename;
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
                data.message = inputmessage || 'success';
                data.error = '';
            }
        }
    }
};
exports.OpdDischargeService = OpdDischargeService;
exports.OpdDischargeService = OpdDischargeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService,
        utils_service_1.UtilsService])
], OpdDischargeService);
//# sourceMappingURL=opd-discharge.service.js.map