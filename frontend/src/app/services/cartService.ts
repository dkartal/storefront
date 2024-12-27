import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { CartItem, ShoppingCart } from '../models/ShoppingCart';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shoppingCart'; // Key for localStorage
  private cart: ShoppingCart = {
    products: [],
    totalPrice: 0
  };
  notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const storedShoppingCart = localStorage.getItem(this.cartKey);
    if (storedShoppingCart) {
      this.cart = JSON.parse(storedShoppingCart);
    }
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  getCart(): ShoppingCart {
    return this.cart;
  }

  private calculateTotal() {
    this.cart.totalPrice = this.cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  removeFromCart(productId: number) {
    const productToRemove = this.cart.products.find(p => p.product.id === productId);
    this.cart.products = this.cart.products.filter(p => p.product.id !== productId);
    this.calculateTotal();
    this.saveCart();
    this.notificationService.showNotification(
      `${productToRemove?.product.name} removed from your cart.`
    );
  }

  clearCart() {
    this.cart = { products: [], totalPrice: 0 };
    this.saveCart();
  }
  
  incrementQuantity(product: Product) {
    if (!product) {
      return;
    }
    const productFound = this.cart.products.find(p => p.product.id === product.id);
    if (productFound) {
      productFound.quantity++;
      this.notificationService.showNotification(
        `${productFound.quantity} x ${productFound.product.name} added to your cart.`
      );
    } else {
      const cartItem: CartItem = { product, quantity: 1 };
      this.cart.products.push(cartItem);
      this.notificationService.showNotification(
        `1 x ${product.name} added to your cart.`
      );
    }
    this.calculateTotal();
    this.saveCart();
  }

  decrementQuantity(product: Product) {
    if (!product) {
      return;
    }
    const productFound = this.cart.products.find(p => p.product.id === product.id);
    if (productFound) {
      productFound.quantity--;

      // Remove the product if the quantity is 0
      if (productFound.quantity <= 0) {
        this.removeFromCart(productFound.product.id);
      }

      this.calculateTotal();
      this.saveCart();
    }
  }

  getQuantity(product: Product): number {
    const productFound = this.cart.products.find(p => p.product.id === product.id);
    return productFound ? productFound.quantity : 0;
  }
}
