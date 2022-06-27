import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { Category } from "../../types";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      //Disabled for safety

      const res = await fetch(`http://localhost:4000/category/${id}/delete`, {
        method: "POST",
      });
      if (res.status === 409) {
        const data = await res.json();
        data.message && console.log(data.message);
      }
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="categories">
      <div className="categories-title">Categories</div>
      <div className="categories-buttons">
        <Link to="/category/create">Add Category</Link>
      </div>
      <div className="categories-content">
        {categories.map((c) => (
          <div className="category hover-translate-y" key={c._id}>
            {c.name}
            <AiFillDelete
              onClick={() => handleDeleteCategory(c._id)}
            ></AiFillDelete>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
