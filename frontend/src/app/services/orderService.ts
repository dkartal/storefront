import { Injectable } from '@angular/core';
import { Order, OrderProduct } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { CartItem, ShoppingCart } from '../models/ShoppingCart';
import { Observable } from 'rxjs';
interface OrderResponse {
  success: boolean;
  orderId: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(cartItems: CartItem[]): Observable<OrderResponse> {
    const orderProducts: OrderProduct[] = [];

    for (const cartItem of cartItems) {
      orderProducts.push({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      } as OrderProduct);
    }
    return this.http.post<OrderResponse>(`${this.apiUrl}`, orderProducts);
  }

  getActiveOrder() {
    return this.http.get<Order>(`${this.apiUrl}/active`);
  }
}
