import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { Product as ProductInterface } from "../../types";

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
      <Link className="btn btn-link" to={`/edit/${product._id}`}>
        Edit
      </Link>
    </div>
  );
};

export default Product;
