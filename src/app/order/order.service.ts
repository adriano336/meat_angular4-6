import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';

import { MEAT_API } from "../app.api";
import { LoginService } from 'app/security/login/login.service';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  
  constructor(private cartService: ShoppingCartService,
              private http: HttpClient,
              private loginService : LoginService) { }

  itemsValue(): number {
    return this.cartService.total();    
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item:CartItem){
    this.cartService.increaseQty(item);
  } 

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);    
  }

  checkOrder(order: Order) : Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
                    .pipe(map(order => order.id));
  }

  clear() {
    this.cartService.clear();    
  }
}