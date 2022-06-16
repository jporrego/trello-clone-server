import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./ItemCreate.css";
import { ProductPOST, Category } from "../../../types";

type Inputs = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  img: string;
};

const ItemCreate = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:4000/category/${data.category}`
      );
      const category: Category = await response.json();
      const newItem: ProductPOST = { ...data, category: category };

      await fetch("http://localhost:4000/item/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      //setForm({ name: "", position: "", level: "" });
      //navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(watch("name"));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="item-create-form">
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="name">Item Name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <label>Description</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <span>Name is required</span>}

      <label>Category</label>
      <select {...register("category", { required: true })}>
        {categories.map((category) => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <label>Price</label>
      <input {...register("price", { required: true, min: 0 })} />
      {errors.description && <span>Price is required</span>}

      <label>Stock</label>
      <input {...register("stock", { required: true, min: 0 })} />
      {errors.description && <span>Stock is required</span>}

      <label>Img(URL)</label>
      <input {...register("img", { required: false })} />
      {errors.description && <span>Stock is required</span>}

      <input type="submit" />
    </form>
  );
};

export default ItemCreate;
