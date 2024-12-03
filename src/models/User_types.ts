export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  balance?: number;
  addresses?: Address[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}