import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);

  const authToken = authService.getToken();

  if (authToken) {
    req = req.clone({
      setHeaders: {
        [environment.accessTokenHeader]: `Bearer ${authToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.status === 401) {
        authService.logout();
      }

      //const errorMessage = JSON.stringify(error.error.errorMessage, null, '\t');
      const errorMessage = error.error.errorMessage;
      toastrService.error(errorMessage, 'Error!');

      return throwError(() => error);
    })
  );
};
