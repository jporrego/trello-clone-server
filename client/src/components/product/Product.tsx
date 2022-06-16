import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Product.css";
import { Product as ProductInterface } from "../../types";

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, name, price, stock, img } = product;
  const navigate = useNavigate();

  const handleGoToItemDetail = () => {
    navigate(`/item/${_id}`);
  };

  return (
    <div className="product">
      <div className="product__name">{name}</div>
      <div className="product__price">${price}.00</div>
      <div className="product__stock">{stock} units</div>
      <div className="product__img">
        <img src={require("../../assets/img/product/" + img)} alt={name} />
      </div>
      <Link className="btn btn-link" to={`/item/${_id}`}>
        Details
      </Link>
      <Link className="btn btn-link" to={`/item/edit/${_id}`}>
        Edit
      </Link>
    </div>
  );
};

export default Product;
