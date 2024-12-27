import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cartService';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input("id") id?: string;
  product!: Product;

  cartService: CartService = inject(CartService);
  notificationService: NotificationService = inject(NotificationService);
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProduct(Number(this.id)).subscribe(product => {
        this.product = product;
        if (!this.product.imageUrl) {
          this.product.imageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      });
    }
  }
  incrementQuantity(): void {
    if (!this.product) {
      this.notificationService.showNotification('Product not found');
    }
    this.cartService.incrementQuantity(this.product);
  }

  decrementQuantity(): void {
    if (!this.product) {
      this.notificationService.showNotification('Product not found');
    }
    this.cartService.decrementQuantity(this.product);
  }
  
  getQuantity(): number {
   return this.cartService.getQuantity(this.product);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product.id);
  }
}
