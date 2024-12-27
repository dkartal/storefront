import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-product-details',
  standalone: false,
  
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  productService: ProductService = inject(ProductService);
  cartService = inject(CartService);
  selectedQuantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || "-1");
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
      if (!this.product.imageUrl) {
        this.product.imageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      }
      this.cartService.getCart().products.find(p => {
        if (p.product.id === product.id) {
          this.selectedQuantity = p.quantity;
        }
      })
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
    }
  }

  onQuantityChange(value: number): void {
    this.selectedQuantity = value;
  }
}
