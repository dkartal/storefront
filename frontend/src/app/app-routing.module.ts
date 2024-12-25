import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { CartNotEmptyGuard } from './guards/cart-not-empty.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  
  // Product-related routes
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  // Cart and checkout routes (protected by AuthGuard)
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'confirmation', component: OrderConfirmationComponent },
  { path: 'checkout', component: CheckoutFormComponent, canActivate:[CartNotEmptyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
