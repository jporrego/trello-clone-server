import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { ProductPOST, Category, Brand } from "../../../types";
import "./ItemCreate.css";

type Inputs = {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  img: string;
};

const ItemCreate = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const getCategoriesAndBrands = async () => {
    try {
      //const response = await fetch("http://localhost:4000/categories");
      //const data = await response.json();
      //setCategories(data);
      const response = await Promise.all([
        fetch("http://localhost:4000/categories"),
        fetch("http://localhost:4000/brands"),
      ]);
      const categoryData = await response[0].json();
      const brandData = await response[1].json();
      setCategories(categoryData);
      setBrands(brandData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // First we fetch the category by id (data.category).
      // Then we add the category object to the newItem object.
      const response = await fetch(
        `http://localhost:4000/category/${data.category}`
      );
      const category: Category = await response.json();
      const newItem: ProductPOST = { ...data, category: category };
      console.log(data);
      /*
      await fetch("http://localhost:4000/item/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      navigate("/");*/
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

      <label htmlFor="brand">Brand</label>
      <select {...register("brand", { required: true })}>
        {brands.map((brand) => (
          <option value={brand._id} key={brand._id}>
            {brand.name}
          </option>
        ))}
      </select>
      {errors.brand && <span>Brand is required</span>}

      <label>Category</label>
      <select {...register("category", { required: true })}>
        {categories.map((category) => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.category && <span>Category is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <label>Description</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <span>Name is required</span>}

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
