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
exports.PatientinfoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const create_patientinfo_dto_1 = require("./dto/create-patientinfo.dto");
const find_patientinfo_dto_1 = require("./dto/find-patientinfo.dto");
const findforupdate_patientinfo_dto_1 = require("./dto/findforupdate-patientinfo.dto");
const search_patientinfo_dto_1 = require("./dto/search-patientinfo.dto");
const update_patientinfo_dto_1 = require("./dto/update-patientinfo.dto");
const search__transection_dto_1 = require("./dto/search -transection.dto");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
let PatientinfoService = class PatientinfoService {
    constructor(httpService, trakcareService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
    }
    async FindPatientTrakcare(findBodyDto) {
        let RequesetBody;
        let TrakcarepatientInfo;
        let ResponeTrakcareHTTPStatus;
        try {
            RequesetBody = {
                xRefID: findBodyDto.PatientInfo.RefID || '',
                xTransactionNo: findBodyDto.PatientInfo.TransactionNo || '',
                xPID: findBodyDto.PatientInfo.PID || '',
                xPassportnumber: findBodyDto.PatientInfo.PassportNumber || '',
                xIdType: findBodyDto.PatientInfo.IdType || '',
                xStatusClaimCode: findBodyDto.PatientInfo.StatusClaimCode || '',
                xInsurerCode: findBodyDto.PatientInfo.InsurerCode || null,
                xHN: findBodyDto.PatientInfo.HN || '',
                xVN: findBodyDto.PatientInfo.VN || '',
                xVisitDatefrom: findBodyDto.PatientInfo.VisitDatefrom || '',
                xVisitDateto: findBodyDto.PatientInfo.VisitDateto || '',
            };
            if (RequesetBody.xIdType === "NATIONAL_ID") {
                TrakcarepatientInfo = await this.trakcareService.getPatientInfoByPID(RequesetBody.xPID);
            }
            else if (RequesetBody.xIdType === "HOSPITAL_ID") {
                TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
            }
            else if (RequesetBody.xIdType === "PASSPORT_NO") {
                TrakcarepatientInfo = await this.trakcareService.getPatientInfoByPassportNumber(RequesetBody.xPassportnumber);
            }
            else {
                TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
            }
            ResponeTrakcareHTTPStatus = {
                xstatusCode: TrakcarepatientInfo.statusCode,
                xmessage: TrakcarepatientInfo.message,
                xerror: TrakcarepatientInfo.error
            };
            let newFindPatientResult = new find_patientinfo_dto_1.FindPatientResultDto();
            newFindPatientResult = {
                PatientID: TrakcarepatientInfo.PatientInfo.PatientID,
                PID: TrakcarepatientInfo.PatientInfo.PID,
                PassportNumber: TrakcarepatientInfo.PatientInfo.PassportNumber,
                HN: TrakcarepatientInfo.PatientInfo.HN,
                TitleTH: TrakcarepatientInfo.PatientInfo.TitleTH,
                GivenNameTH: TrakcarepatientInfo.PatientInfo.GivenNameTH,
                SurnameTH: TrakcarepatientInfo.PatientInfo.SurnameTH,
                TitleEN: TrakcarepatientInfo.PatientInfo.TitleEN,
                GivenNameEN: TrakcarepatientInfo.PatientInfo.GivenNameEN,
                SurnameEN: TrakcarepatientInfo.PatientInfo.SurnameEN,
                DateOfBirth: TrakcarepatientInfo.PatientInfo.DateOfBirth,
                Gender: TrakcarepatientInfo.PatientInfo.Gender,
                MobilePhone: TrakcarepatientInfo.PatientInfo.MobilePhone
            };
            const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
            this.addFormatHTTPStatus(newHttpMessageDto, ResponeTrakcareHTTPStatus.xstatusCode, ResponeTrakcareHTTPStatus.xmessage, ResponeTrakcareHTTPStatus.xerror);
            let newPatientfindDto = new find_patientinfo_dto_1.PatientFindDto();
            newPatientfindDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PatientInfo: newFindPatientResult
                }
            };
            return newPatientfindDto;
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
    async create(createBodyDto) {
        let ResponeTrakcareHTTPStatus;
        let RequesetBody;
        try {
            RequesetBody = {
                national_id: createBodyDto.PatientInfo.PID,
                passportnumber: createBodyDto.PatientInfo.PassportNumber,
                hn: createBodyDto.PatientInfo.HN,
                title_th: createBodyDto.PatientInfo.TitleTH,
                givenname_th: createBodyDto.PatientInfo.GivenNameTH,
                surname_th: createBodyDto.PatientInfo.SurnameTH,
                title_en: createBodyDto.PatientInfo.TitleEN,
                givenname_en: createBodyDto.PatientInfo.GivenNameEN,
                surname_en: createBodyDto.PatientInfo.SurnameEN,
                mobilephone: createBodyDto.PatientInfo.MobilePhone,
                insurerid: +createBodyDto.PatientInfo.InsurerCode,
                statusactive: true,
                dateofbirth: createBodyDto.PatientInfo.DateOfBirth,
                gender: createBodyDto.PatientInfo.Gender,
                patientid: +createBodyDto.PatientInfo.PatientID,
            };
            if (RequesetBody.pid === 'ต่างชาติ') {
                RequesetBody.pid = RequesetBody.hn;
            }
            const result = await database_1.prismaProgest.claimants.create({ data: RequesetBody });
            let httpcode;
            if (result) {
                httpcode = common_1.HttpStatus.CREATED;
            }
            ResponeTrakcareHTTPStatus = {
                xstatusCode: httpcode,
                xmessage: 'User created successfully',
                xerror: ''
            };
            const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
            this.addFormatHTTPStatus(newHttpMessageDto, ResponeTrakcareHTTPStatus.xstatusCode, ResponeTrakcareHTTPStatus.xmessage, ResponeTrakcareHTTPStatus.xerror);
            const newTransactionQueryPatientCreateDto = new create_patientinfo_dto_1.TransactionQueryPatientCreateDto();
            this.addFormatTransactionPatientCreateDto(newTransactionQueryPatientCreateDto, RequesetBody.insurerid, RequesetBody.patientid, RequesetBody.pid, RequesetBody.passportnumber, RequesetBody.hn, RequesetBody.title_th, RequesetBody.givenname_th, RequesetBody.surname_th, RequesetBody.title_en, RequesetBody.givenname_en, RequesetBody.surname_en, RequesetBody.dateofbirth, RequesetBody.gender, RequesetBody.mobilephone);
            let newPatientCreateDto = new create_patientinfo_dto_1.PatientCreateDto();
            newPatientCreateDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PatientInfo: newTransactionQueryPatientCreateDto
                }
            };
            return newPatientCreateDto;
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
    async PatientSearch(searchBodyDto) {
        let RequesetBody;
        let ResponeTrakcareHTTPStatus;
        try {
            RequesetBody = {
                xRefID: searchBodyDto.PatientInfo.RefID || '',
                xTransactionNo: searchBodyDto.PatientInfo.TransactionNo || '',
                xPID: searchBodyDto.PatientInfo.PID || '',
                xPassportnumber: searchBodyDto.PatientInfo.PassportNumber || '',
                xIdType: searchBodyDto.PatientInfo.IdType || '',
                xStatusClaimCode: searchBodyDto.PatientInfo.StatusClaimCode || '',
                xInsurerCode: searchBodyDto.PatientInfo.InsurerCode || null,
                xHN: searchBodyDto.PatientInfo.HN || '',
                xVN: searchBodyDto.PatientInfo.VN || '',
                xVisitDatefrom: searchBodyDto.PatientInfo.VisitDatefrom || '',
                xVisitDateto: searchBodyDto.PatientInfo.VisitDateto || '',
            };
            let results;
            if (searchBodyDto.PatientInfo.IdType === "NATIONAL_ID") {
                results = await database_1.prismaProgest.claimants.findMany({
                    where: {
                        national_id: searchBodyDto.PatientInfo.PID
                    },
                });
            }
            else if (searchBodyDto.PatientInfo.IdType === "HOSPITAL_ID") {
                results = await database_1.prismaProgest.claimants.findMany({
                    where: {
                        hn: searchBodyDto.PatientInfo.HN
                    },
                });
            }
            else if (searchBodyDto.PatientInfo.IdType === "PASSPORT_NO") {
                results = await database_1.prismaProgest.claimants.findMany({
                    where: {
                        passportnumber: searchBodyDto.PatientInfo.PassportNumber
                    },
                });
            }
            else {
                results = await database_1.prismaProgest.claimants.findMany({
                    where: {
                        hn: RequesetBody.xHN,
                        insurerid: 13
                    },
                });
            }
            const patientInfoArray = results.map((result) => ({
                PID: result.national_id || '',
                HN: result.hn,
                PassportNumber: result.passportnumber,
                TitleTHc: result.title_th,
                GivenNameTH: result.givenname_th,
                SurnameTH: result.surname_th,
                TitleEN: result.title_en,
                GivenNameEN: result.givenname_en,
                SurnameEN: result.surname_en,
                MobilePhone: result.mobilephone,
                DateOfBirth: result.dateofbirth,
                Gender: result.gender,
                PolicyNumber: result.policynumber,
                MembershipId: result.membershipid,
                CustomerId: result.customerid
            }));
            let httpcode, xmessageReturn;
            if ((results) && (results.length > 0)) {
                httpcode = common_1.HttpStatus.OK;
                xmessageReturn = 'User search completed successfully';
            }
            else {
                httpcode = common_1.HttpStatus.BAD_REQUEST;
                xmessageReturn = 'Not Found.';
            }
            ResponeTrakcareHTTPStatus = {
                xstatusCode: httpcode,
                xmessage: xmessageReturn,
                xerror: ''
            };
            const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
            this.addFormatHTTPStatus(newHttpMessageDto, ResponeTrakcareHTTPStatus.xstatusCode, ResponeTrakcareHTTPStatus.xmessage, ResponeTrakcareHTTPStatus.xerror);
            let newPatientSearchDto = new search_patientinfo_dto_1.PatientSearchDto();
            newPatientSearchDto = {
                HTTPStatus: newHttpMessageDto,
                Result: { PatientInfo: patientInfoArray }
            };
            return newPatientSearchDto;
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
    async FindforUpdate(findforUpdateBodyDto) {
        let RequesetBody;
        let TrakcarepatientInfo;
        let ResponeTrakcareHTTPStatus;
        try {
            RequesetBody = {
                xRefID: findforUpdateBodyDto.PatientInfo.RefID || '',
                xTransactionNo: findforUpdateBodyDto.PatientInfo.TransactionNo || '',
                xPID: findforUpdateBodyDto.PatientInfo.PID || '',
                xPassportnumber: findforUpdateBodyDto.PatientInfo.PassportNumber || '',
                xIdType: findforUpdateBodyDto.PatientInfo.IdType || '',
                xStatusClaimCode: findforUpdateBodyDto.PatientInfo.StatusClaimCode || '',
                xInsurerCode: findforUpdateBodyDto.PatientInfo.InsurerCode || null,
                xHN: findforUpdateBodyDto.PatientInfo.HN || '',
                xVN: findforUpdateBodyDto.PatientInfo.VN || '',
                xVisitDatefrom: findforUpdateBodyDto.PatientInfo.VisitDatefrom || '',
                xVisitDateto: findforUpdateBodyDto.PatientInfo.VisitDateto || '',
            };
            if (RequesetBody.xHN) {
                TrakcarepatientInfo = await this.trakcareService.getPatientInfoByHN(RequesetBody.xHN);
            }
            ResponeTrakcareHTTPStatus = {
                xstatusCode: TrakcarepatientInfo.statusCode,
                xmessage: TrakcarepatientInfo.message,
                xerror: TrakcarepatientInfo.error
            };
            let newFindforUpdatePatientTrakcare = new findforupdate_patientinfo_dto_1.FindforUpdatePatientTrakcare();
            newFindforUpdatePatientTrakcare = {
                PatientID: TrakcarepatientInfo.PatientInfo.PatientID,
                PID: TrakcarepatientInfo.PatientInfo.PID,
                PassportNumber: TrakcarepatientInfo.PatientInfo.PassportNumber,
                HN: TrakcarepatientInfo.PatientInfo.HN,
                TitleTH: TrakcarepatientInfo.PatientInfo.TitleTH,
                GivenNameTH: TrakcarepatientInfo.PatientInfo.GivenNameTH,
                SurnameTH: TrakcarepatientInfo.PatientInfo.SurnameTH,
                TitleEN: TrakcarepatientInfo.PatientInfo.TitleEN,
                GivenNameEN: TrakcarepatientInfo.PatientInfo.GivenNameEN,
                SurnameEN: TrakcarepatientInfo.PatientInfo.SurnameEN,
                DateOfBirth: TrakcarepatientInfo.PatientInfo.DateOfBirth,
                Gender: TrakcarepatientInfo.PatientInfo.Gender,
                MobilePhone: TrakcarepatientInfo.PatientInfo.MobilePhone
            };
            const DatabasePatientInfo = await database_1.prismaProgest.claimants.findUnique({
                where: {
                    hn_insurerid: {
                        hn: findforUpdateBodyDto.PatientInfo.HN,
                        insurerid: findforUpdateBodyDto.PatientInfo.InsurerCode
                    }
                }, select: {
                    insurerid: true,
                    national_id: true,
                    passportnumber: true,
                    hn: true,
                    title_th: true,
                    givenname_th: true,
                    surname_th: true,
                    title_en: true,
                    givenname_en: true,
                    surname_en: true,
                    mobilephone: true,
                    dateofbirth: true,
                    gender: true,
                    patientid: true,
                    statusactive: true,
                    policynumber: true,
                    membershipid: true,
                    customerid: true
                }
            });
            let newFindforUpdatePatientDatabase = new findforupdate_patientinfo_dto_1.FindforUpdatePatientDatabase();
            if (DatabasePatientInfo) {
                newFindforUpdatePatientDatabase = {
                    PatientID: DatabasePatientInfo.patientid,
                    PID: DatabasePatientInfo.national_id,
                    PassportNumber: DatabasePatientInfo.passportnumber,
                    HN: DatabasePatientInfo.hn,
                    TitleTH: DatabasePatientInfo.title_th,
                    GivenNameTH: DatabasePatientInfo.givenname_th,
                    SurnameTH: DatabasePatientInfo.surname_th,
                    TitleEN: DatabasePatientInfo.title_en,
                    GivenNameEN: DatabasePatientInfo.givenname_en,
                    SurnameEN: DatabasePatientInfo.surname_en,
                    DateOfBirth: DatabasePatientInfo.dateofbirth,
                    Gender: DatabasePatientInfo.gender,
                    MobilePhone: DatabasePatientInfo.mobilephone,
                    PolicyNumber: DatabasePatientInfo.policynumber,
                    MembershipId: DatabasePatientInfo.membershipid
                };
            }
            const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
            this.addFormatHTTPStatus(newHttpMessageDto, ResponeTrakcareHTTPStatus.xstatusCode, ResponeTrakcareHTTPStatus.xmessage, ResponeTrakcareHTTPStatus.xerror);
            let newFindforUpdateDto = new findforupdate_patientinfo_dto_1.FindforUpdateDto();
            newFindforUpdateDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PatientInfo: {
                        PatientDatabase: newFindforUpdatePatientDatabase,
                        PatientTrakcare: newFindforUpdatePatientTrakcare
                    }
                }
            };
            return newFindforUpdateDto;
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
    async updatePatientInfoByHN(updateBodyDto) {
        let ResponeTrakcareHTTPStatus;
        try {
            const xHN = updateBodyDto.PatientInfo.HN;
            const xInsurerCode = updateBodyDto.PatientInfo.InsurerCode;
            if ((xHN) && (xInsurerCode)) {
                const PostUpdatePatient = {
                    national_id: updateBodyDto.PatientInfo.PID || undefined,
                    insurerid: updateBodyDto.PatientInfo.InsurerCode,
                    hn: updateBodyDto.PatientInfo.HN || undefined,
                    passportnumber: updateBodyDto.PatientInfo.PassportNumber || undefined,
                    title_th: updateBodyDto.PatientInfo.TitleTH || undefined,
                    givenname_th: updateBodyDto.PatientInfo.GivenNameTH || undefined,
                    surname_th: updateBodyDto.PatientInfo.SurnameTH || undefined,
                    title_en: updateBodyDto.PatientInfo.TitleEN || undefined,
                    givenname_en: updateBodyDto.PatientInfo.GivenNameEN || undefined,
                    surname_en: updateBodyDto.PatientInfo.SurnameEN || undefined,
                    mobilephone: updateBodyDto.PatientInfo.MobilePhone || undefined,
                    dateofbirth: updateBodyDto.PatientInfo.DateOfBirth || undefined,
                    gender: updateBodyDto.PatientInfo.Gender || undefined,
                    statusactive: true
                };
                const filteredData = Object.fromEntries(Object.entries(PostUpdatePatient).filter(([, value]) => value !== null && value !== undefined));
                const result = await database_1.prismaProgest.claimants.update({
                    where: {
                        hn_insurerid: {
                            hn: updateBodyDto.PatientInfo.HN,
                            insurerid: updateBodyDto.PatientInfo.InsurerCode,
                        },
                    }, data: filteredData
                });
                let httpcode;
                if (result) {
                    httpcode = common_1.HttpStatus.OK;
                }
                ResponeTrakcareHTTPStatus = {
                    xstatusCode: httpcode,
                    xmessage: 'User update successfully',
                    xerror: ''
                };
                const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
                this.addFormatHTTPStatus(newHttpMessageDto, ResponeTrakcareHTTPStatus.xstatusCode, ResponeTrakcareHTTPStatus.xmessage, ResponeTrakcareHTTPStatus.xerror);
                const resultupdate = await database_1.prismaProgest.claimants.findUnique({
                    where: {
                        hn_insurerid: {
                            hn: updateBodyDto.PatientInfo.HN,
                            insurerid: updateBodyDto.PatientInfo.InsurerCode
                        }
                    }, select: {
                        insurerid: true,
                        national_id: true,
                        passportnumber: true,
                        hn: true,
                        title_th: true,
                        givenname_th: true,
                        surname_th: true,
                        title_en: true,
                        givenname_en: true,
                        surname_en: true,
                        mobilephone: true,
                        dateofbirth: true,
                        gender: true,
                        patientid: true,
                        statusactive: true
                    }
                });
                const RequesetBody = {
                    PID: resultupdate.national_id,
                    PassportNumber: resultupdate.passportnumber,
                    HN: resultupdate.hn,
                    TitleTH: resultupdate.title_th,
                    GivenNameTH: resultupdate.givenname_th,
                    SurnameTH: resultupdate.surname_th,
                    title_en: resultupdate.title_en,
                    GivenNameEN: resultupdate.givenname_en,
                    SurnameEN: resultupdate.surname_en,
                    MobilePhone: resultupdate.mobilephone,
                    InsurerCode: +resultupdate.insurerid,
                    DateOfBirth: resultupdate.dateofbirth,
                    Gender: resultupdate.gender,
                    PatientID: resultupdate.patientid,
                };
                const newTransactionQueryPatientCreateDto = new create_patientinfo_dto_1.TransactionQueryPatientCreateDto();
                this.addFormatTransactionPatientCreateDto(newTransactionQueryPatientCreateDto, resultupdate.insurerid, resultupdate.patientid, resultupdate.national_id, resultupdate.passportnumber, resultupdate.hn, resultupdate.title_th, resultupdate.givenname_th, resultupdate.surname_th, resultupdate.title_en, resultupdate.givenname_en, resultupdate.surname_en, resultupdate.dateofbirth, resultupdate.gender, resultupdate.mobilephone);
                let newPatientUpdateDto = new update_patientinfo_dto_1.PatientUpdateDto();
                newPatientUpdateDto = {
                    HTTPStatus: newHttpMessageDto,
                    Result: {
                        PatientInfo: RequesetBody
                    }
                };
                return newPatientUpdateDto;
            }
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
    async SearchTransection(querySearchTransection) {
        try {
            const xPID = querySearchTransection.PatientInfo.PID;
            const xPassportNumber = querySearchTransection.PatientInfo.PassportNumber;
            const xHN = querySearchTransection.PatientInfo.HN;
            const xVN = querySearchTransection.PatientInfo.VN;
            const xInvoiceNumber = querySearchTransection.PatientInfo.InvoiceNumber;
            const xStatusClaimCode = querySearchTransection.PatientInfo.StatusClaimCode;
            const xServiceSettingCode = querySearchTransection.PatientInfo.ServiceSettingCode;
            const xVisitDatefrom = querySearchTransection.PatientInfo.VisitDatefrom ? this.formatDateToYYYYMMDD(querySearchTransection.PatientInfo.VisitDatefrom) : '';
            const xVisitDateto = querySearchTransection.PatientInfo.VisitDateto ? this.formatDateToYYYYMMDD(querySearchTransection.PatientInfo.VisitDateto) : '';
            const hasVisitDate = xVisitDatefrom && xVisitDateto && xVisitDatefrom !== "" && xVisitDateto !== "";
            const whereConditions = {
                ...(xHN ? { hn: { equals: xHN } } : {}),
                ...(xVN ? { vn: { equals: xVN } } : {}),
                ...(xServiceSettingCode ? { servicesettingcode: { equals: xServiceSettingCode } } : {}),
                ...(xInvoiceNumber ? { invoicenumber: { equals: xInvoiceNumber } } : {}),
                ...(xStatusClaimCode ? { claimstatuscode: { equals: xStatusClaimCode } } : {}),
                ...(xPID ? { claimants: { national_id: { equals: xPID } } } : {}),
                ...(xPassportNumber ? { claimants: { passportnumber: { equals: xPassportNumber } } } : {}),
                ...(hasVisitDate ? {
                    visitdate: {
                        gte: xVisitDatefrom,
                        lte: xVisitDateto
                    }
                } : {}),
            };
            const ResultQuery = await database_1.prismaProgest.transactionclaim.findMany({
                where: whereConditions,
                include: {
                    claimants: {
                        select: {
                            national_id: true,
                            passportnumber: true,
                            patientid: true,
                            title_th: true,
                            givenname_th: true,
                            surname_th: true,
                        }
                    }
                },
                orderBy: {
                    status_changed_at: 'asc',
                }
            });
            let xResultInfo;
            if (ResultQuery.length > 0) {
                console.log('------');
                xResultInfo = {
                    TransactionClaimInfo: ResultQuery.map((claim) => ({
                        RefId: claim.refid,
                        TransactionNo: claim.transactionno,
                        PID: claim.claimants.national_id || '',
                        PassportNumber: claim.claimants.passportnumber || '',
                        TitleTH: claim.claimants.title_th || '',
                        GivenNameTH: claim.claimants.givenname_th || '',
                        SurnameTH: claim.claimants.surname_th || '',
                        HN: claim.hn || '',
                        VN: claim.vn || '',
                        VisitDate: claim.visitdate || '',
                        ClaimNo: claim.claimno || '',
                        ClaimStatusDesc_EN: claim.claimstatusdesc_en,
                        ClaimStatusDesc_TH: claim.claimstatusdesc_th,
                        ClaimStatusCode: claim.claimstatuscode || '',
                        ClaimStatusDesc: claim.claimstatusdesc || '',
                        OccurrenceNo: claim.occurrenceno || '',
                        TotalApprovedAmount: claim.totalapprovedamount?.toString() || null,
                        TotalExcessAmount: claim.totalexcessamount ? claim.totalexcessamount.toString() : null,
                        IsReimbursement: claim.isreimbursement ?? false,
                        BatchNumber: claim.batchnumber || '',
                        InvoiceNumber: claim.invoicenumber || '',
                        PolicyTypeCode: claim.policytypecode || '',
                        IdType: claim.idtype || '',
                        IllnessTypeCode: claim.illnesstypecode || '',
                        ServiceSettingCode: claim.servicesettingcode || '',
                        SurgeryTypeCode: claim.surgerytypecode || '',
                        FurtherClaimNo: claim.furtherclaimno || '',
                        FurtherClaimId: claim.furtherclaimid || '',
                        AccidentDate: claim.accidentdate || '',
                        VisitDateTime: claim.visitdatetime || '',
                        CreateDate: claim.status_changed_at,
                        FurtherClaimVN: claim.furtherclaimvn || '',
                        VisitLocation: claim.visitlocation || '',
                        TotalBillAmount: claim.totalbillamount,
                        IsIPDDischarge: claim.isipddischarge,
                        PreauthReferClaimNo: claim.preauthreferclaimno,
                        PreauthReferOcc: claim.preauthreferocc,
                        ReferenceVN: claim.referencevn,
                        IsAdmission: claim.isadmission
                    })),
                };
            }
            else {
                const xQueryVisit = {
                    RefId: '',
                    TransactionNo: '',
                    PID: '',
                    PassportNumber: '',
                    TitleTH: '',
                    GivenNameTH: '',
                    SurnameTH: '',
                    HN: '',
                    VN: '',
                    VisitDate: '',
                    ClaimNo: '',
                    ClaimStatusCode: '',
                    ClaimStatusDesc: '',
                    OccurrenceNo: '',
                    TotalApprovedAmount: null,
                    TotalExcessAmount: null,
                    IsReimbursement: false,
                    BatchNumber: '',
                    InvoiceNumber: '',
                    PolicyTypeCode: '',
                    IdType: '',
                    IllnessTypeCode: '',
                    ServiceSettingCode: '',
                    SurgeryTypeCode: '',
                    FurtherClaimNo: '',
                    FurtherClaimId: '',
                    AccidentDate: '',
                    VisitDateTime: '',
                    CreateDate: '',
                    Runningdocument: 0,
                    FurtherClaimVN: '',
                    VisitLocation: '',
                    TotalBillAmount: '',
                    IsIPDDischarge: null,
                    PreauthReferClaimNo: '',
                    PreauthReferOcc: '',
                    ReferenceVN: '',
                    IsAdmission: null
                };
                xResultInfo = {
                    TransactionClaimInfo: [xQueryVisit],
                };
            }
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newResultTransactionClaimDto = new search__transection_dto_1.ResultTransactionClaimDto();
            newResultTransactionClaimDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultTransactionClaimDto;
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
    formatDateToYYYYMMDD(dateString) {
        if (!dateString) {
            return null;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    addFormatTransactionPatientCreateDto(data, inputInsurerCode, inputPatientID, inputPID, inputPassportNumber, inputHN, inputTitleTH, inputGivenNameTH, inputSurnameTH, inputTitleEN, inputGivenNameEN, inputSurnameEN, inputDateOfBirth, inputGender, inputMobilePhone) {
        if (data) {
            data.InsurerCode = inputInsurerCode || null;
            data.PatientID = inputPatientID || null;
            data.PID = inputPID || '';
            data.PassportNumber = inputPassportNumber || '';
            data.HN = inputHN || '';
            data.TitleTH = inputTitleTH || '';
            data.GivenNameTH = inputGivenNameTH || '';
            data.SurnameTH = inputSurnameTH || '';
            data.TitleEN = inputTitleEN || '';
            data.GivenNameEN = inputGivenNameEN || '';
            data.SurnameEN = inputSurnameEN || '';
            data.DateOfBirth = inputDateOfBirth || '';
            data.Gender = inputGender || null;
            data.MobilePhone = inputMobilePhone || null;
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
exports.PatientinfoService = PatientinfoService;
exports.PatientinfoService = PatientinfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService])
], PatientinfoService);
//# sourceMappingURL=patientinfo.service.js.map