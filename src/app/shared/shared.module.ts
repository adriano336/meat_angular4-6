import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { InputComponent } from "./input/input.component";
import { RatingComponent } from "./rating/rating.component";
import { RadioComponent } from "./radio/radio.component";

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";
import { SnackbarComponent } from './message/snackbar/snackbar.component';
import { NotificationService } from "./message/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave.order.guard";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
        FormsModule, ReactiveFormsModule, CommonModule, SnackbarComponent]
})

export class SharedModule {
    static forRoot() :  ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers:[ShoppingCartService,
                RestaurantsService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
        }
    }
}