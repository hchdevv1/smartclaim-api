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
exports.CheckEligibleService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const database_1 = require("../../database/database");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
const result_check_eligible_dto_1 = require("./dto/result-check-eligible.dto");
const lodash_1 = require("lodash");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let CheckEligibleService = class CheckEligibleService {
    constructor(httpService, trakcareService, utilsService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
        this.utilsService = utilsService;
    }
    async getEpisodeByHN(queryEligibleBodyDto) {
        let RequesetBody;
        try {
            RequesetBody = {
                xRefID: queryEligibleBodyDto.PatientInfo.RefId || '',
                xTransactionNo: queryEligibleBodyDto.PatientInfo.TransactionNo || '',
                xPID: queryEligibleBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryEligibleBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryEligibleBodyDto.PatientInfo.IdType || '',
                xServiceSettingCode: queryEligibleBodyDto.PatientInfo.ServiceSettingCode || '',
                xInsurerCode: queryEligibleBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryEligibleBodyDto.PatientInfo.HN || '',
                xVN: queryEligibleBodyDto.PatientInfo.VN || '',
                xVisitDatefrom: queryEligibleBodyDto.PatientInfo.VisitDatefrom || '',
                xVisitDateto: queryEligibleBodyDto.PatientInfo.VisitDateto || '',
            };
            if (RequesetBody.xServiceSettingCode === "IPD") {
                RequesetBody.xServiceSettingCode = "I";
            }
            else {
                RequesetBody.xServiceSettingCode = "O";
            }
            const TrakcarepatientInfo = await this.trakcareService.getEpisodeByHN(RequesetBody.xHN, RequesetBody.xVisitDatefrom, RequesetBody.xServiceSettingCode);
            const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
            const TrakcarepatientInfoStatusCode = TrakcarepatientInfo.statusCode;
            let newFindPatientInfoResultInfo = new result_check_eligible_dto_1.FindPatientInfoResultInfo();
            let newFindEpisodeInfoResultInfo = new result_check_eligible_dto_1.FindEpisodeInfoResultInfo();
            if (TrakcarepatientInfoStatusCode !== 200) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, TrakcarepatientInfo.message, TrakcarepatientInfo.message);
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                newFindPatientInfoResultInfo = {
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
                newFindEpisodeInfoResultInfo = TrakcarepatientInfo.EpisodeInfo.map(episode => ({
                    VN: episode.VN,
                    EpisodeType: episode.EpisodeType,
                    VisitDate: episode.VisitDate,
                    VisitTime: episode.VisitTime,
                    VisitDateTime: episode.VisitDateTime,
                    AccidentDate: episode.AccidentDate,
                    LocationCode: episode.LocationCode,
                    LocationDesc: episode.LocationDesc,
                    WardCode: episode.WardCode,
                    WardDesc: episode.WardDesc,
                    BedCode: episode.BedCode,
                    MainCareproviderCode: episode.MainCareproviderCode,
                    MainCareproviderDesc: episode.MainCareproviderDesc,
                    DoctorLicense: episode.DoctorLicense,
                    DoctorFirstName: episode.DoctorFirstName,
                    DoctorLastName: episode.DoctorLastName,
                    SurgeryType: episode.SurgeryType,
                }));
            }
            let newEligibleEpisodeListDto = new result_check_eligible_dto_1.EligibleEpisodeListDto();
            newEligibleEpisodeListDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PatientInfo: newFindPatientInfoResultInfo,
                    EpisodeInfo: newFindEpisodeInfoResultInfo
                }
            };
            return newEligibleEpisodeListDto;
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
    async checkeligible(checkEligibleBodyDto) {
        console.log(checkEligibleBodyDto);
        let RequesetBody, xResultInfo;
        try {
            RequesetBody = {
                xRefID: checkEligibleBodyDto.PatientInfo.RefId || '',
                xTransactionNo: checkEligibleBodyDto.PatientInfo.TransactionNo || '',
                xPID: checkEligibleBodyDto.PatientInfo.PID || '',
                xPassportnumber: checkEligibleBodyDto.PatientInfo.PassportNumber || '',
                xIdType: checkEligibleBodyDto.PatientInfo.IdType || '',
                xServiceSettingCode: checkEligibleBodyDto.PatientInfo.ServiceSettingCode || '',
                xInsurerCode: checkEligibleBodyDto.PatientInfo.InsurerCode || null,
                xHN: checkEligibleBodyDto.PatientInfo.HN || '',
                xFirstName: checkEligibleBodyDto.PatientInfo.GivenNameTH || '',
                xLastName: checkEligibleBodyDto.PatientInfo.SurnameTH || '',
                xDob: checkEligibleBodyDto.PatientInfo.DateOfBirth || '',
                xVN: checkEligibleBodyDto.PatientInfo.VN || '',
                xPolicyTypeCode: checkEligibleBodyDto.PatientInfo.PolicyTypeCode || '',
                xIllnessTypeCode: checkEligibleBodyDto.PatientInfo.IllnessTypeCode || '',
                xSurgeryTypeCode: checkEligibleBodyDto.PatientInfo.SurgeryTypeCode || '',
                xVisitDateTime: checkEligibleBodyDto.PatientInfo.VisitDateTime || '',
                xAccidentDate: checkEligibleBodyDto.PatientInfo.AccidentDate || '',
                xMembershipId: checkEligibleBodyDto.PatientInfo.MembershipId || '',
                xPolicyNumber: checkEligibleBodyDto.PatientInfo.PolicyNumber || '',
                xCustomerId: checkEligibleBodyDto.PatientInfo.CustomerId || '',
            };
            const xRefId = await this.generateRefId(RequesetBody.xVN, RequesetBody.xInsurerCode, RequesetBody.xServiceSettingCode);
            const xUsername = AIA_APIHopitalUsername;
            const xHospitalCode = await this.utilsService.EncryptAESECB(AIA_APIHospitalCode, AIA_APISecretkey);
            const xInsurerCode = RequesetBody.xInsurerCode;
            const xElectronicSignature = '';
            const xDataJsonType = 3;
            let DataJson_Id;
            const xDataJson_IdType = RequesetBody.xIdType;
            if (xDataJson_IdType === 'NATIONAL_ID') {
                DataJson_Id = RequesetBody.xPID;
            }
            else if (xDataJson_IdType === 'PASSPORT') {
                DataJson_Id = RequesetBody.xPassportnumber;
            }
            else if (xDataJson_IdType === 'MEMBERSHIP_ID') {
                DataJson_Id = RequesetBody.xMembershipId;
            }
            else if (xDataJson_IdType === 'POLICY_NUMBER') {
                DataJson_Id = RequesetBody.xPolicyNumber;
            }
            else if (xDataJson_IdType === 'CUSTOMER_ID') {
                DataJson_Id = RequesetBody.xCustomerId;
            }
            else {
                DataJson_Id = RequesetBody.xPID;
            }
            const xDataJson_Id = await this.utilsService.EncryptAESECB(DataJson_Id, AIA_APISecretkey);
            const xPolicyType = RequesetBody.xPolicyTypeCode;
            const xServiceSetting = RequesetBody.xServiceSettingCode;
            const xIllnessType = RequesetBody.xIllnessTypeCode;
            const xSurgeryType = RequesetBody.xSurgeryTypeCode;
            let xFirstName = RequesetBody.xFirstName;
            if (xFirstName) {
                xFirstName = await this.utilsService.EncryptAESECB(xFirstName, AIA_APISecretkey);
            }
            let xLastName = RequesetBody.xLastName;
            if (xLastName) {
                xLastName = await this.utilsService.EncryptAESECB(xLastName, AIA_APISecretkey);
            }
            let xDob = RequesetBody.xDob;
            if (xDob) {
                xDob = await this.utilsService.EncryptAESECB(xDob, AIA_APISecretkey);
            }
            const xVisitDateTime = RequesetBody.xVisitDateTime || '';
            const xAccidentDate = RequesetBody.xAccidentDate || '';
            console.log('-------');
            console.log(xDataJson_IdType);
            console.log('----^^^^^^---');
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
            console.log('-------> check eligi  body_DataJson');
            console.log(body);
            console.log('body_DataJson');
            console.log(body_DataJson);
            console.log(responsefromAIA.data.Result);
            const responeInputcode = responsefromAIA.data.Result.Code;
            if (responeInputcode !== 'S') {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, responsefromAIA.data.Result.MessageTh, responsefromAIA.data.Result.MessageTh);
            }
            else {
                let xInsuranceResult = new result_check_eligible_dto_1.InsuranceResult();
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
                    const convertCoverageType = this.convertCoverageListType(item.Type);
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
                let xInsuranceData = new result_check_eligible_dto_1.InsuranceData();
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
                this.ListPolicyNumber(xInsuranceData, RequesetBody.xHN, RequesetBody.xVN);
                console.log('--------> **' + 'DDDDdd%%%&&&&*-->');
                let xinsuranceCustomerDetail = new result_check_eligible_dto_1.InsuranceCustomerDetail();
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
            }
            let newResultCheckEligibleDto = new result_check_eligible_dto_1.ResultCheckEligibleDto();
            newResultCheckEligibleDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultCheckEligibleDto;
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
    async crateTransaction(queryCreateTransactionBodyDto) {
        let RequesetBody;
        let updateMembershipId, updatePolicyNumber, updateCustomerId, QueryUpdateClaimants, filteredQueryUpdateClaimants, QueryUpdatetransactionclaim, filteredQueryUpdatetransactionclaim;
        try {
            let newCreateTransactionDto = new result_check_eligible_dto_1.CreateTransactionDto();
            RequesetBody = {
                xRefID: queryCreateTransactionBodyDto.PatientInfo.RefId,
                xTransactionNo: queryCreateTransactionBodyDto.PatientInfo.TransactionNo,
                xPID: queryCreateTransactionBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryCreateTransactionBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryCreateTransactionBodyDto.PatientInfo.IdType || '',
                xServiceSettingCode: queryCreateTransactionBodyDto.PatientInfo.ServiceSettingCode || '',
                xInsurerCode: queryCreateTransactionBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryCreateTransactionBodyDto.PatientInfo.HN || '',
                xFirstName: queryCreateTransactionBodyDto.PatientInfo.GivenNameTH || '',
                xLastName: queryCreateTransactionBodyDto.PatientInfo.SurnameTH || '',
                xDob: queryCreateTransactionBodyDto.PatientInfo.DateOfBirth || '',
                xVN: queryCreateTransactionBodyDto.PatientInfo.VN || '',
                xPolicyTypeCode: queryCreateTransactionBodyDto.PatientInfo.PolicyTypeCode || '',
                xIllnessTypeCode: queryCreateTransactionBodyDto.PatientInfo.IllnessTypeCode || '',
                xSurgeryTypeCode: queryCreateTransactionBodyDto.PatientInfo.SurgeryTypeCode || '',
                xVisitDateTime: queryCreateTransactionBodyDto.PatientInfo.VisitDateTime || '',
                xAccidentDate: queryCreateTransactionBodyDto.PatientInfo.AccidentDate || '',
                xRunningdocument: queryCreateTransactionBodyDto.PatientInfo.Runningdocument || '00000',
                xFurtherClaimId: queryCreateTransactionBodyDto.PatientInfo.FurtherClaimId || '',
                xFurtherClaimNo: queryCreateTransactionBodyDto.PatientInfo.FurtherClaimNo || '',
                xFurtherClaimVN: queryCreateTransactionBodyDto.PatientInfo.FurtherClaimVN || '',
                xMembershipId: queryCreateTransactionBodyDto.PatientInfo.MembershipId || '',
                xPolicyNumber: queryCreateTransactionBodyDto.PatientInfo.PolicyNumber || '',
                xCustomerId: queryCreateTransactionBodyDto.PatientInfo.CustomerId || '',
                xVisitlocation: queryCreateTransactionBodyDto.PatientInfo.Visitlocation || '',
                xAccidentcauseover45days: queryCreateTransactionBodyDto.PatientInfo.Accidentcauseover45days || ''
            };
            let checkVisitNumberStatusCode = 200;
            if (RequesetBody.xFurtherClaimVN.length > 0) {
                const checkVisitNumberAvailable = await this.trakcareService.checkVisitNumberAvailable(RequesetBody.xHN, RequesetBody.xFurtherClaimVN);
                checkVisitNumberStatusCode = checkVisitNumberAvailable.statusCode ? checkVisitNumberAvailable.statusCode : 400;
            }
            if ((checkVisitNumberStatusCode !== 200)) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid VisitNumber', 'Invalid VisitNumber');
            }
            else {
                const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        refid: RequesetBody.xRefID,
                        transactionno: RequesetBody.xTransactionNo,
                    },
                });
                if (!existingRecord) {
                    const formattedEffectiveDate = RequesetBody.xVisitDateTime.split(' ')[0];
                    await database_1.prismaProgest.transactionclaim.create({
                        data: {
                            visitdate: formattedEffectiveDate,
                            insurerid: RequesetBody.xInsurerCode,
                            refid: RequesetBody.xRefID,
                            transactionno: RequesetBody.xTransactionNo,
                            hn: RequesetBody.xHN,
                            vn: RequesetBody.xVN,
                            idtype: RequesetBody.xIdType,
                            servicesettingcode: RequesetBody.xServiceSettingCode,
                            policytypecode: RequesetBody.xPolicyTypeCode,
                            illnesstypecode: RequesetBody.xIllnessTypeCode,
                            surgerytypecode: RequesetBody.xSurgeryTypeCode,
                            visitdatetime: RequesetBody.xVisitDateTime,
                            accidentdate: RequesetBody.xAccidentDate,
                            runningdocument: RequesetBody.xRunningdocument,
                            furtherclaimid: RequesetBody.xFurtherClaimId,
                            furtherclaimno: RequesetBody.xFurtherClaimNo,
                            furtherclaimvn: RequesetBody.xFurtherClaimVN,
                            membershipid: RequesetBody.xMembershipId,
                            policynumber: RequesetBody.xPolicyNumber,
                            customerid: RequesetBody.xCustomerId,
                            claimstatusdesc: 'waitting for discharge',
                            claimstatusdesc_en: 'waitting for discharge',
                            claimstatusdesc_th: 'รอการส่งเคลม',
                            visitlocation: RequesetBody.xVisitlocation,
                            accidentcauseover45days: RequesetBody.xAccidentcauseover45days
                        },
                    });
                    updateMembershipId = queryCreateTransactionBodyDto?.PatientInfo?.MembershipId;
                    updatePolicyNumber = queryCreateTransactionBodyDto?.PatientInfo?.PolicyNumber;
                    updateCustomerId = queryCreateTransactionBodyDto?.PatientInfo?.CustomerId;
                    QueryUpdateClaimants = {
                        ...(updateMembershipId ? { membershipid: updateMembershipId } : {}),
                        ...(updatePolicyNumber ? { policynumber: updatePolicyNumber } : {}),
                        ...(updateCustomerId ? { customerid: updateCustomerId } : {}),
                    };
                    if (QueryUpdateClaimants) {
                        filteredQueryUpdateClaimants = Object.fromEntries(Object.entries(QueryUpdateClaimants).filter(([, value]) => value !== null && value !== undefined));
                        await database_1.prismaProgest.claimants.update({
                            where: {
                                hn_insurerid: {
                                    hn: RequesetBody.xHN,
                                    insurerid: RequesetBody.xInsurerCode
                                },
                            }, data: filteredQueryUpdateClaimants
                        });
                    }
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                    newCreateTransactionDto = {
                        HTTPStatus: newHttpMessageDto,
                        Result: 'sucess'
                    };
                }
                else {
                    const updatexRefID = RequesetBody.xRefID;
                    const updatexTransactionNo = RequesetBody.xTransactionNo;
                    const updatexInsurerCode = RequesetBody.xInsurerCode;
                    const updatexIdType = RequesetBody.xIdType;
                    const updatexServiceSettingCode = RequesetBody.xServiceSettingCode;
                    const updatexHN = RequesetBody.xHN;
                    const updatexVN = RequesetBody.xVN;
                    const updatexPolicyTypeCode = RequesetBody.xPolicyTypeCode;
                    const updatexIllnessTypeCode = RequesetBody.xIllnessTypeCode;
                    const updatexSurgeryTypeCode = RequesetBody.xSurgeryTypeCode;
                    const updatexVisitDateTime = RequesetBody.xVisitDateTime;
                    const updatexAccidentDate = RequesetBody.xAccidentDate;
                    const updatexRunningdocument = RequesetBody.xRunningdocument;
                    const updatexFurtherClaimId = RequesetBody.xFurtherClaimId;
                    const updatexFurtherClaimNo = RequesetBody.xFurtherClaimNo;
                    const updatexFurtherClaimVN = RequesetBody.xFurtherClaimVN;
                    const updatexMembershipId = RequesetBody.xMembershipId;
                    const updatexPolicyNumber = RequesetBody.xPolicyNumber;
                    const updatexCustomerId = RequesetBody.updatexCustomerId;
                    const updatexVisitlocation = RequesetBody.xVisitlocation;
                    const updatexAccidentCauseOver45Days = RequesetBody.xAccidentCauseOver45Days;
                    const existingRecord = await database_1.prismaProgest.transactionclaim.findFirst({
                        where: {
                            refid: RequesetBody.xRefID,
                            transactionno: RequesetBody.xTransactionNo,
                        },
                    });
                    if (existingRecord) {
                        QueryUpdatetransactionclaim = {
                            ...(updatexTransactionNo ? { transactionno: updatexTransactionNo } : {}),
                            ...(updatexRefID ? { refid: updatexRefID } : {}),
                            ...(updatexHN ? { hn: updatexHN } : {}),
                            ...(updatexVN ? { vn: updatexVN } : {}),
                            ...(updatexInsurerCode ? { insurerid: updatexInsurerCode } : {}),
                            ...(updatexFurtherClaimId ? { furtherclaimid: updatexFurtherClaimId } : {}),
                            ...(updatexFurtherClaimNo ? { furtherclaimno: updatexFurtherClaimNo } : {}),
                            ...(updatexVisitDateTime ? { visitdatetime: updatexVisitDateTime } : {}),
                            ...(updatexAccidentDate ? { accidentdate: updatexAccidentDate } : {}),
                            ...(updatexPolicyTypeCode ? { policytypecode: updatexPolicyTypeCode } : {}),
                            ...(updatexIdType ? { idtype: updatexIdType } : {}),
                            ...(updatexIllnessTypeCode ? { illnesstypecode: updatexIllnessTypeCode } : {}),
                            ...(updatexServiceSettingCode ? { servicesettingcode: updatexServiceSettingCode } : {}),
                            ...(updatexSurgeryTypeCode ? { surgerytypecode: updatexSurgeryTypeCode } : {}),
                            ...(updatexRunningdocument ? { runningdocument: updatexRunningdocument } : {}),
                            ...(updatexFurtherClaimVN ? { furtherclaimvn: updatexFurtherClaimVN } : {}),
                            ...(updatexMembershipId ? { membershipid: updatexMembershipId } : {}),
                            ...(updatexPolicyNumber ? { policynumber: updatexPolicyNumber } : {}),
                            ...(updatexCustomerId ? { customerid: updatexCustomerId } : {}),
                            ...(updatexAccidentCauseOver45Days ? { accidentcauseover45days: updatexAccidentCauseOver45Days } : {}),
                            claimstatusdesc: 'waitting for discharge',
                            claimstatusdesc_en: 'waitting for discharge',
                            claimstatusdesc_th: 'รอการส่งเคลม',
                            ...(updatexVisitlocation ? { visitlocation: updatexVisitlocation } : {}),
                        };
                        if (QueryUpdatetransactionclaim) {
                            filteredQueryUpdatetransactionclaim = Object.fromEntries(Object.entries(QueryUpdatetransactionclaim).filter(([, value]) => value !== null && value !== undefined));
                        }
                        await database_1.prismaProgest.transactionclaim.update({
                            where: {
                                id: existingRecord.id,
                            },
                            data: filteredQueryUpdatetransactionclaim
                        });
                    }
                    updateMembershipId = queryCreateTransactionBodyDto?.PatientInfo?.MembershipId;
                    updatePolicyNumber = queryCreateTransactionBodyDto?.PatientInfo?.PolicyNumber;
                    updateCustomerId = queryCreateTransactionBodyDto?.PatientInfo?.CustomerId;
                    QueryUpdateClaimants = {
                        ...(updateMembershipId ? { membershipid: updateMembershipId } : {}),
                        ...(updatePolicyNumber ? { policynumber: updatePolicyNumber } : {}),
                        ...(updateCustomerId ? { customerid: updateCustomerId } : {}),
                    };
                    if (QueryUpdateClaimants) {
                        filteredQueryUpdateClaimants = Object.fromEntries(Object.entries(QueryUpdateClaimants).filter(([, value]) => value !== null && value !== undefined));
                        await database_1.prismaProgest.claimants.update({
                            where: {
                                hn_insurerid: {
                                    hn: RequesetBody.xHN,
                                    insurerid: RequesetBody.xInsurerCode
                                },
                            }, data: filteredQueryUpdateClaimants
                        });
                    }
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                }
            }
            newCreateTransactionDto = {
                HTTPStatus: newHttpMessageDto,
                Result: ''
            };
            return newCreateTransactionDto;
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
    async getListPolicyNo(queryEligibleBodyDto) {
        let RequesetBody;
        let newPolicyNumberListDto = new result_check_eligible_dto_1.PolicyNumberListDto();
        let newFindPolicyNumberInfo;
        try {
            RequesetBody = {
                xRefID: queryEligibleBodyDto.PatientInfo.RefId || '',
            };
            const existingRecord = await database_1.prismaProgest.policynumbertransactions.findMany({
                distinct: ['policynumber'],
                orderBy: {
                    policynumber: 'asc',
                },
                select: {
                    refid: true,
                    hn: true,
                    vn: true,
                    policynumber: true,
                },
            });
            if (!existingRecord) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid Policy Nuber', 'Invalid Policy Nuber');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                console.log(existingRecord);
                newFindPolicyNumberInfo = existingRecord.map((record) => ({
                    RefId: record.refid,
                    HN: record.hn,
                    VN: record.vn,
                    PolicyNo: record.policynumber,
                }));
            }
            newPolicyNumberListDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PolicyNumberInfo: newFindPolicyNumberInfo
                }
            };
            return newPolicyNumberListDto;
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
    async getListPolicyNoDetail(queryEligibleBodyDto) {
        let RequesetBody;
        let newPolicyNumberListDto = new result_check_eligible_dto_1.PolicyNumberListDto();
        let newFindPolicyNumberInfo;
        try {
            RequesetBody = {
                xRefID: queryEligibleBodyDto.PatientInfo.RefId || '',
            };
            const existingRecord = await database_1.prismaProgest.policynumbertransactions.findMany({
                where: {
                    refid: RequesetBody.xRefID,
                },
            });
            if (!existingRecord) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Invalid Policy Nuber', 'Invalid Policy Nuber');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                console.log(existingRecord);
                newFindPolicyNumberInfo = existingRecord.map((record) => ({
                    RefId: record.refid,
                    HN: record.hn,
                    VN: record.vn,
                    PolicyNo: record.policynumber,
                    RuleNo: record.rulenumber,
                    PlanName: record.planname,
                    PolicyNoType: record.policynumbertype,
                    MessageTH: record.messageth,
                }));
            }
            newPolicyNumberListDto = {
                HTTPStatus: newHttpMessageDto,
                Result: {
                    PolicyNumberInfo: newFindPolicyNumberInfo
                }
            };
            return newPolicyNumberListDto;
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
    convertCoverageListType(xType) {
        const coverageListTypes = {
            HS: "ผลประโยชน์ค่ารักษาพยาบาล",
            HB: "ผลประโยชน์ค่าชดเชยนอนรพ.",
            AI: "ผลประโยชน์ค่าชดเชย",
            HSBypass: "ผลประโยชน์ค่ารักษาพยาบาลที่ต้องตรวจสอบความคุ้มครองโดยเจ้าหน้าที่ AIA",
            Reimbursement: "การชำระเงินคืน"
        };
        return coverageListTypes[xType] || null;
    }
    async generateRefId(inputVN, inputInsurerCode, inputServiceSettingCode) {
        let count, xRefId;
        if ((inputVN) && (inputInsurerCode) && (inputServiceSettingCode)) {
            count = await database_1.prismaProgest.transactionclaim.count({
                where: {
                    vn: inputVN,
                    insurerid: +inputInsurerCode,
                    NOT: {
                        claimstatuscode: {
                            in: ['05', '06', '11']
                        }
                    }
                }
            });
            if (count === 0) {
                let countVNTotal = await database_1.prismaProgest.transactionclaim.count({
                    where: {
                        vn: inputVN,
                        insurerid: +inputInsurerCode,
                    }
                });
                countVNTotal = countVNTotal + 1;
                xRefId = inputVN + '-' + inputInsurerCode + '-' + inputServiceSettingCode + '-' + countVNTotal.toString().padStart(3, '0');
                xRefId = await this.utilsService.EncryptAESECB(xRefId, AIA_APISecretkey);
            }
            else {
                const xxRefId = await database_1.prismaProgest.transactionclaim.findFirst({
                    where: {
                        vn: inputVN,
                        insurerid: +inputInsurerCode
                    },
                    select: {
                        refid: true
                    }
                });
                xRefId = xxRefId.refid;
            }
        }
        else {
            xRefId = '';
        }
        return xRefId;
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
    async ListPolicyNumber(insuranceData, inputhn, inputvn) {
        if (!insuranceData?.CoverageList)
            return;
        const result = [];
        for (const coverage of insuranceData.CoverageList) {
            const type = coverage.Type || '';
            const messages = coverage.MessageList || [];
            for (const message of messages) {
                if (!message.PolicyNo || message.RuleNo === 'NOT_PASS')
                    continue;
                result.push({
                    PolicyNo: message.PolicyNo,
                    PlanName: message.PlanName ?? '',
                    MessageTh: message.MessageTh ?? '',
                    RuleNo: message.RuleNo ?? '',
                    Type: type,
                });
            }
        }
        if (result.length > 0) {
            await database_1.prismaProgest.policynumbertransactions.deleteMany({
                where: {
                    refid: insuranceData.RefId,
                },
            });
            const uniqueResult = (0, lodash_1.uniqBy)(result, (item) => `${item.PolicyNo}-${item.RuleNo}-${item.Type}`);
            const insertData = uniqueResult.map((item) => ({
                refid: insuranceData.RefId,
                hn: inputhn,
                vn: inputvn,
                policynumber: item.PolicyNo,
                rulenumber: item.RuleNo,
                planname: item.PlanName,
                policynumbertype: item.Type,
                messageth: item.MessageTh,
            }));
            await database_1.prismaProgest.policynumbertransactions.createMany({
                data: insertData,
                skipDuplicates: true,
            });
        }
    }
};
exports.CheckEligibleService = CheckEligibleService;
exports.CheckEligibleService = CheckEligibleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService,
        utils_service_1.UtilsService])
], CheckEligibleService);
//# sourceMappingURL=check-eligible.service.js.map