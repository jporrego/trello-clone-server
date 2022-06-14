export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  category: Category;
  name: string;
  price: number;
  stock: number;
  img: string;
}
