import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: false,
  
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.css'
})
export class QuantitySelectorComponent {
  @Input() quantity?: number;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  incrementQuantity() {
    this.increment.emit();
  }

  decrementQuantity() {
    this.decrement.emit();
  }
}
