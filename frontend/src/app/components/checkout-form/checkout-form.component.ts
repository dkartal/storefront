import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService';
import { CheckoutForm } from '../../models/CheckoutForm';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-checkout-form',
  standalone: false,
  
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  cartService: CartService = inject(CartService);
  notificationService: NotificationService = inject(NotificationService);
  checkoutForm: CheckoutForm = {
    fullname: '',
    address: '',
    creditCardNum: '',
    email: ""
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.checkoutForm.fullname && this.checkoutForm.email && this.checkoutForm.address && this.checkoutForm.creditCardNum) {
      this.cartService.clearCart();
      this.router.navigate(['/confirmation']);
    } else {
      this.notificationService.showNotification("Please fill out all required fields correctly!");
    }
  }
}
