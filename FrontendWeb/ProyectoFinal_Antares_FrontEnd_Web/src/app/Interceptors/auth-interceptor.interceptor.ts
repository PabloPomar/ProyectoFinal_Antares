import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../Services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUser = this.authService.getLoggedUser;
    let token = JSON.parse(localStorage.getItem('loggedInUser'));
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
