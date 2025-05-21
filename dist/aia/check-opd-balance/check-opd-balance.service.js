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
exports.CheckOpdBalanceService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const axios_1 = require("@nestjs/axios");
const generate_client_db_1 = require("../../../prisma/generate-client-db");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const http_status_message_service_1 = require("../../utils/http-status-message/http-status-message.service");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const utils_service_1 = require("../../utils/utils.service");
const result_listBillingCheckBalance_dto_1 = require("./dto/result-listBillingCheckBalance.dto");
const result_BillingCheckBalance_dto_1 = require("./dto/result-BillingCheckBalance.dto");
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let CheckOpdBalanceService = class CheckOpdBalanceService {
    constructor(httpService, trakcareService, utilsService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
        this.utilsService = utilsService;
    }
    async listBillingCheckBalance(xVN) {
        let arrayItemBillingCheckBalance;
        const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
        try {
            const TrakcarepatientInfo = await this.trakcareService.getOPDCheckBalance(xVN);
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
            let newResultlistBillingCheckBalanceDto = new result_listBillingCheckBalance_dto_1.ResultlistBillingCheckBalanceDto();
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
    async SubmitBillingCheckBalance(querySubmitOpdDischargeDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xInsurerCode: querySubmitOpdDischargeDto.PatientInfo.InsurerCode,
                xRefId: querySubmitOpdDischargeDto.PatientInfo.RefId,
                xTransactionNo: querySubmitOpdDischargeDto.PatientInfo.TransactionNo,
                xHN: querySubmitOpdDischargeDto.PatientInfo.HN,
                xVN: querySubmitOpdDischargeDto.PatientInfo.VN,
                xVisitDateTime: querySubmitOpdDischargeDto.PatientInfo.VisitDateTime,
                xAccidentDate: querySubmitOpdDischargeDto.PatientInfo.AccidentDate,
                xBillingInfo: querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.BillingInfo,
                xOrderItem: querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.OrderItem,
                xTotalBillAmount: querySubmitOpdDischargeDto.PatientInfo.ItemBillingCheckBalance.TotalBillAmount,
                xICD10: querySubmitOpdDischargeDto.PatientInfo.ICD10,
                xFurtherClaimId: querySubmitOpdDischargeDto.PatientInfo.FurtherClaimId,
                xAccidentCauseOver45Days: querySubmitOpdDischargeDto.PatientInfo.AccidentCauseOver45Days
            };
            let newResultPatientInfoDto = new result_BillingCheckBalance_dto_1.ResultPatientInfoDto;
            newResultPatientInfoDto = {
                Dob: '',
                Hn: '',
                Gender: ''
            };
            console.log('Patient done');
            let newResultVisitInfoDto = new result_BillingCheckBalance_dto_1.ResultVisitInfoDto();
            newResultVisitInfoDto = {
                FurtherClaimId: RequesetBody.xFurtherClaimId,
                AccidentCauseOver45Days: RequesetBody.xAccidentCauseOver45Days,
                AdditionalNote: '',
                AlcoholRelated: false,
                ChiefComplaint: '',
                ComaScore: '',
                DxFreeText: 'IsCheckClaimBalance',
                ExpectedDayOfRecovery: '',
                Height: '',
                PhysicalExam: '',
                PlanOfTreatment: '',
                Pregnant: false,
                PresentIllness: '',
                PreviousTreatmentDate: '',
                PreviousTreatmentDetail: '',
                PrivateCase: false,
                ProcedureFreeText: '',
                SignSymptomsDate: '',
                UnderlyingCondition: '',
                VisitDateTime: RequesetBody.xVisitDateTime,
                Vn: await this.utilsService.EncryptAESECB(RequesetBody.xVN, AIA_APISecretkey),
                Weight: ''
            };
            console.log(newResultVisitInfoDto);
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
            console.log('VitalSign done');
            let newQueryDiagnosisInfoDto = [];
            newQueryDiagnosisInfoDto = [{
                    DxName: 'Default Diagnosis for IsCheckClaimBalance',
                    DxType: 'OT',
                    Icd10: RequesetBody.xICD10,
                }];
            console.log('Diagnosis done');
            console.log(newQueryDiagnosisInfoDto);
            const newAccidentDetail = {
                "AccidentPlace": '4',
                "AccidentDate": RequesetBody.xAccidentDate,
                "CauseOfInjuryDetail": [
                    {
                        "CauseOfInjury": 'X599',
                        "CommentOfInjury": ''
                    }
                ],
                "InjuryDetail": [
                    {
                        "WoundType": 'Other',
                        "InjurySide": 'Left',
                        "InjuryArea": 'T149'
                    }
                ]
            };
            console.log('Accident done');
            let newResultProcedureInfoDto = [];
            newResultProcedureInfoDto = [{
                    Icd9: '',
                    ProcedureName: '',
                    ProcedureDate: '',
                }];
            console.log('Procedure done');
            let newResultInvestigationInfoDto = [];
            newResultInvestigationInfoDto = [{
                    InvestigationCode: '',
                    InvestigationGroup: '',
                    InvestigationName: '',
                    InvestigationResult: '',
                    ResultDateTime: ''
                }];
            console.log('Investigation done');
            const newResultOrderItemInfoDto = RequesetBody.xOrderItem.map((orderitem) => {
                return {
                    ItemId: orderitem.ItemId,
                    ItemName: orderitem.ItemName,
                    ItemAmount: '1',
                    Discount: orderitem.Discount,
                    Initial: orderitem.Initial,
                    LocalBillingCode: orderitem.LocalBillingCode,
                    LocalBillingName: orderitem.LocalBillingName,
                    Location: 'OPD',
                    NetAmount: orderitem.NetAmount,
                    SimbVersion: '1',
                    Terminology: 'SIMB'
                };
            });
            console.log('OrderItem done');
            let newResultDoctorInfoDto = [];
            newResultDoctorInfoDto = [{
                    DoctorLicense: '0000000000',
                    DoctorRole: 'OWNER',
                    DoctorFirstName: '',
                    DoctorLastName: '',
                }];
            console.log('Doctor done');
            const newResultBillingInfoDto = RequesetBody.xBillingInfo.map((billingInfo) => {
                return {
                    LocalBillingCode: billingInfo.LocalBillingCode,
                    LocalBillingName: billingInfo.LocalBillingName,
                    SimbBillingCode: billingInfo.SimbBillingCode,
                    PayorBillingCode: billingInfo.PayorBillingCode,
                    BillingInitial: billingInfo.BillingInitial,
                    BillingDiscount: billingInfo.BillingDiscount,
                    BillingNetAmount: billingInfo.BillingNetAmount,
                };
            });
            const newTotalBillAmount = RequesetBody.xTotalBillAmount;
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
            console.log('PSS done');
            const getListDocumentByTransection = await this.utilsService.getListDocumentDummy('dummy');
            let newResultAttachDocListInfoDto = [];
            newResultAttachDocListInfoDto = await Promise.all(getListDocumentByTransection.map(async (doc) => {
                const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
                return {
                    Base64Data: EncryptDocument,
                    DocName: doc.DocName,
                };
            }));
            let newResultDataJsonDto = new result_BillingCheckBalance_dto_1.ResultDataJsonDto();
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
                IsCheckClaimBalance: true,
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
                const responeInputMessageTh = responsefromAIA.Result.MessageTh;
                this.addFormatHTTPStatus(newHttpMessageDto, 400, responeInputMessageTh, responeInputcode);
            }
            else {
                const xCoverageList = responsefromAIA.Data.CoverageList ? responsefromAIA.Data.CoverageList.map((item) => {
                    const convertCoverageType = this.convertCoverageListType(item.type);
                    return {
                        Type: convertCoverageType,
                        Status: item.status,
                    };
                }) : [];
                xResultInfo = {
                    Status: responsefromAIA.Result.MessageTh,
                    ClaimNo: responsefromAIA.Data.ClaimNo,
                    Total: newResultDataJsonDto.TotalBillAmount,
                    TotalApprovedAmount: responsefromAIA.Data.TotalApprovedAmount,
                    TotalExcessAmount: responsefromAIA.Data.TotalExcessAmount,
                    CoverageList: xCoverageList
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultSubmitOpdDischargeDto = new result_BillingCheckBalance_dto_1.ResultSubmitOpdDischargeDto();
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
};
exports.CheckOpdBalanceService = CheckOpdBalanceService;
exports.CheckOpdBalanceService = CheckOpdBalanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService,
        utils_service_1.UtilsService])
], CheckOpdBalanceService);
//# sourceMappingURL=check-opd-balance.service.js.map