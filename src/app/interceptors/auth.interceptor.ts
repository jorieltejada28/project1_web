import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SigninService } from '../services/signin.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const signinService = inject(SigninService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized - session expired or invalid token
      if (error.status === 401) {
        signinService.logout();
      }
      return throwError(() => error);
    })
  );
};
