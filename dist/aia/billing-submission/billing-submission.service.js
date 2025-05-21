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
exports.BillingSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const utils_service_1 = require("../../utils/utils.service");
const database_1 = require("../../database/database");
const result_billing_submission_dto_1 = require("./dto/result-billing-submission.dto");
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let BillingSubmissionService = class BillingSubmissionService {
    constructor(httpService, utilsService) {
        this.httpService = httpService;
        this.utilsService = utilsService;
    }
    async Billingsubmission(queryBillingSubmissionBodyDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryBillingSubmissionBodyDto.PatientInfo.RefId,
                xTransactionNo: queryBillingSubmissionBodyDto.PatientInfo.TransactionNo,
                xPID: queryBillingSubmissionBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryBillingSubmissionBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryBillingSubmissionBodyDto.PatientInfo.IdType || '',
                xInsurerCode: queryBillingSubmissionBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryBillingSubmissionBodyDto.PatientInfo.HN || '',
                xVN: queryBillingSubmissionBodyDto.PatientInfo.VN || '',
                xInvoiceNumber: queryBillingSubmissionBodyDto.PatientInfo.InvoiceNumber,
                xDocumenttypeCode: queryBillingSubmissionBodyDto.PatientInfo.DocumenttypeCode,
                xRunningdocument: queryBillingSubmissionBodyDto.PatientInfo.Runningdocument
            };
            const QueryCreateClaimDocumentDtoBody = {
                RefId: RequesetBody.xRefId,
                TransactionNo: RequesetBody.xTransactionNo,
                InsurerCode: 13,
                HN: RequesetBody.xHN,
                VN: RequesetBody.xVN,
                DocumentName: '',
                DocumenttypeCode: RequesetBody.xDocumenttypeCode,
                UploadedBy: '',
                Runningdocument: 0
            };
            const getListDocumentByTransection = await this.utilsService.getListDocumentBillingByTransactionNo(QueryCreateClaimDocumentDtoBody);
            if (Array.isArray(getListDocumentByTransection) && getListDocumentByTransection.length > 0) {
                let newResultAttachDocListInfoDto = [];
                newResultAttachDocListInfoDto = await Promise.all(getListDocumentByTransection.map(async (doc) => {
                    const EncryptDocument = await this.utilsService.EncryptAESECB(doc.Base64Data, AIA_APISecretkey);
                    console.log(doc.DocName);
                    return {
                        Base64Data: EncryptDocument,
                        DocName: doc.DocName,
                    };
                }));
                const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
                const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
                const apiURL = `${AIA_APIURL}/SmartClaim/submitBilling`;
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
                    DataJson: body_DataJson,
                    InvoiceNumber: RequesetBody.xInvoiceNumber,
                    AttachDocList: newResultAttachDocListInfoDto
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
                    let xInsuranceResult = new result_billing_submission_dto_1.InsuranceResult();
                    xInsuranceResult = {
                        Code: responsefromAIA.Result.Code || '',
                        Message: responsefromAIA.Result.Message || '',
                        MessageTh: responsefromAIA.Result.MessageTh || '',
                    };
                    let xInsuranceData = new result_billing_submission_dto_1.InsuranceData();
                    xInsuranceData = {
                        RefId: responsefromAIA.Data.RefId,
                        TransactionNo: responsefromAIA.Data.TransactionNo,
                        InsurerCode: responsefromAIA.Data.InsurerCode,
                        BatchNumber: responsefromAIA.Data.BatchNumber || '',
                        InvoiceNumber: responsefromAIA.Data.InvoiceNumber || '',
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
                                batchnumber: responsefromAIA.Data.BatchNumber,
                                invoicenumber: responsefromAIA.Data.InvoiceNumber
                            },
                        });
                    }
                    xResultInfo = {
                        InsuranceResult: xInsuranceResult,
                        InsuranceData: xInsuranceData,
                    };
                    this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
                }
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'Billing file type not found.', 'Billing file type not found.');
            }
            let newResultBillingSubmissionDto = new result_billing_submission_dto_1.ResultBillingSubmissionDto();
            newResultBillingSubmissionDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultBillingSubmissionDto;
        }
        catch (error) {
            console.log(error);
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
exports.BillingSubmissionService = BillingSubmissionService;
exports.BillingSubmissionService = BillingSubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        utils_service_1.UtilsService])
], BillingSubmissionService);
//# sourceMappingURL=billing-submission.service.js.map