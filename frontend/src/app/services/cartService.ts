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

  addToCart(product: Product, quantity: number = 1) {
    const existingProduct = this.cart.products.find(p => p.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      const newCartItem: CartItem = { product, quantity };
      this.cart.products.push(newCartItem);
    }
    this.calculateTotal();
    this.saveCart();
    this.notificationService.showNotification(
      `${quantity} x ${product.name} added to your cart.`
    );
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
  
  incrementQuantity(productId: number) {
    const product = this.cart.products.find(p => p.product.id === productId);
    if (product) {
      product.quantity++;
      this.calculateTotal();
      this.saveCart();
    }
  }

  decrementQuantity(productId: number) {
    const product = this.cart.products.find(p => p.product.id === productId);
    if (product && product.quantity > 1) {
      product.quantity--;
      this.calculateTotal();
      this.saveCart();
    }
  }
}
