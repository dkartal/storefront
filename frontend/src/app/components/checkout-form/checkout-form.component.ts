import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService';
import { CheckoutForm } from '../../models/CheckoutForm';

@Component({
  selector: 'app-checkout-form',
  standalone: false,
  
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  cartService: CartService = inject(CartService);
  checkoutForm: CheckoutForm = {
    fullname: '',
    address: '',
    creditCardNum: '',
    email: ""
  };

  constructor(private router: Router) {}

  onSubmit() {
    this.cartService.clearCart();
    this.router.navigate(['/confirmation']);
  }
}
