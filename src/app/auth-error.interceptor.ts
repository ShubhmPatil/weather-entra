import { Injectable,NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(private router : Router, private zone : NgZone) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse)=>{
        if (error.status === 401 || error.status === 403) {

          console.warn("Intercepted 403 - Redirecting to /forbidden");

          // MUST run inside Angular zone
          this.zone.run(() => {
            this.router.navigate(['/forbidden']);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
