import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit {
  orderTotal: number = 0;
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
        // Retrieve total price from CartService
        this.orderTotal = this.cartService.getCart().totalPrice;

        // Clear the cart after the order is confirmed
        this.cartService.clearCart();
  }
}
