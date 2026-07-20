import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, throwError, timeout } from "rxjs";

@Injectable()
export class TimeoutValidation implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            timeout(5000),
            map(data => {
                return {
                    message: "success",
                    data
                }
            }),
            catchError((error) => {
                return throwError(() => new Error(error));
            })
        )
    }
}