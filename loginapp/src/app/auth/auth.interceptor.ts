import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService, 
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        const authReq = req.clone({
            setHeaders: {
                Authorization: String(token)
            }
        });
        return next.handle(authReq)
            .pipe(catchError((err) => {
                if(err instanceof HttpErrorResponse) {
                    if(err.status === 401) {
                        this.authService.logout();
                        this,this.router.navigateByUrl('/auth/login');
                    }
                }
                return throwError(err)
            }))
    }
        return next.handle(req);
    }
}