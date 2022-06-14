import React, { useState, useEffect } from "react";
import { Product as ProductInferface } from "../../types";
import Product from "../product/Product";

function Home() {
  const [products, setProducts] = useState<ProductInferface[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/inventory");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Home</div>
      {products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
}

export default Home;
