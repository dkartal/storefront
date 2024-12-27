import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cartService';
import { ShoppingCart } from '../../models/ShoppingCart';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cart!: ShoppingCart;
  cartService: CartService = inject(CartService);
  constructor() {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  }

  incrementQuantity(product: Product): void {
    this.cartService.incrementQuantity(product);
    this.cart = this.cartService.getCart();
  }

  decrementQuantity(product: Product): void {
    this.cartService.decrementQuantity(product);
    this.cart = this.cartService.getCart();
  }
}
