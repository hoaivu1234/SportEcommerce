import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import {
  AUTH_HEADER,
  PUBLIC_URLS,
  TOKEN_PREFIX,
} from '../../constants/auth.constant';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { HTTP_STATUS } from '../../constants/app.constant';

/**
 * Attaches the Bearer token to every outgoing request,
 * unless the URL is in the PUBLIC_URLS whitelist.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);

  const isPublic = PUBLIC_URLS.some((url) => req.url.includes(url));
  if (isPublic) return next(req);

  const token = storageService.getAccessToken();
  if (!token) return next(req);

  const authReq = req.clone({
    headers: req.headers.set(AUTH_HEADER, `${TOKEN_PREFIX} ${token}`),
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === HTTP_STATUS.UNAUTHORIZED) {
        const refreshToken = storageService.getRefreshToken();
        if (!refreshToken) {
          authService.logout();
          return throwError(() => err);
        }

        return authService.refreshToken(refreshToken).pipe(
          switchMap((res) => {
            const newToken = res.data.accessToken;

            const newReq = req.clone({
              headers: req.headers.set(AUTH_HEADER, `${TOKEN_PREFIX} ${newToken}`),
            });

            return next(newReq);
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};
