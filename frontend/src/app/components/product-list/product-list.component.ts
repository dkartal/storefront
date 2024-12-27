import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cartService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  constructor(private router: Router){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.products.forEach(product => {
        if (!product.imageUrl) {
          product.imageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      });
    });
  }

  incrementQuantity(product: Product): void {
    this.cartService.incrementQuantity(product);
  }

  decrementQuantity(product: Product): void {
    this.cartService.decrementQuantity(product);
  }

  getQuantity(product: Product): number {
    return this.cartService.getQuantity(product);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/products', product.id], { state: { product } });
  }
}
