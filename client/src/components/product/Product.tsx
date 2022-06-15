import React, { useState, useEffect } from "react";
import { Product as ProductInterface } from "../../types";
import "./Product.css";

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product">
      <div className="product__name">{product.name}</div>
      <div className="product__price">${product.price}.00</div>
      <div className="product__stock">{product.stock} units</div>
      <div className="product__img">
        <img
          src={require("../../assets/img/product/" + product.img)}
          alt={product.name}
        />
      </div>
    </div>
  );
};

export default Product;
