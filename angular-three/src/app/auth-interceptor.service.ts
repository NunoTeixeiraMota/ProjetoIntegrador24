import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenJson = localStorage.getItem('token');
    let authToken = '';

    if (tokenJson) {
      const tokenObj = JSON.parse(tokenJson);
      authToken = tokenObj.token;

      // Check if the token has expired using the 'expiration' field
      const expirationDate = new Date(tokenObj.expiration);
      if (new Date() > expirationDate) {
        // Token has expired, redirect to login
        localStorage.clear();
        this.router.navigate(['/login']);
        return throwError(new Error('Token has expired'));
      }
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle other HTTP errors
        if (error.status === 401) {
          // Unauthorized error, redirect to login
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
