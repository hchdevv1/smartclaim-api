import { Injectable , HttpStatus} from '@nestjs/common';

@Injectable()
export class HttpStatusMessageService {

    getHttpStatusMessage(statusCode: number, errorCode?: string): string {
       let messages
   
       // Check if error code is P2002 (unique constraint violation)
       if (errorCode === 'P2000') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'The value provided for the column is too long for the column type.'
           }
          
       }else if (errorCode === 'P2001') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'The record searched for in the where condition does not exist.'
           }
          
       }else if (errorCode === 'P2002') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Duplicate entry: The value already exists and must be unique..'
           }
          
       }else if (errorCode === 'P2003') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Foreign key constraint failed.'
           }
          
       }else if (errorCode === 'P2004') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'A constraint failed on the database.'
           }
          
       }else if (errorCode === 'P2005') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'The value stored in the database for the field is invalid for the fields type.'
           }
          
       }else if (errorCode === 'P2006') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'he provided value for the model field is not valid.'
           }
          
       }else if (errorCode === 'P2007') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Data validation error.'
           }
          
       }else if (errorCode === 'P2008') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Failed to parse the query.'
           }
          
       }else if (errorCode === 'P2009') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Failed to validate the query.'
           }
          
       }else if (errorCode === 'P2010') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Raw query failed.'
           }
          
       }else if (errorCode === 'P2011') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Null constraint violation on the database.'
           }
          
       }else if (errorCode === 'P2012') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Missing a required value.'
           }
          
       }else if (errorCode === 'P2013') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Missing the required argument for the field.'
           }
          
       }else if (errorCode === 'P2014') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'The change you are trying to make would violate the required relation.'
           }
          
       }else if (errorCode === 'P2015') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'A related record could not be found.'
           }
          
       }else if (errorCode === 'P2016') {
           messages={
               [HttpStatus.INTERNAL_SERVER_ERROR] :'Query interpretation error.'
           }
          
       }else {
           messages = {
               [HttpStatus.BAD_REQUEST]: 'Invalid request to API', // 400
               [HttpStatus.UNAUTHORIZED]: 'Unauthorized: Please check your credentials',  // 401    
               [HttpStatus.FORBIDDEN]: 'Forbidden: Access denied', // 403        
               [HttpStatus.NOT_FOUND]: 'API endpoint not found', // 404
               [HttpStatus.INTERNAL_SERVER_ERROR]: 'Cannot connect to the database not found. Please ensure the database server is running.', // 500
           };
       }
   
       return messages[statusCode] || 'An unexpected error occurred...';
   }
     getHttpStatusMessageTrakcare(statusCode: number): string {

       const messages = {
           
           [HttpStatus.BAD_REQUEST]:'Invalid request to API', //400
           [HttpStatus.UNAUTHORIZED] : 'Unauthorized: Please check your credentials',  //401    
           [HttpStatus.FORBIDDEN] : 'Forbidden: Access denied', //403        
           [HttpStatus.NOT_FOUND] : 'API endpoint not found', //404
           [HttpStatus.INTERNAL_SERVER_ERROR]: 'Cannot connect to the trakcare / path not found. Please ensure the database server is running.', // 500
          
       };
       return messages[statusCode] || 'An unexpected error occurred..';
     }
}

