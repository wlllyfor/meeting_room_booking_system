import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception', exception.message);
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();
    response
      .json({
        code: exception.getStatus(),
        message: 'fail',
        data: handleResData(exception),
      })
      .end();
  }
}

function handleResData(exception) {
  return exception.message === 'Bad Request Exception'
    ? (exception.getResponse() as { message: string }).message
    : exception.message;
}
