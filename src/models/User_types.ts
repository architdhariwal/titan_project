export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    balance?: number;
  }