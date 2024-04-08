import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | string
      | { error: string; statusCode: 400; message: string[] };

    if (typeof err !== 'string' && err.error === 'Bad Request') {
      return response.status(status).json({
        result: false,
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: { message: err.message },
      });
    }
    response.status(status).json({
      result: false,
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: { message: err['message'] },
    });
  }
}
