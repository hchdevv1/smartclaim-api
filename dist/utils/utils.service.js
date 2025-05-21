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
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const fs_1 = require("fs");
const util_1 = require("util");
const fs = require("fs");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const fs_2 = require("fs");
const database_1 = require("../database/database");
const generate_client_db_1 = require("../../prisma/generate-client-db");
const http_status_message_service_1 = require("./http-status-message/http-status-message.service");
const http_status_message_dto_1 = require("../utils/dto/http-status-message.dto");
const utils_dto_1 = require("./dto/utils.dto");
const claim_documents_dto_1 = require("./dto/claim-documents.dto");
const result_procedure_databse_dto_1 = require("./dto/result-procedure-databse.dto");
const result_diagnosis_databse_dto_1 = require("./dto/result-diagnosis-databse.dto");
const result_visit_databse_dto_1 = require("./dto/result-visit-databse.dto");
const result_accident_databse_dto_1 = require("./dto/result-accident-databse.dto");
const result_prebilling_databse_dto_1 = require("./dto/result-prebilling-databse.dto");
const result_concurnote_databse_dto_1 = require("./dto/result-concurnote-databse.dto");
const result_preauthnote_databse_dto_1 = require("./dto/result-preauthnote-databse.dto");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
const aesEcb = require('aes-ecb');
const AIA_APIURL = process.env.AIA_APIURL;
const API_CONTENTTYPE = process.env.API_CONTENTTYPE;
const AIA_APISubscription = process.env.AIA_APISubscription;
const AIA_APIMUserId = process.env.AIA_APIMUserId;
const AIA_APIMAppId = [process.env.AIA_APIMAppId];
const httpStatusMessageService = new http_status_message_service_1.HttpStatusMessageService();
const newHttpMessageDto = new http_status_message_dto_1.HttpMessageDto();
let UtilsService = class UtilsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    EncryptAESECB(text, APISecretkey) {
        const encryptText = aesEcb.encrypt(APISecretkey, text);
        return encryptText;
    }
    DecryptAESECB(text, APISecretkey) {
        const decryptText = aesEcb.decrypt(APISecretkey, text);
        return decryptText;
    }
    async requestAccessToken_AIA() {
        const aiaAccessTokenDTO = new utils_dto_1.aia_accessTokenDTO();
        const apiURL = `${AIA_APIURL}/TokenManager/requestAccessToken`;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(apiURL, { userId: AIA_APIMUserId, appId: AIA_APIMAppId }, {
                headers: {
                    'Content-Type': API_CONTENTTYPE,
                    'Ocp-Apim-Subscription-Key': AIA_APISubscription,
                },
            }));
            aiaAccessTokenDTO.tokenStatus = response.data.statusCode;
            aiaAccessTokenDTO.accessTokenKey = response.data.accessTokenInfo.accessToken;
            aiaAccessTokenDTO.tokenType = response.data.accessTokenInfo.tokenType;
            aiaAccessTokenDTO.expireIn = response.data.accessTokenInfo.expireIn;
            aiaAccessTokenDTO.tokenIssueTime = response.data.accessTokenInfo.tokenIssueTime;
            if (!aiaAccessTokenDTO || aiaAccessTokenDTO.accessTokenKey.length === 0) {
                throw new common_1.HttpException('AIA AccessToken not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            if (error instanceof generate_client_db_1.Prisma.PrismaClientInitializationError) {
                throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR))
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: httpStatusMessageService.getHttpStatusMessage((common_1.HttpStatus.INTERNAL_SERVER_ERROR))
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return aiaAccessTokenDTO;
    }
    async IllnessType(xInsurercode) {
        let illnessType;
        try {
            illnessType = await database_1.prismaProgest.illnesstype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    illnesstypecode: true,
                    illnesstypedesc: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newIllnessTypeDto = new utils_dto_1.IllnessTypeDto();
            newIllnessTypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: illnessType
            };
            if (!illnessType || illnessType.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'IllnessType not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newIllnessTypeDto;
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
    async IllnessSurgery(xInsurercode) {
        let illnessSurgery;
        try {
            illnessSurgery = await database_1.prismaProgest.illnesssurgery.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    iscode: true,
                    isdesc: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newIllnessSurgeryDto = new utils_dto_1.IllnessSurgeryDto();
            newIllnessSurgeryDto = {
                HTTPStatus: newHttpMessageDto,
                Result: illnessSurgery
            };
            if (!illnessSurgery || illnessSurgery.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'illnessSurgery not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newIllnessSurgeryDto;
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
    async policyType(xInsurercode) {
        let policytype;
        try {
            policytype = await database_1.prismaProgest.policytype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    policytypecode: true,
                    policytypedesc: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newPolicyTypeDto = new utils_dto_1.PolicyTypeDto();
            newPolicyTypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: policytype
            };
            if (!policytype || policytype.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Policytype not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newPolicyTypeDto;
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
    async getServiceSetting(xInsurercode) {
        let servicesetting;
        try {
            servicesetting = await database_1.prismaProgest.servicesetting.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    servicesettingcode: true,
                    servicesettingdesc: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newServiceSettingDto = new utils_dto_1.ServiceSettingDto();
            newServiceSettingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: servicesetting
            };
            if (!servicesetting || servicesetting.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Servicesetting not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newServiceSettingDto;
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
    async getServiceSettingIllnesstype(xInsurercode) {
        let servicesetting;
        try {
            servicesetting = await database_1.prismaProgest.servicesetting_illnesstype.findMany({
                where: {
                    insurerid: +xInsurercode
                },
                select: {
                    id: true,
                    servicesetting: {
                        select: {
                            servicesettingcode: true,
                            servicesettingdesc: true
                        },
                    },
                    illnesstype: {
                        select: {
                            illnesstypecode: true,
                            illnesstypedesc: true
                        }
                    }
                }, orderBy: {
                    id: 'asc'
                }
            });
            const servicesettingillnesstype = servicesetting.map((item) => {
                let SLDesc = '';
                if (item.servicesetting.servicesettingcode == "PRE") {
                    SLDesc = 'Pre-Authorization - ' + item.illnesstype.illnesstypedesc;
                }
                else if (item.servicesetting.servicesettingcode == "IPD") {
                    if (item.illnesstype.illnesstypecode == "DAY") {
                        SLDesc = item.illnesstype.illnesstypedesc;
                    }
                    else {
                        SLDesc = 'ผู้ป่วยใน - ' + item.illnesstype.illnesstypedesc;
                    }
                }
                else if (item.servicesetting.servicesettingcode == "OPD") {
                    SLDesc = 'ผู้ป่วยนอก - ' + item.illnesstype.illnesstypedesc;
                }
                return {
                    code: item.id,
                    description: SLDesc,
                    servicesettingcode: item.servicesetting.servicesettingcode,
                    servicesettingdesc: item.servicesetting.servicesettingdesc,
                    illnesstypecode: item.illnesstype.illnesstypecode,
                    illnesstypedesc: item.illnesstype.illnesstypedesc
                };
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newServiceSettingIllnessDto = new utils_dto_1.ServiceSettingIllnessDto();
            newServiceSettingIllnessDto = {
                HTTPStatus: newHttpMessageDto,
                Result: servicesettingillnesstype
            };
            if (!servicesetting || servicesetting.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Servicesetting not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newServiceSettingIllnessDto;
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
    async getClaimStatus(xInsurercode) {
        let claimstatus;
        try {
            claimstatus = await database_1.prismaProgest.claimstatus.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    claimstatuscode: true,
                    claimstatusdesc_en: true,
                    claimstatusdesc_th: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                }, orderBy: {
                    sort: 'asc'
                }
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newClaimStatusDto = new utils_dto_1.ClaimStatusDto();
            newClaimStatusDto = {
                HTTPStatus: newHttpMessageDto,
                Result: claimstatus
            };
            if (!claimstatus || claimstatus.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'claimstatus not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newClaimStatusDto;
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
    async getIdType(xInsurercode) {
        let idtype;
        try {
            idtype = await database_1.prismaProgest.idtype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    idtypecode: true,
                    idtypedesc_th: true,
                    idtypedesc_en: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newIdTypeDto = new utils_dto_1.IdTypeDto();
            newIdTypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: idtype
            };
            if (!idtype || idtype.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'IdType not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newIdTypeDto;
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
    async getClaimStatusCodeByDescription(xInsurercode, xDesc) {
        let claimstatus;
        try {
            claimstatus = await database_1.prismaProgest.claimstatus.findMany({
                where: {
                    claimstatusdesc_en: xDesc,
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    claimstatuscode: true,
                },
            });
            console.log('claimstatus-->');
            console.log(claimstatus);
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newClaimStatusDto = new utils_dto_1.ClaimStatusDto();
            newClaimStatusDto = {
                HTTPStatus: newHttpMessageDto,
                Result: claimstatus
            };
            if (!claimstatus || claimstatus.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'claimstatus not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newClaimStatusDto;
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
    async getDocumentType(xInsurercode) {
        let documenttype;
        try {
            documenttype = await database_1.prismaProgest.documenttype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    documenttypecode: true,
                    documenttypename: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newDocumentTypeDto = new utils_dto_1.DocumentTypeDto();
            newDocumentTypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: documenttype
            };
            if (!documenttype || documenttype.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'documenttype not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newDocumentTypeDto;
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
    async getdocumentTypeforAttachDocList(xInsurercode) {
        let documenttype;
        try {
            documenttype = await database_1.prismaProgest.documenttype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode },
                    documenttypecode: {
                        not: { in: ['003', '007', '008'] },
                    }
                },
                select: {
                    documenttypecode: true,
                    documenttypename: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newDocumentTypeDto = new utils_dto_1.DocumentTypeDto();
            newDocumentTypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: documenttype
            };
            if (!documenttype || documenttype.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'documenttype not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newDocumentTypeDto;
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
    async getAnesthesiaList(xInsurercode) {
        let anesthesialist;
        try {
            anesthesialist = await database_1.prismaProgest.anesthesialist.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    aneslistcode: true,
                    aneslistname: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newAnesthesiaListDto = new utils_dto_1.AnesthesiaListDto();
            newAnesthesiaListDto = {
                HTTPStatus: newHttpMessageDto,
                Result: anesthesialist
            };
            if (!anesthesialist || anesthesialist.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Anesthesia List not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newAnesthesiaListDto;
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
    async getOpeartionisPackage(xInsurercode) {
        let opeartionispackage;
        try {
            opeartionispackage = await database_1.prismaProgest.opeartionispackage.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    oiscode: true,
                    oisname: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newOpeartionisPackageDto = new utils_dto_1.OpeartionisPackageDto();
            newOpeartionisPackageDto = {
                HTTPStatus: newHttpMessageDto,
                Result: opeartionispackage
            };
            if (!opeartionispackage || opeartionispackage.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'OpeartionisPackage not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newOpeartionisPackageDto;
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
    async getIndicationsForAdmission(xInsurercode) {
        let indicationsforadmission;
        try {
            indicationsforadmission = await database_1.prismaProgest.indicationsforadmission.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    ifacode: true,
                    ifaname: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newIndicationsForAdmissionDto = new utils_dto_1.IndicationsForAdmissionDto();
            newIndicationsForAdmissionDto = {
                HTTPStatus: newHttpMessageDto,
                Result: indicationsforadmission
            };
            if (!indicationsforadmission || indicationsforadmission.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Indications for admission not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newIndicationsForAdmissionDto;
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
    async getListPackageBundle() {
        let packageBundle;
        try {
            packageBundle = await database_1.prismaProgest.$queryRaw `SELECT  packagecode, packagedesc
	  FROM public.packagebundle
	  group by packagecode, packagedesc
    order by packagecode asc`;
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newListPackageBundleDto = new utils_dto_1.ListPackageBundleDto();
            newListPackageBundleDto = {
                HTTPStatus: newHttpMessageDto,
                Result: packageBundle
            };
            if (!packageBundle || packageBundle.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'List PackageBundle not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newListPackageBundleDto;
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
    async getPackageBundle(xPackageCode) {
        let packagebundle;
        try {
            packagebundle = await database_1.prismaProgest.packagebundle.findMany({
                where: {
                    packagecode: xPackageCode
                },
                select: {
                    packagecode: true,
                    packagedesc: true,
                    localbillingcode: true,
                    localbillingname: true,
                    simbbillingcode: true,
                    payorbillingcode: true,
                    billinginitial: true,
                    billingdiscount: true,
                    billingnetamount: true,
                    totalbillamount: true
                }, orderBy: {
                    id: 'desc'
                }
            });
            if (!packagebundle || packagebundle.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'PackageBundle not found..', '');
                return { HTTPStatus: newHttpMessageDto };
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            const newPackageBundleResultInfo = new utils_dto_1.PackageBundleResultInfo();
            newPackageBundleResultInfo.packagecode = packagebundle[0].packagecode;
            newPackageBundleResultInfo.packagedesc = packagebundle[0].packagedesc;
            newPackageBundleResultInfo.packagebundleinfo = packagebundle.map((item) => {
                const packageInfo = new utils_dto_1.ResultPackageBundleInfo();
                packageInfo.localbillingcode = item.localbillingcode;
                packageInfo.localbillingname = item.localbillingname;
                packageInfo.simbbillingcode = item.simbbillingcode;
                packageInfo.payorbillingcode = item.payorbillingcode;
                packageInfo.billinginitial = item.billinginitial;
                packageInfo.billingdiscount = item.billingdiscount;
                packageInfo.billingnetamount = item.billingnetamount;
                packageInfo.totalbillamount = item.totalbillamount;
                return packageInfo;
            });
            const newPackageBundleDto = {
                HTTPStatus: newHttpMessageDto,
                Result: newPackageBundleResultInfo,
            };
            if (!packagebundle || packagebundle.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'PackageBundle not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newPackageBundleDto;
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
    async getvisitformDatabase(queryVisitDatabaseBodyDto) {
        const xRefId = queryVisitDatabaseBodyDto.RefId;
        const xTransactionNo = queryVisitDatabaseBodyDto.TransactionNo;
        const xVN = queryVisitDatabaseBodyDto.VN;
        let newResultOpdDischargeVisitDto = new result_visit_databse_dto_1.ResultOpdDischargeVisitDto();
        const visittransactionclaim = await database_1.prismaProgest.transactionclaim.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                previoustreatmentdate: true,
                previoustreatmentdetail: true,
                isreimbursement: true, batchnumber: true,
                invoicenumber: true, otherinsurer: true, furtherclaimid: true,
                furtherclaimno: true, furtherclaimvn: true,
            },
        });
        const visittransactionsInfo = await database_1.prismaProgest.medicaltransactions.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                refid: true,
                dxfreetext: true,
                presentillness: true, chiefcomplaint: true,
                accidentcauseover45days: true, underlyingcondition: true,
                physicalexam: true, planoftreatment: true, procedurefreetext: true,
                additionalnote: true, signsymptomsdate: true, comascore: true,
                expecteddayofrecovery: true, pregnant: true, alcoholrelated: true,
                haveaccidentinjurydetail: true, haveaccidentcauseofinjurydetail: true, haveprocedure: true,
                privatecase: true, visitdatetime: true,
                weight: true, height: true, vn: true
            },
        });
        if (visittransactionsInfo) {
            const visitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            visitDatabaseResultInfo.VisitInfo = {
                FurtherClaimId: visittransactionclaim.furtherclaimid,
                AccidentCauseOver45Days: visittransactionsInfo.accidentcauseover45days,
                AdditionalNote: visittransactionsInfo.additionalnote,
                AlcoholRelated: visittransactionsInfo.alcoholrelated,
                ChiefComplaint: visittransactionsInfo.chiefcomplaint,
                ComaScore: visittransactionsInfo.comascore,
                DxFreeText: visittransactionsInfo.dxfreetext,
                ExpectedDayOfRecovery: visittransactionsInfo.expecteddayofrecovery,
                Height: visittransactionsInfo.height,
                PhysicalExam: visittransactionsInfo.physicalexam,
                PlanOfTreatment: visittransactionsInfo.planoftreatment,
                Pregnant: visittransactionsInfo.pregnant,
                PresentIllness: visittransactionsInfo.presentillness,
                PreviousTreatmentDate: visittransactionclaim.previoustreatmentdate,
                PreviousTreatmentDetail: visittransactionclaim.previoustreatmentdetail,
                PrivateCase: visittransactionsInfo.privatecase,
                ProcedureFreeText: visittransactionsInfo.procedurefreetext,
                SignSymptomsDate: visittransactionsInfo.signsymptomsdate,
                UnderlyingCondition: visittransactionsInfo.underlyingcondition,
                VisitDateTime: visittransactionsInfo.visitdatetime,
                VN: visittransactionsInfo.vn,
                Weight: visittransactionsInfo.weight,
            };
            if (!visitDatabaseResultInfo.VisitInfo) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'VisitInfo not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            newResultOpdDischargeVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: visitDatabaseResultInfo
            };
        }
        else {
            let newQueryVisitDatabse = new result_visit_databse_dto_1.QueryVisitDatabse();
            newQueryVisitDatabse = {
                AccidentCauseOver45Days: '',
                AdditionalNote: '',
                AlcoholRelated: false,
                ChiefComplaint: '',
                ComaScore: '',
                DxFreeText: '',
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
                VN: '',
            };
            let newVisitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            newVisitDatabaseResultInfo = { VisitInfo: newQueryVisitDatabse };
            newResultOpdDischargeVisitDto =
                {
                    HTTPStatus: {
                        statusCode: 400, message: 'VisitInfo not found', error: ''
                    },
                    Result: newVisitDatabaseResultInfo
                };
        }
        return newResultOpdDischargeVisitDto;
    }
    async getvisitIPDformDatabase(queryVisitDatabaseBodyDto) {
        const xRefId = queryVisitDatabaseBodyDto.RefId;
        const xTransactionNo = queryVisitDatabaseBodyDto.TransactionNo;
        const xVN = queryVisitDatabaseBodyDto.VN;
        let newResultOpdDischargeVisitDto = new result_visit_databse_dto_1.ResultOpdDischargeVisitDto();
        const visittransactionclaim = await database_1.prismaProgest.transactionclaim.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                previoustreatmentdate: true,
                previoustreatmentdetail: true,
                isreimbursement: true, batchnumber: true,
                invoicenumber: true, otherinsurer: true, furtherclaimid: true,
                furtherclaimno: true, furtherclaimvn: true,
                preauthreferclaimno: true, preauthreferocc: true,
            },
        });
        const visittransactionsInfo = await database_1.prismaProgest.medicaltransactions.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                refid: true,
                dxfreetext: true,
                presentillness: true, chiefcomplaint: true,
                accidentcauseover45days: true, underlyingcondition: true,
                physicalexam: true, planoftreatment: true, procedurefreetext: true,
                additionalnote: true, signsymptomsdate: true, comascore: true,
                expecteddayofrecovery: true, pregnant: true, alcoholrelated: true,
                haveaccidentinjurydetail: true, haveaccidentcauseofinjurydetail: true, haveprocedure: true,
                privatecase: true, visitdatetime: true,
                weight: true, height: true, vn: true,
                expectedadmitdate: true, preauthreferclaimno: true,
                preauthreferocc: true, indicationforadmission: true,
                dscdatetime: true, ispackage: true,
                totalestimatedcost: true, anesthesialist: true,
                accidentdate: true,
                isipddischarge: true,
                admitdatetime: true,
                previoustreatmentdate: true,
                previoustreatmentdetail: true,
            },
        });
        if (visittransactionsInfo) {
            const visitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            visitDatabaseResultInfo.VisitInfo = {
                FurtherClaimId: visittransactionclaim.furtherclaimid,
                AccidentCauseOver45Days: visittransactionsInfo.accidentcauseover45days,
                AdditionalNote: visittransactionsInfo.additionalnote,
                AlcoholRelated: visittransactionsInfo.alcoholrelated,
                ChiefComplaint: visittransactionsInfo.chiefcomplaint,
                ComaScore: visittransactionsInfo.comascore,
                DxFreeText: visittransactionsInfo.dxfreetext,
                ExpectedDayOfRecovery: visittransactionsInfo.expecteddayofrecovery,
                Height: visittransactionsInfo.height,
                PhysicalExam: visittransactionsInfo.physicalexam,
                PlanOfTreatment: visittransactionsInfo.planoftreatment,
                Pregnant: visittransactionsInfo.pregnant,
                PresentIllness: visittransactionsInfo.presentillness,
                PreviousTreatmentDate: visittransactionsInfo.previoustreatmentdate,
                PreviousTreatmentDetail: visittransactionsInfo.previoustreatmentdetail,
                PrivateCase: visittransactionsInfo.privatecase,
                ProcedureFreeText: visittransactionsInfo.procedurefreetext,
                SignSymptomsDate: visittransactionsInfo.signsymptomsdate,
                UnderlyingCondition: visittransactionsInfo.underlyingcondition,
                VisitDateTime: visittransactionsInfo.visitdatetime,
                VN: visittransactionsInfo.vn,
                Weight: visittransactionsInfo.weight,
                ExpectedAdmitDate: visittransactionsInfo.expectedadmitdate,
                PreauthReferClaimNo: visittransactionsInfo.preauthreferclaimno,
                PreauthReferOcc: visittransactionsInfo.preauthreferocc,
                IndicationForAdmission: visittransactionsInfo.indicationforadmission,
                DscDateTime: visittransactionsInfo.dscdatetime,
                IsPackage: visittransactionsInfo.ispackage,
                TotalEstimatedCost: visittransactionsInfo.totalestimatedcost,
                AnesthesiaList: visittransactionsInfo.anesthesialist,
                AccidentDate: visittransactionsInfo.accidentdate,
                IsIPDDischarge: visittransactionsInfo.isipddischarge,
                AdmitDateTime: visittransactionsInfo.admitdatetime
            };
            if (!visitDatabaseResultInfo.VisitInfo) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'VisitInfo not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            newResultOpdDischargeVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: visitDatabaseResultInfo
            };
        }
        else {
            let newQueryVisitDatabse = new result_visit_databse_dto_1.QueryVisitDatabse();
            newQueryVisitDatabse = {
                AccidentCauseOver45Days: '',
                AdditionalNote: '',
                AlcoholRelated: false,
                ChiefComplaint: '',
                ComaScore: '',
                DxFreeText: '',
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
                VN: '',
                TotalEstimatedCost: '',
                IsIPDDischarge: null,
                AdmitDateTime: ''
            };
            let newVisitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            newVisitDatabaseResultInfo = { VisitInfo: newQueryVisitDatabse };
            newResultOpdDischargeVisitDto =
                {
                    HTTPStatus: {
                        statusCode: 400, message: 'VisitInfo not found', error: ''
                    },
                    Result: newVisitDatabaseResultInfo
                };
        }
        return newResultOpdDischargeVisitDto;
    }
    async getPrevisitformDatabase(queryVisitDatabaseBodyDto) {
        const xRefId = queryVisitDatabaseBodyDto.RefId;
        const xTransactionNo = queryVisitDatabaseBodyDto.TransactionNo;
        const xVN = queryVisitDatabaseBodyDto.VN;
        let newResultOpdDischargeVisitDto = new result_visit_databse_dto_1.ResultOpdDischargeVisitDto();
        const visittransactionclaim = await database_1.prismaProgest.transactionclaim.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                previoustreatmentdate: true,
                previoustreatmentdetail: true,
                isreimbursement: true, batchnumber: true,
                invoicenumber: true, otherinsurer: true, furtherclaimid: true,
                furtherclaimno: true, furtherclaimvn: true,
                preauthreferclaimno: true, preauthreferocc: true,
            },
        });
        const visittransactionsInfo = await database_1.prismaProgest.medicaltransactions.findFirst({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                refid: true,
                dxfreetext: true,
                presentillness: true, chiefcomplaint: true,
                accidentcauseover45days: true, underlyingcondition: true,
                physicalexam: true, planoftreatment: true, procedurefreetext: true,
                additionalnote: true, signsymptomsdate: true, comascore: true,
                expecteddayofrecovery: true, pregnant: true, alcoholrelated: true,
                haveaccidentinjurydetail: true, haveaccidentcauseofinjurydetail: true, haveprocedure: true,
                privatecase: true, visitdatetime: true,
                weight: true, height: true, vn: true,
                expectedadmitdate: true, preauthreferclaimno: true,
                preauthreferocc: true, indicationforadmission: true,
                dscdatetime: true, ispackage: true,
                totalestimatedcost: true, anesthesialist: true,
                accidentdate: true,
                isipddischarge: true,
                admitdatetime: true,
                previoustreatmentdate: true,
                previoustreatmentdetail: true
            },
        });
        if (visittransactionsInfo) {
            const visitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            visitDatabaseResultInfo.VisitInfo = {
                FurtherClaimId: visittransactionclaim.furtherclaimid,
                AccidentCauseOver45Days: visittransactionsInfo.accidentcauseover45days,
                AdditionalNote: visittransactionsInfo.additionalnote,
                AlcoholRelated: visittransactionsInfo.alcoholrelated,
                ChiefComplaint: visittransactionsInfo.chiefcomplaint,
                ComaScore: visittransactionsInfo.comascore,
                DxFreeText: visittransactionsInfo.dxfreetext,
                ExpectedDayOfRecovery: visittransactionsInfo.expecteddayofrecovery,
                Height: visittransactionsInfo.height,
                PhysicalExam: visittransactionsInfo.physicalexam,
                PlanOfTreatment: visittransactionsInfo.planoftreatment,
                Pregnant: visittransactionsInfo.pregnant,
                PresentIllness: visittransactionsInfo.presentillness,
                PreviousTreatmentDate: visittransactionsInfo.previoustreatmentdate,
                PreviousTreatmentDetail: visittransactionsInfo.previoustreatmentdetail,
                PrivateCase: visittransactionsInfo.privatecase,
                ProcedureFreeText: visittransactionsInfo.procedurefreetext,
                SignSymptomsDate: visittransactionsInfo.signsymptomsdate,
                UnderlyingCondition: visittransactionsInfo.underlyingcondition,
                VisitDateTime: visittransactionsInfo.visitdatetime,
                VN: visittransactionsInfo.vn,
                Weight: visittransactionsInfo.weight,
                ExpectedAdmitDate: visittransactionsInfo.expectedadmitdate,
                PreauthReferClaimNo: visittransactionsInfo.preauthreferclaimno,
                PreauthReferOcc: visittransactionsInfo.preauthreferocc,
                IndicationForAdmission: visittransactionsInfo.indicationforadmission,
                DscDateTime: visittransactionsInfo.dscdatetime,
                IsPackage: visittransactionsInfo.ispackage,
                TotalEstimatedCost: visittransactionsInfo.totalestimatedcost,
                AnesthesiaList: visittransactionsInfo.anesthesialist,
                AccidentDate: visittransactionsInfo.accidentdate,
                IsIPDDischarge: visittransactionsInfo.isipddischarge,
                AdmitDateTime: visittransactionsInfo.admitdatetime
            };
            if (!visitDatabaseResultInfo.VisitInfo) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'VisitInfo not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            newResultOpdDischargeVisitDto = {
                HTTPStatus: newHttpMessageDto,
                Result: visitDatabaseResultInfo
            };
        }
        else {
            let newQueryVisitDatabse = new result_visit_databse_dto_1.QueryVisitDatabse();
            newQueryVisitDatabse = {
                AccidentCauseOver45Days: '',
                AdditionalNote: '',
                AlcoholRelated: false,
                ChiefComplaint: '',
                ComaScore: '',
                DxFreeText: '',
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
                VN: '',
                TotalEstimatedCost: '',
                IsIPDDischarge: null,
                AdmitDateTime: ''
            };
            let newVisitDatabaseResultInfo = new result_visit_databse_dto_1.VisitDatabaseResultInfo();
            newVisitDatabaseResultInfo = { VisitInfo: newQueryVisitDatabse };
            newResultOpdDischargeVisitDto =
                {
                    HTTPStatus: {
                        statusCode: 400, message: 'VisitInfo not found', error: ''
                    },
                    Result: newVisitDatabaseResultInfo
                };
        }
        return newResultOpdDischargeVisitDto;
    }
    async getProcedureformDatabase(queryProcedeureDatabaseBodyDto) {
        const xRefId = queryProcedeureDatabaseBodyDto.RefId;
        const xTransactionNo = queryProcedeureDatabaseBodyDto.TransactionNo;
        const xVN = queryProcedeureDatabaseBodyDto.VN;
        let newResultOpdDischargeProcedurDto = new result_procedure_databse_dto_1.ResultOpdDischargeProcedurDto();
        const proceduretransactionsInfo = await database_1.prismaProgest.proceduretransactions.findMany({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                icd9: true,
                procedurename: true,
                proceduredate: true,
            },
        });
        if (proceduretransactionsInfo) {
            const procedureInfoInstance = new result_procedure_databse_dto_1.ProcedeureDatabaseResultInfo();
            procedureInfoInstance.ProcedureInfo = proceduretransactionsInfo.map(item => ({
                Icd9: item.icd9,
                ProcedureName: item.procedurename,
                ProcedureDate: item.proceduredate,
            }));
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultOpdDischargeProcedurDto = {
                HTTPStatus: newHttpMessageDto,
                Result: procedureInfoInstance
            };
            if (!proceduretransactionsInfo || proceduretransactionsInfo.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Procedure not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultOpdDischargeProcedurDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'Procedure not found', error: ''
                    },
                    Result: {
                        ProcedureInfo: [{
                                Icd9: '',
                                ProcedureName: '',
                                ProcedureDate: ''
                            }
                        ]
                    }
                };
        }
        return newResultOpdDischargeProcedurDto;
    }
    async getDiagnosisformDatabase(queryDiagnosisDatabaseBodyDto) {
        const xRefId = queryDiagnosisDatabaseBodyDto.RefId;
        const xTransactionNo = queryDiagnosisDatabaseBodyDto.TransactionNo;
        const xVN = queryDiagnosisDatabaseBodyDto.VN;
        let newResultPreDiagnosisDto = new result_diagnosis_databse_dto_1.ResultPreDiagnosisDto();
        const diagnosistransactionsInfo = await database_1.prismaProgest.diagnosistransactions.findMany({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                icd10: true,
                dxname: true,
                dxtype: true,
            },
        });
        if (diagnosistransactionsInfo) {
            const prediagnosisInfoInstance = new result_diagnosis_databse_dto_1.PreDiagnosisDatabaseResultInfo();
            prediagnosisInfoInstance.DiagnosisInfo = diagnosistransactionsInfo.map(item => ({
                Icd10: item.icd10,
                DxName: item.dxname,
                DxType: item.dxtype,
            }));
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultPreDiagnosisDto = {
                HTTPStatus: newHttpMessageDto,
                Result: prediagnosisInfoInstance
            };
            if (!diagnosistransactionsInfo || diagnosistransactionsInfo.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Procedure not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultPreDiagnosisDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'Procedure not found', error: ''
                    },
                    Result: {
                        DiagnosisInfo: [{
                                Icd10: '',
                                DxName: '',
                                DxType: ''
                            }
                        ]
                    }
                };
        }
        return newResultPreDiagnosisDto;
    }
    async getAccidentformDatabase(queryAccidentDatabaseBodyDto) {
        const xRefId = queryAccidentDatabaseBodyDto.RefId;
        const xTransactionNo = queryAccidentDatabaseBodyDto.TransactionNo;
        const xVN = queryAccidentDatabaseBodyDto.VN;
        let newResultAccidentDatabaseDto = new result_accident_databse_dto_1.ResultAccidentDatabaseDto();
        const accidentTransactionInfo = await database_1.prismaProgest.accidenttransactions.findFirst({
            where: {
                refid: xRefId,
                transactionno: xTransactionNo,
                vn: xVN,
            },
            select: {
                accidentplace: true,
                accidentdate: true,
                causeofinjurydetail: {
                    select: {
                        causeofinjury: true,
                        commentofinjury: true,
                    },
                },
                injurydetail: {
                    select: {
                        woundtype: true,
                        injuryside: true,
                        injuryarea: true,
                    },
                },
            },
        });
        if (accidentTransactionInfo) {
            const accidentInfoInstance = new result_accident_databse_dto_1.AccidentDatabaseResultInfo();
            accidentInfoInstance.AccidentDetailInfo = {
                AccidentPlace: accidentTransactionInfo.accidentplace || '',
                AccidentDate: accidentTransactionInfo.accidentdate || '',
                CauseOfInjuryDetail: accidentTransactionInfo.causeofinjurydetail.map(cause => ({
                    CauseOfInjury: cause.causeofinjury || '',
                    CommentOfInjury: cause.commentofinjury || ''
                })),
                InjuryDetail: accidentTransactionInfo.injurydetail.map(injury => ({
                    WoundType: injury.woundtype || '',
                    InjurySide: injury.injuryside || '',
                    InjuryArea: injury.injuryarea || ''
                }))
            };
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultAccidentDatabaseDto = {
                HTTPStatus: newHttpMessageDto,
                Result: accidentInfoInstance
            };
            if (!accidentInfoInstance) {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'Accident not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultAccidentDatabaseDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'Accident not found', error: ''
                    },
                    Result: {
                        AccidentDetailInfo: {
                            AccidentPlace: '',
                            AccidentDate: '',
                            CauseOfInjuryDetail: [],
                            InjuryDetail: []
                        }
                    }
                };
        }
        return newResultAccidentDatabaseDto;
    }
    async getCauseofInjurywoundtype(xInsurercode) {
        let causeofinjurywoundtype;
        try {
            causeofinjurywoundtype = await database_1.prismaProgest.causeofinjurywoundtype.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    woundtypecode: true,
                    woundtypename: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newCauseofInjurywoundtypeDto = new utils_dto_1.CauseofInjurywoundtypeDto();
            newCauseofInjurywoundtypeDto = {
                HTTPStatus: newHttpMessageDto,
                Result: causeofinjurywoundtype
            };
            if (!causeofinjurywoundtype || causeofinjurywoundtype.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'causeofinjurywoundtype not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newCauseofInjurywoundtypeDto;
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
    async getCauseofInjurySide(xInsurercode) {
        let causeofinjuryside;
        try {
            causeofinjuryside = await database_1.prismaProgest.causeofinjuryside.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    injurysidecode: true,
                    injurysidename: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newCauseofinjurysideDto = new utils_dto_1.CauseofinjurysideDto();
            newCauseofinjurysideDto = {
                HTTPStatus: newHttpMessageDto,
                Result: causeofinjuryside
            };
            if (!causeofinjuryside || causeofinjuryside.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Causeofinjurysidenot not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newCauseofinjurysideDto;
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
    async getAccidentPlace(xInsurercode) {
        let accidentplace;
        try {
            accidentplace = await database_1.prismaProgest.accidentplace.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    accidentplacecode: true,
                    accidentplacename: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            let newAccidentplaceDto = new utils_dto_1.AccidentplaceDto();
            newAccidentplaceDto = {
                HTTPStatus: newHttpMessageDto,
                Result: accidentplace
            };
            if (!accidentplace || accidentplace.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Accidentplace not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newAccidentplaceDto;
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
    async getAccidentCauseOver45Day(xInsurercode) {
        let accidentcauseover45days;
        try {
            accidentcauseover45days = await database_1.prismaProgest.accidentcauseover45days.findMany({
                where: {
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    causeovercode: true,
                    causeoverdesc: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newAccidentcauseover45daysDto = new utils_dto_1.Accidentcauseover45daysDto();
            newAccidentcauseover45daysDto = {
                HTTPStatus: newHttpMessageDto,
                Result: accidentcauseover45days
            };
            if (!accidentcauseover45days || accidentcauseover45days.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'accidentcauseover45days not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newAccidentcauseover45daysDto;
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
    async getPreBillingformDatabase(queryPreBillingDatabaseBodyDto) {
        const xRefId = queryPreBillingDatabaseBodyDto.RefId;
        const xTransactionNo = queryPreBillingDatabaseBodyDto.TransactionNo;
        const xVN = queryPreBillingDatabaseBodyDto.VN;
        let newResultPreBillingDto = new result_prebilling_databse_dto_1.ResultPreBillingDto();
        const prebillingtransactionsInfo = await database_1.prismaProgest.prebillingtransactions.findMany({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                localbillingcode: true,
                localbillingname: true,
                simbbillingcode: true,
                payorbillingcode: true,
                billinginitial: true,
                billingdiscount: true,
                billingnetamount: true,
                totalbillamount: true
            },
        });
        if (prebillingtransactionsInfo) {
            const prebillingInfoInstance = new result_prebilling_databse_dto_1.PreBillingDatabaseResultInfo();
            prebillingInfoInstance.PreBillingInfo = prebillingtransactionsInfo.map(item => ({
                LocalBillingCode: item.localbillingcode,
                LocalBillingName: item.localbillingname,
                SimbBillingCode: item.simbbillingcode,
                PayorBillingCode: item.payorbillingcode,
                BillingInitial: item.billinginitial,
                BillingDiscount: item.billingdiscount,
                BillingNetAmount: item.billingnetamount,
                TotalBillAmount: item.totalbillamount
            }));
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultPreBillingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: prebillingInfoInstance
            };
            if (!prebillingtransactionsInfo || prebillingtransactionsInfo.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Pre-Billing  not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultPreBillingDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'Pre-Billing not found', error: ''
                    },
                    Result: {
                        PreBillingInfo: [{
                                LocalBillingCode: '',
                                LocalBillingName: '',
                                SimbBillingCode: '',
                                PayorBillingCode: '',
                                BillingInitial: '',
                                BillingDiscount: '',
                                BillingNetAmount: '',
                                TotalBillAmount: ''
                            }
                        ]
                    }
                };
        }
        return newResultPreBillingDto;
    }
    async getConcurNoteformDatabase(queryConcurNoteDatabaseBodyDto) {
        const xRefId = queryConcurNoteDatabaseBodyDto.RefId;
        const xTransactionNo = queryConcurNoteDatabaseBodyDto.TransactionNo;
        const xVN = queryConcurNoteDatabaseBodyDto.VN;
        let newResultConcurNoteDto = new result_concurnote_databse_dto_1.ResultConcurNoteDto();
        const concurrentnotetransactionsInfo = await database_1.prismaProgest.concurrentnotetransactions.findMany({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                concurrentdatetime: true,
                concurrentdetail: true,
            },
        });
        if (concurrentnotetransactionsInfo) {
            const concurNoteInfoInstance = new result_concurnote_databse_dto_1.ConcurNoteDatabaseResultInfo();
            concurNoteInfoInstance.ConcurNoteList = concurrentnotetransactionsInfo.map(item => ({
                ConcurrentDatetime: item.concurrentdatetime,
                ConcurrentDetail: item.concurrentdetail,
            }));
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultConcurNoteDto = {
                HTTPStatus: newHttpMessageDto,
                Result: concurNoteInfoInstance
            };
            if (!concurrentnotetransactionsInfo || concurrentnotetransactionsInfo.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'ConcurrentNote not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultConcurNoteDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'ConcurrentNote not found', error: ''
                    },
                    Result: {
                        ConcurNoteList: [{
                                ConcurrentDatetime: '',
                                ConcurrentDetail: ''
                            }
                        ]
                    }
                };
        }
        return newResultConcurNoteDto;
    }
    async getPreAuthNoteformDatabase(queryPreAuthNoteDatabaseBodyDto) {
        const xRefId = queryPreAuthNoteDatabaseBodyDto.RefId;
        const xTransactionNo = queryPreAuthNoteDatabaseBodyDto.TransactionNo;
        const xVN = queryPreAuthNoteDatabaseBodyDto.VN;
        let newResultPreAuthNoteDto = new result_preauthnote_databse_dto_1.ResultPreAuthNoteDto();
        const preauthnotetransactionsInfo = await database_1.prismaProgest.preauthnotetransactions.findMany({
            where: {
                vn: xVN,
                refid: xRefId,
                transactionno: xTransactionNo,
            },
            select: {
                preauthdatetime: true,
                preauthdetail: true,
            },
        });
        if (preauthnotetransactionsInfo) {
            const preauthNoteInfoInstance = new result_preauthnote_databse_dto_1.PreAuthNoteDatabaseResultInfo();
            preauthNoteInfoInstance.PreAuthNote = preauthnotetransactionsInfo.map(item => ({
                PreAuthDateTime: item.preauthdatetime,
                PreAuthDetail: item.preauthdetail,
            }));
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            newResultPreAuthNoteDto = {
                HTTPStatus: newHttpMessageDto,
                Result: preauthNoteInfoInstance
            };
            if (!preauthnotetransactionsInfo || preauthnotetransactionsInfo.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'Pre-AuthNote not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
        }
        else {
            newResultPreAuthNoteDto =
                {
                    HTTPStatus: {
                        statusCode: 200, message: 'Pre-AuthNote  not found', error: ''
                    },
                    Result: {
                        PreAuthNote: [{
                                PreAuthDateTime: '',
                                PreAuthDetail: ''
                            }
                        ]
                    }
                };
        }
        return newResultPreAuthNoteDto;
    }
    async getDiagnosisTypeMapping(xInsurercode, xDxtypecodeTrakcare) {
        let diagnosistypemapping;
        try {
            diagnosistypemapping = await database_1.prismaProgest.diagnosistypemapping.findFirst({
                where: {
                    dxtypecodetrakcare: xDxtypecodeTrakcare,
                    insurers: { insurercode: +xInsurercode }
                },
                select: {
                    dxtypecodetrakcare: true,
                    dxtypenametrakcare: true,
                    dxtypecodeinsurance: true,
                    dxtypenameinsurance: true,
                    insurerid: true,
                    insurers: {
                        select: {
                            insurercode: true,
                            insurername: true
                        }
                    }
                },
            });
            this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            let newDiagnosisTypeMappingDto = new utils_dto_1.DiagnosisTypeMappingDto();
            newDiagnosisTypeMappingDto = {
                HTTPStatus: newHttpMessageDto,
                Result: diagnosistypemapping
            };
            if (!diagnosistypemapping || diagnosistypemapping.length === 0) {
                this.addFormatHTTPStatus(newHttpMessageDto, 404, 'diagnosistypemapping not found', '');
            }
            else {
                this.addFormatHTTPStatus(newHttpMessageDto, 200, '', '');
            }
            return newDiagnosisTypeMappingDto;
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
    async getFileAsBase64(id) {
        const fileRecord = await database_1.prismaProgest.claimdocuments.findFirst({
            where: { id },
        });
        if (!fileRecord) {
            throw new common_1.NotFoundException('File not found');
        }
        const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
        const fileBuffer = (0, fs_1.readFileSync)(filePath);
        const base64File = fileBuffer.toString('base64');
        return {
            filename: fileRecord.filepath.split('/').pop(),
            base64: base64File,
        };
    }
    async saveFile(file, body) {
        const mimeTypeParts = file.mimetype.split('/');
        const fileType = mimeTypeParts[mimeTypeParts.length - 1];
        const fileRecord = await database_1.prismaProgest.claimdocuments.create({
            data: {
                hn: body.HN,
                vn: body.VN,
                refid: body.RefId,
                insurerid: 13,
                transactionno: body.TransactionNo,
                documenttypecode: body.DocumenttypeCode,
                documenttypename: fileType,
                originalname: file.originalname,
                documentname: body.VN + '-' + body.DocumenttypeCode + '-' + Math.round(Math.random() * 186).toString(3) + '.' + file.mimetype.split('/')[1],
                filesize: file.size,
                filemimetype: file.mimetype,
                serverpath: 'path-to-server',
                filepath: `./uploads/pdf/${file.filename}`,
                uploaddate: new Date(),
                uploadedby: body.UploadedBy,
                runningdocument: body.Runningdocument
            },
        });
        return fileRecord;
    }
    async getFilesAsBase64findMany(ids) {
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: {
                hn: ids
            },
        });
        if (fileRecords.length === 0) {
            throw new common_1.NotFoundException('Files not found');
        }
        const filesAsBase64 = await Promise.all(fileRecords.map(async (fileRecord) => {
            const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
            const fileBuffer = (0, fs_1.readFileSync)(filePath);
            const base64File = fileBuffer.toString('base64');
            return {
                filename: fileRecord.filepath.split('/').pop(),
                base64: base64File,
            };
        }));
        return filesAsBase64;
    }
    async getlistDocumentName(querylistDocumentNameDtoBodyDto) {
        const HN = querylistDocumentNameDtoBodyDto.PatientInfo.HN;
        const VN = querylistDocumentNameDtoBodyDto.PatientInfo.VN;
        const RefId = querylistDocumentNameDtoBodyDto.PatientInfo.RefId;
        const TransactionNo = querylistDocumentNameDtoBodyDto.PatientInfo.TransactionNo;
        const DocumenttypeCode = querylistDocumentNameDtoBodyDto.PatientInfo.DocumenttypeCode;
        const Runningdocument = querylistDocumentNameDtoBodyDto.PatientInfo.Runningdocument;
        const whereConditions = {
            ...(HN ? { hn: { equals: HN } } : {}),
            ...(VN ? { vn: { equals: VN } } : {}),
            ...(RefId ? { refid: { equals: RefId } } : {}),
            ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
            ...(DocumenttypeCode ? { documenttypecode: { equals: DocumenttypeCode } } : {}),
            ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
        };
        console.log('------^^^^^^');
        console.log("whereConditions:", whereConditions);
        console.log('------^^^^^^');
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions,
        });
        let filesAsBase64;
        if (fileRecords) {
            filesAsBase64 = await Promise.all(fileRecords.map(async (fileRecord) => {
                return {
                    filename: fileRecord.documentname,
                    originalname: fileRecord.originalname,
                    documenttypecode: fileRecord.documenttypecode
                };
            }));
        }
        else {
            filesAsBase64 = {
                filename: '',
                originalname: '',
                documenttypecode: ''
            };
        }
        return filesAsBase64;
    }
    async getDocumentByDocname(queryCreateClaimDocumentDtoBodyDto) {
        const VN = queryCreateClaimDocumentDtoBodyDto.VN;
        const DocumentName = queryCreateClaimDocumentDtoBodyDto.DocumentName;
        const fileRecord = await database_1.prismaProgest.claimdocuments.findFirst({
            where: {
                vn: VN,
                documentname: DocumentName
            }
        });
        if (!fileRecord) {
            throw new common_1.NotFoundException('File not found');
        }
        const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
        const fileBuffer = (0, fs_1.readFileSync)(filePath);
        const base64File = fileBuffer.toString('base64');
        return {
            filename: fileRecord.filepath.split('/').pop(),
            base64: base64File,
        };
    }
    async getListDocumentByRefId(queryCreateClaimDocumentDtoBodyDto) {
        const VN = queryCreateClaimDocumentDtoBodyDto.VN;
        const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: {
                vn: VN,
                refid: RefId,
            }
        });
        if (fileRecords.length === 0) {
            throw new common_1.NotFoundException('Files not found');
        }
        let newResultAttachDocListInfoDto = [];
        await Promise.all(fileRecords.map(async (fileRecord) => {
            const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
            const fileBuffer = (0, fs_1.readFileSync)(filePath);
            const base64File = fileBuffer.toString('base64');
            newResultAttachDocListInfoDto = [
                {
                    DocName: fileRecord.filepath.split('/').pop(),
                    Base64Data: base64File,
                }
            ];
        }));
        return newResultAttachDocListInfoDto;
    }
    async UpdateDocumentTypeCode(querylistDocumentNameDtoBodyDto) {
        const RefId = querylistDocumentNameDtoBodyDto.PatientInfo.RefId;
        const TransactionNo = querylistDocumentNameDtoBodyDto.PatientInfo.TransactionNo;
        const DocumenttypeCode = querylistDocumentNameDtoBodyDto.PatientInfo.DocumenttypeCode;
        const DocumentName = querylistDocumentNameDtoBodyDto.PatientInfo.DocumentName;
        const fileRecord = await database_1.prismaProgest.claimdocuments.findFirst({
            where: {
                refid: RefId,
                transactionno: TransactionNo,
                documentname: DocumentName,
            },
        });
        await database_1.prismaProgest.claimdocuments.updateMany({
            where: {
                refid: RefId,
                transactionno: TransactionNo,
                documentname: DocumentName,
            },
            data: {
                isclaimexcluded: true,
                originaldocumenttypecode: fileRecord.documenttypecode
            }
        });
        await database_1.prismaProgest.claimdocuments.updateMany({
            where: {
                refid: RefId,
                transactionno: TransactionNo,
                documentname: DocumentName
            },
            data: {
                documenttypecode: DocumenttypeCode,
            }
        });
        this.addFormatHTTPStatus(newHttpMessageDto, 200, 'File update documenttype successfully!', 'File update documenttype successfully!');
        let newResultUpdateDocumentByDocNameDto = new claim_documents_dto_1.ResultUpdateDocumentByDocNameDto();
        newResultUpdateDocumentByDocNameDto = {
            HTTPStatus: newHttpMessageDto,
            Result: { UpdateDocumentInfo: 'update documenttype  successfully' }
        };
        return newResultUpdateDocumentByDocNameDto;
    }
    async DeleteDocumentByDocName(queryDeleteDocumentByDocNameDto) {
        const xRefId = queryDeleteDocumentByDocNameDto.PatientInfo.RefId;
        const xTransactionNo = queryDeleteDocumentByDocNameDto.PatientInfo.TransactionNo;
        const xDocumentName = queryDeleteDocumentByDocNameDto.PatientInfo.DocumentName;
        let DeleteDocumentInfo;
        try {
            const fileRecord = await database_1.prismaProgest.claimdocuments.findFirst({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo,
                    documentname: xDocumentName,
                },
            });
            if (!fileRecord) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'File not found in database', 'File not found in database');
                DeleteDocumentInfo = {
                    status: "File not found in database",
                    documentname: xDocumentName
                };
            }
            else {
                const filePath = fileRecord.filepath;
                await unlinkAsync(filePath);
                await database_1.prismaProgest.claimdocuments.deleteMany({
                    where: {
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        documentname: xDocumentName,
                    },
                });
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'File and record deleted successfully!', 'File and record deleted successfully!');
                DeleteDocumentInfo = {
                    status: "File and record deleted successfully",
                    documentname: xDocumentName
                };
            }
        }
        catch (error) {
            console.error('Error deleting file and record:', error);
            this.addFormatHTTPStatus(newHttpMessageDto, 500, 'Error deleting file and record', 'Error deleting file and record');
            DeleteDocumentInfo = {
                status: "Error deleting file and record",
                documentname: xDocumentName
            };
        }
        let newResultDeleteDocumentByDocNameDto = new claim_documents_dto_1.ResultDeleteDocumentByDocNameDto();
        newResultDeleteDocumentByDocNameDto = {
            HTTPStatus: newHttpMessageDto,
            Result: DeleteDocumentInfo
        };
        return newResultDeleteDocumentByDocNameDto;
    }
    async isClaimExcludedByDocName(queryDeleteDocumentByDocNameDto) {
        const xRefId = queryDeleteDocumentByDocNameDto.PatientInfo.RefId;
        const xTransactionNo = queryDeleteDocumentByDocNameDto.PatientInfo.TransactionNo;
        const xDocumentName = queryDeleteDocumentByDocNameDto.PatientInfo.DocumentName;
        let DeleteDocumentInfo;
        try {
            const fileRecord = await database_1.prismaProgest.claimdocuments.findFirst({
                where: {
                    refid: xRefId,
                    transactionno: xTransactionNo,
                    documentname: xDocumentName,
                },
            });
            if (!fileRecord) {
                this.addFormatHTTPStatus(newHttpMessageDto, 400, 'File not found in database', 'File not found in database');
                DeleteDocumentInfo = {
                    status: "File not found in database",
                    documentname: xDocumentName
                };
            }
            else {
                console.log('000000');
                console.log(fileRecord.documenttypecode);
                await database_1.prismaProgest.claimdocuments.updateMany({
                    where: {
                        refid: xRefId,
                        transactionno: xTransactionNo,
                        documentname: xDocumentName,
                    },
                    data: {
                        isclaimexcluded: true,
                        documenttypecode: fileRecord.originaldocumenttypecode
                    }
                });
                this.addFormatHTTPStatus(newHttpMessageDto, 200, 'File Excluded successfully!', 'File and record deleted successfully!');
                DeleteDocumentInfo = {
                    status: "File and record Excluded successfully",
                    documentname: xDocumentName
                };
            }
        }
        catch (error) {
            console.error('Error deleting file and record:', error);
            this.addFormatHTTPStatus(newHttpMessageDto, 500, 'Error deleting file and record', 'Error deleting file and record');
            DeleteDocumentInfo = {
                status: "Error deleting file and record",
                documentname: xDocumentName
            };
        }
        let newResultDeleteDocumentByDocNameDto = new claim_documents_dto_1.ResultDeleteDocumentByDocNameDto();
        newResultDeleteDocumentByDocNameDto = {
            HTTPStatus: newHttpMessageDto,
            Result: DeleteDocumentInfo
        };
        return newResultDeleteDocumentByDocNameDto;
    }
    async getlistDocumentClaim(querylistDocumentNameDtoBodyDto) {
        const HN = querylistDocumentNameDtoBodyDto.PatientInfo.HN;
        const VN = querylistDocumentNameDtoBodyDto.PatientInfo.VN;
        const RefId = querylistDocumentNameDtoBodyDto.PatientInfo.RefId;
        const TransactionNo = querylistDocumentNameDtoBodyDto.PatientInfo.TransactionNo;
        const DocumenttypeCode = querylistDocumentNameDtoBodyDto.PatientInfo.DocumenttypeCode;
        const Runningdocument = querylistDocumentNameDtoBodyDto.PatientInfo.Runningdocument;
        const isClaimExcludedByDocName = false;
        const whereConditions = {
            ...(HN ? { hn: { equals: HN } } : {}),
            ...(VN ? { vn: { equals: VN } } : {}),
            ...(RefId ? { refid: { equals: RefId } } : {}),
            ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
            ...(DocumenttypeCode ? { documenttypecode: { equals: DocumenttypeCode } } : {}),
            ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
            ...(isClaimExcludedByDocName ? { isClaimExcludedByDocName: { not: true } } : {}),
        };
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions,
        });
        const filesAsBase64 = await Promise.all(fileRecords.map(async (fileRecord) => {
            return {
                filename: fileRecord.documentname,
                originalname: fileRecord.originalname,
                documenttypecode: fileRecord.documenttypecode,
                isClaimExcludedByDocName: fileRecord.isclaimexcluded
            };
        }));
        return filesAsBase64;
    }
    async getListDocumentforAttachDocList(queryListDocumentforAttachDocListDto) {
        const xRefId = queryListDocumentforAttachDocListDto.PatientInfo.RefId;
        const xTransactionNo = queryListDocumentforAttachDocListDto.PatientInfo.TransactionNo;
        const xRunningdocument = queryListDocumentforAttachDocListDto.PatientInfo.Runningdocument;
        const whereConditions = {
            ...(xRefId ? { refid: { equals: xRefId } } : {}),
            ...(xTransactionNo ? { transactionno: { equals: xTransactionNo } } : {}),
            ...(xRunningdocument ? { runningdocument: { equals: xRunningdocument } } : {}),
        };
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions
        });
        if (fileRecords.length === 0) {
            throw new common_1.NotFoundException('Files not found');
        }
        const newResultAttachDocListInfoDto = [];
        await Promise.all(fileRecords.map(async (fileRecord) => {
            const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
            try {
                const fileBuffer = await (0, promises_1.readFile)(filePath);
                const base64File = fileBuffer.toString('base64');
                newResultAttachDocListInfoDto.push({
                    DocName: fileRecord.filepath.split('/').pop(),
                    Base64Data: base64File,
                });
            }
            catch (error) {
                console.error(`Error reading file ${fileRecord.filepath}:`, error);
            }
        }));
        return newResultAttachDocListInfoDto;
    }
    async getListDocumentByTransactionNo(queryCreateClaimDocumentDtoBodyDto) {
        const VN = queryCreateClaimDocumentDtoBodyDto.VN;
        const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
        const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
        const Runningdocument = queryCreateClaimDocumentDtoBodyDto.Runningdocument;
        const newResultAttachDocListInfoDto = [];
        const whereConditions = {
            ...(VN ? { vn: { equals: VN } } : {}),
            ...(RefId ? { refid: { equals: RefId } } : {}),
            ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
            ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
        };
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions
        });
        if (fileRecords.length === 0) {
            console.log('pdf null');
        }
        else {
            await Promise.all(fileRecords.map(async (fileRecord) => {
                const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
                try {
                    const fileBuffer = await (0, promises_1.readFile)(filePath);
                    const base64File = fileBuffer.toString('base64');
                    newResultAttachDocListInfoDto.push({
                        DocName: fileRecord.filepath.split('/').pop(),
                        Base64Data: base64File,
                    });
                }
                catch (error) {
                    console.error(`Error reading file ${fileRecord.filepath}:`, error);
                }
            }));
        }
        return newResultAttachDocListInfoDto;
    }
    async getListDocumentDummy(xDocumentName) {
        const whereConditions = {
            ...(xDocumentName ? { vn: { equals: xDocumentName } } : {}),
        };
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions
        });
        if (fileRecords.length === 0) {
            throw new common_1.NotFoundException('Files not found');
        }
        const newResultAttachDocListInfoDto = [];
        await Promise.all(fileRecords.map(async (fileRecord) => {
            const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
            try {
                const fileBuffer = await (0, promises_1.readFile)(filePath);
                const base64File = fileBuffer.toString('base64');
                newResultAttachDocListInfoDto.push({
                    DocName: fileRecord.filepath.split('/').pop(),
                    Base64Data: base64File,
                });
            }
            catch (error) {
                console.error(`Error reading file ${fileRecord.filepath}:`, error);
            }
        }));
        return newResultAttachDocListInfoDto;
    }
    async getListDocumentBillingByTransactionNo(queryCreateClaimDocumentDtoBodyDto) {
        const VN = queryCreateClaimDocumentDtoBodyDto.VN;
        const RefId = queryCreateClaimDocumentDtoBodyDto.RefId;
        const TransactionNo = queryCreateClaimDocumentDtoBodyDto.TransactionNo;
        const Runningdocument = queryCreateClaimDocumentDtoBodyDto.Runningdocument;
        const DocumenttypeCode = '003';
        const whereConditions = {
            ...(VN ? { vn: { equals: VN } } : {}),
            ...(RefId ? { refid: { equals: RefId } } : {}),
            ...(TransactionNo ? { transactionno: { equals: TransactionNo } } : {}),
            ...(Runningdocument ? { runningdocument: { equals: Runningdocument } } : {}),
            ...(DocumenttypeCode ? { documenttypecode: { equals: DocumenttypeCode } } : {}),
        };
        const fileRecords = await database_1.prismaProgest.claimdocuments.findMany({
            where: whereConditions
        });
        const newResultAttachDocListInfoDto = [];
        if (fileRecords.length === 0) {
        }
        await Promise.all(fileRecords.map(async (fileRecord) => {
            const filePath = (0, path_1.join)(__dirname, '..', '..', fileRecord.filepath);
            try {
                const fileBuffer = await (0, promises_1.readFile)(filePath);
                const base64File = fileBuffer.toString('base64');
                newResultAttachDocListInfoDto.push({
                    DocName: fileRecord.filepath.split('/').pop(),
                    Base64Data: base64File,
                });
            }
            catch (error) {
                console.error(`Error reading file ${fileRecord.filepath}:`, error);
            }
        }));
        return newResultAttachDocListInfoDto;
    }
    async saveBase64File(base64, fileName) {
        try {
            const folderPath = './uploads/pdf';
            const buffer = Buffer.from(base64, 'base64');
            const filePath = (0, path_1.join)(folderPath, fileName);
            return new Promise((resolve, reject) => {
                (0, fs_2.writeFile)(filePath, buffer, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(filePath);
                    }
                });
            });
        }
        catch (error) {
            console.error('Error saving Base64 file:', error);
            throw new Error('Failed to save Base64 file');
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
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UtilsService);
//# sourceMappingURL=utils.service.js.map