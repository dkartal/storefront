import { Product } from "./Product";

export interface CartItem {
    product: Product;
    quantity: number;
}
export interface ShoppingCart {
    products: CartItem[];
    totalPrice: number;
}