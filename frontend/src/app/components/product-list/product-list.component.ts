import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedQuantity: { [productId: number]: number } = {};
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      products.forEach(product => {
        if (!product.imageUrl) {
          product.imageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      });
    });
  }

  addToCart(product: Product): void {
    const quantity = this.selectedQuantity[product.id] || 1;
    this.cartService.addToCart(product, quantity);
  }
}
