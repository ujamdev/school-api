import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SuccessHandler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = {
      result: true,
      code: 200,
    };

    return next.handle().pipe(
      map((data) => {
        return { ...body, data };
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
