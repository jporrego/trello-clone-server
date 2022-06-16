import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import "./ItemDetail.css";
import { Product as ProductInferface } from "../../../types";

const ItemDetail = () => {
  const [product, setProduct] = useState<ProductInferface>();
  useEffect(() => {
    getItem();
  }, []);
  const params = useParams();
  const navigate = useNavigate();

  const getItem = async () => {
    try {
      const response = await fetch(`http://localhost:4000/item/${params.id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await fetch(`http://localhost:4000/item/${params.id}/delete`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="item_detail">
      {product && (
        <React.Fragment>
          <div className="item_detail__name">{product.name}</div>
          <div className="item_detail__description">{product.description}</div>
          <div className="item_detail__category">
            <div>{product.category.name}</div>
          </div>
          <div className="item_detail__info">
            <div className="item_detail__price">${product.price}.00</div>
            <div className="item_detail__stock">{product.stock} units</div>
            <Link className="btn btn-link" to={`/item/edit/${product._id}`}>
              Edit Item
            </Link>
            <div className="delete-btn--text" onClick={onDelete}>
              Delete
            </div>
          </div>
          <div className="item_detail__img">
            <img
              src={require("../../../assets/img/product/" + product.img)}
              alt={product.name}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ItemDetail;
