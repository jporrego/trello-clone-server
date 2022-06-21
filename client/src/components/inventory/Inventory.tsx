import React from "react";
import { Link } from "react-router-dom";
import ItemList from "../pages/item_list/ItemList";
import "./Inventory.css";

const Inventory = () => {
  return (
    <div className="inventory">
      <div className="inventory-header">
        <div className="inventory-title">Inventory</div>
        <Link to="/item/create">Add Item</Link>
        <Link to="/category/create">Add Category</Link>
      </div>
      <div className="inventory-content">
        <ItemList></ItemList>
      </div>
    </div>
  );
};

export default Inventory;
