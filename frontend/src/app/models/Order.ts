export interface OrderProduct {
    product_id: number;
    quantity: number;
}
  
export interface Order {
    id: number;
    user_id: number;
    order_status: 'active' | 'complete';
    products: OrderProduct[];
}
