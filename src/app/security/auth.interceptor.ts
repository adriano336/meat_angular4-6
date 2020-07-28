import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /**
     *
     */
    constructor(private injector: Injector) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loginService = this.injector.get(LoginService);

        if (loginService.isLoggedIn()) {
            //Objeto request é imutável, é necessário criar um clone
            const authReq = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`} });
            return next.handle(authReq);
        } else {
            return next.handle(request);
        }
    }
}