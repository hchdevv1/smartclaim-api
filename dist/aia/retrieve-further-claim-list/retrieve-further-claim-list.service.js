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
exports.RetrieveFurtherClaimListService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const http_status_message_dto_1 = require("../../utils/dto/http-status-message.dto");
const utils_service_1 = require("../../utils/utils.service");
const trakcare_service_1 = require("../../trakcare/trakcare.service");
const result_retrieve_further_claim_list_dto_1 = require("./dto/result-retrieve-further-claim-list.dto");
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
const AIA_APIURL = process.env.AIA_APIURL;
const AIA_APISecretkey = process.env.AIA_APISecretkey;
const AIA_APIHospitalCode = process.env.AIA_APIHospitalCode;
const AIA_APIHopitalUsername = process.env.AIA_APIHopitalUsername;
const AIA_APISubscription = process.env.AIA_APISubscription;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
let RetrieveFurtherClaimListService = class RetrieveFurtherClaimListService {
    constructor(httpService, trakcareService, utilsService) {
        this.httpService = httpService;
        this.trakcareService = trakcareService;
        this.utilsService = utilsService;
        this.formatDateBangkok = (dateString) => {
            const date = new Date(dateString);
            const bangkokDate = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Bangkok',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(date);
            return bangkokDate;
        };
    }
    async RetrieveFurtherClaim(queryRetrieveFurtherClaimBodyDto) {
        let xResultInfo;
        try {
            const RequesetBody = {
                xRefId: queryRetrieveFurtherClaimBodyDto.PatientInfo.RefId,
                xTransactionNo: queryRetrieveFurtherClaimBodyDto.PatientInfo.TransactionNo,
                xPID: queryRetrieveFurtherClaimBodyDto.PatientInfo.PID || '',
                xPassportnumber: queryRetrieveFurtherClaimBodyDto.PatientInfo.PassportNumber || '',
                xIdType: queryRetrieveFurtherClaimBodyDto.PatientInfo.IdType || '',
                xInsurerCode: queryRetrieveFurtherClaimBodyDto.PatientInfo.InsurerCode || null,
                xHN: queryRetrieveFurtherClaimBodyDto.PatientInfo.HN || '',
                xFirstName: queryRetrieveFurtherClaimBodyDto.PatientInfo.GivenNameTH || '',
                xLastName: queryRetrieveFurtherClaimBodyDto.PatientInfo.SurnameTH || '',
                xDob: queryRetrieveFurtherClaimBodyDto.PatientInfo.DateOfBirth || '',
                xVN: queryRetrieveFurtherClaimBodyDto.PatientInfo.VN || '',
                xVisitDateTime: queryRetrieveFurtherClaimBodyDto.PatientInfo.VisitDateTime || '',
                xAccidentDate: queryRetrieveFurtherClaimBodyDto.PatientInfo.AccidentDate || '',
            };
            const ObjAccessToken = await this.utilsService.requestAccessToken_AIA();
            const ObjAccessTokenKey = ObjAccessToken.accessTokenKey;
            const apiURL = `${AIA_APIURL}/SmartClaim/retrieveFurtherClaimList`;
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
            console.log(responsefromAIA);
            console.log(responsefromAIA.Data.FurtherClaimList);
            const responeInputcode = responsefromAIA.Result.Code;
            if (responeInputcode !== 'S') {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, responsefromAIA.Result.MessageTh, responsefromAIA.Result.MessageTh);
            }
            else {
                let xInsuranceResult = new result_retrieve_further_claim_list_dto_1.InsuranceResult();
                xInsuranceResult = {
                    Code: responsefromAIA.Result.Code || '',
                    Message: responsefromAIA.Result.Message || '',
                    MessageTh: responsefromAIA.Result.MessageTh || '',
                };
                const xFurtherClaimList = responsefromAIA.Data.FurtherClaimList
                    ? await Promise.all(responsefromAIA.Data.FurtherClaimList.map(async (item) => {
                        let furtherclaimvn;
                        const formattedDscDateTime = this.formatDateBangkok(item.DscDateTime);
                        const formattedVisitDateTime = this.formatDateBangkok(item.DscDateTime);
                        const formattedAccidentDate = this.formatDateBangkok(item.AccidentDate);
                        const TrakcarepatientInfo = await this.trakcareService.getEpisodeByHN(RequesetBody.xHN, formattedVisitDateTime, 'O');
                        if (TrakcarepatientInfo && TrakcarepatientInfo.EpisodeInfo && TrakcarepatientInfo.EpisodeInfo.length > 0) {
                            furtherclaimvn = TrakcarepatientInfo.EpisodeInfo[0].VN;
                        }
                        return {
                            FurtherClaimId: item.FurtherClaimId,
                            ClaimNo: item.ClaimNo,
                            OccurrenceNo: item.OccurrenceNo,
                            Icd10: item.Icd10,
                            DxName: item.DxName,
                            DscDateTime: formattedDscDateTime,
                            VisitDateTime: formattedVisitDateTime,
                            AccidentDate: formattedAccidentDate,
                            FurtherClaimVN: furtherclaimvn || ''
                        };
                    }))
                    : [];
                let xInsuranceData = new result_retrieve_further_claim_list_dto_1.InsuranceData();
                xInsuranceData = {
                    RefId: responsefromAIA.Data.RefId,
                    TransactionNo: responsefromAIA.Data.TransactionNo,
                    InsurerCode: responsefromAIA.Data.InsurerCode,
                    FurtherClaimList: xFurtherClaimList
                };
                xResultInfo = {
                    InsuranceResult: xInsuranceResult,
                    InsuranceData: xInsuranceData,
                };
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            let newResultRetrieveFurtherClaimDto = new result_retrieve_further_claim_list_dto_1.ResultRetrieveFurtherClaimDto();
            newResultRetrieveFurtherClaimDto = {
                HTTPStatus: newHttpMessageDto,
                Result: xResultInfo
            };
            return newResultRetrieveFurtherClaimDto;
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
exports.RetrieveFurtherClaimListService = RetrieveFurtherClaimListService;
exports.RetrieveFurtherClaimListService = RetrieveFurtherClaimListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        trakcare_service_1.TrakcareService,
        utils_service_1.UtilsService])
], RetrieveFurtherClaimListService);
//# sourceMappingURL=retrieve-further-claim-list.service.js.map