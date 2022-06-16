import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { Product as ProductInterface } from "../../types";

interface ProductProps {
  product: ProductInterface;
  handleDeleteProduct: (id: string) => void;
}

const Product: React.FC<ProductProps> = ({ product, handleDeleteProduct }) => {
  const { _id, name, price, stock, img } = product;

  return (
    <div className="product">
      <div className="product__name">{name}</div>

      <div className="product__details">
        <div className="product__price">${price}.00</div>
        <div className="product__stock">{stock} units</div>
      </div>

      <div className="product__buttons">
        <Link className="btn btn-link" to={`/item/${_id}`}>
          Details
        </Link>
        <Link className="btn btn-link" to={`/item/edit/${_id}`}>
          Edit
        </Link>
        <div
          className="delete-btn--text"
          onClick={() => handleDeleteProduct(_id)}
        >
          Delete
        </div>
      </div>

      <div className="product__img">
        <img src={require("../../assets/img/product/" + img)} alt={name} />
      </div>
    </div>
  );
};

export default Product;
