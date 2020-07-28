import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from "./shared/message/notification.service";
import { LoginService } from "./security/login/login.service";

//Todo providers que recebe injeção precisa ser declarado a notação abaixo.
@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService,
        private injector: Injector,
        private zone: NgZone) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado')
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
                        break;
                }
            });
        }

        super.handleError(errorResponse);

        //Primeiro exemplo
        // let errorMessage: string

        // if (error instanceof HttpErrorResponse) {
        //     const body = error.error;
        //     errorMessage = `Erro ${error.status} - ${error.statusText || ''} ao obter a URL ${error.url} ${body}`;
        // }
        // else {
        //     errorMessage = error.message ? error.message : error.toString();
        // }
    }
}