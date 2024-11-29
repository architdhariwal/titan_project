export interface OrderItem {
    productId: number;
    quantity: number;
  }
  
  export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
    status: 'processing' | 'shipped' | 'delivered';
    createdAt: string;
  }