import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import "./ItemEdit.css";
import {
  Product as ProductInteface,
  ProductPOST,
  Category,
} from "../../../types";

type Inputs = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  img: string;
};

const ItemEdit = () => {
  const [item, setItem] = useState<ProductInteface>({
    _id: "",
    name: "",
    category: {
      _id: "",
      name: "",
    },
    brand: {
      _id: "",
      name: "",
    },
    description: "",
    price: 0,
    stock: 0,
    img: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getItemToEdit();
    getCategories();
  }, []);

  useEffect(() => {
    updateValues();
  }, [item]);

  const params = useParams();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemToEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/item/${params.id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateValues = () => {
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("category", item.category._id);
    setValue("price", item.price);
    setValue("stock", item.stock);
    setValue("img", item.img);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    /*try {
       EDIT TO MATCH NEW BRAND MODEL ----------------------
      const categoryFetch = await fetch(
        `http://localhost:4000/category/${data.category}`
      );
      const category: Category = await categoryFetch.json();
      const newItem: ProductPOST = { ...data, category: category };

      await fetch(`http://localhost:4000/item/${params.id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      navigate(`/item/${params.id}`);
    } catch (error) {
      console.log(error);
    }*/
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="item-create-form">
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="name">Item Name</label>
      <input {...register("name", { required: true, value: item.name })} />
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

export default ItemEdit;
