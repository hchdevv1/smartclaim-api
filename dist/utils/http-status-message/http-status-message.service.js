"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusMessageService = void 0;
const common_1 = require("@nestjs/common");
let HttpStatusMessageService = class HttpStatusMessageService {
    getHttpStatusMessage(statusCode, errorCode) {
        let messages;
        if (errorCode === 'P2000') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'The value provided for the column is too long for the column type.'
            };
        }
        else if (errorCode === 'P2001') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'The record searched for in the where condition does not exist.'
            };
        }
        else if (errorCode === 'P2002') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Duplicate entry: The value already exists and must be unique..'
            };
        }
        else if (errorCode === 'P2003') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Foreign key constraint failed.'
            };
        }
        else if (errorCode === 'P2004') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'A constraint failed on the database.'
            };
        }
        else if (errorCode === 'P2005') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'The value stored in the database for the field is invalid for the fields type.'
            };
        }
        else if (errorCode === 'P2006') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'he provided value for the model field is not valid.'
            };
        }
        else if (errorCode === 'P2007') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Data validation error.'
            };
        }
        else if (errorCode === 'P2008') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Failed to parse the query.'
            };
        }
        else if (errorCode === 'P2009') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Failed to validate the query.'
            };
        }
        else if (errorCode === 'P2010') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Raw query failed.'
            };
        }
        else if (errorCode === 'P2011') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Null constraint violation on the database.'
            };
        }
        else if (errorCode === 'P2012') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Missing a required value.'
            };
        }
        else if (errorCode === 'P2013') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Missing the required argument for the field.'
            };
        }
        else if (errorCode === 'P2014') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'The change you are trying to make would violate the required relation.'
            };
        }
        else if (errorCode === 'P2015') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'A related record could not be found.'
            };
        }
        else if (errorCode === 'P2016') {
            messages = {
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Query interpretation error.'
            };
        }
        else {
            messages = {
                [common_1.HttpStatus.BAD_REQUEST]: 'Invalid request to API',
                [common_1.HttpStatus.UNAUTHORIZED]: 'Unauthorized: Please check your credentials',
                [common_1.HttpStatus.FORBIDDEN]: 'Forbidden: Access denied',
                [common_1.HttpStatus.NOT_FOUND]: 'API endpoint not found',
                [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Cannot connect to the database not found. Please ensure the database server is running.',
            };
        }
        return messages[statusCode] || 'An unexpected error occurred...';
    }
    getHttpStatusMessageTrakcare(statusCode) {
        const messages = {
            [common_1.HttpStatus.BAD_REQUEST]: 'Invalid request to API',
            [common_1.HttpStatus.UNAUTHORIZED]: 'Unauthorized: Please check your credentials',
            [common_1.HttpStatus.FORBIDDEN]: 'Forbidden: Access denied',
            [common_1.HttpStatus.NOT_FOUND]: 'API endpoint not found',
            [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Cannot connect to the trakcare / path not found. Please ensure the database server is running.',
        };
        return messages[statusCode] || 'An unexpected error occurred..';
    }
};
exports.HttpStatusMessageService = HttpStatusMessageService;
exports.HttpStatusMessageService = HttpStatusMessageService = __decorate([
    (0, common_1.Injectable)()
], HttpStatusMessageService);
//# sourceMappingURL=http-status-message.service.js.map