export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}
