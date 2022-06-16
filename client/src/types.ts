export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  stock: number;
  img: string;
}

export interface ProductPOST {
  name: string;
  description: string;
  category: Category;
  price: number;
  stock: number;
  img: string;
}
