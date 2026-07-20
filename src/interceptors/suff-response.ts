import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, throwError, timeout } from "rxjs";

@Injectable()
export class SuffixResponse implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(val => ({
                message: "success",
                data: val
            })),
            catchError((error) => {
                return throwError(() => new Error(error));
            })
        )
    }
}