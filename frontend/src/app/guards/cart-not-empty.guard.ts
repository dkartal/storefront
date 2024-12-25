import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../services/cartService';

@Injectable({
  providedIn: 'root',
})
export class CartNotEmptyGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(): boolean {
    const cart = this.cartService.getCart();
    if (cart.products.length === 0) {
      // Redirect to Cart page if the cart is empty
      this.router.navigate(['/cart']);
      return false;
    }
    return true; // Allow access if the cart has items
  }
}
