import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import "./ItemEdit.css";
import {
  Product as ProductInteface,
  ProductPOST,
  Brand,
  Category,
} from "../../../types";
import CloudinaryImg from "../../cloudinary_img/CloudinaryImg";

type Inputs = {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  picture: any;
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
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getItemToEdit();
    getCategoriesAndBrands();
  }, []);

  useEffect(() => {
    setInitialValues();
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

  const getCategoriesAndBrands = async () => {
    try {
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

  const getItemToEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/item/${params.id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setInitialValues = () => {
    // After the item state is updated, it sets the initial values to edit.
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("category", item.category._id);
    setValue("brand", item.brand._id);
    setValue("price", item.price);
    setValue("stock", item.stock);
    setValue("picture", item.img);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // First we fetch the category and brand by id (data.category).
      // Then we add them object to the newItem object.

      const response = await Promise.all([
        fetch(`http://localhost:4000/category/${data.category}`),
        fetch(`http://localhost:4000/brand/${data.brand}`),
      ]);
      const categoryData: Category = await response[0].json();
      const brandData: Brand = await response[1].json();
      const newItem: ProductPOST = {
        ...data,
        category: categoryData,
        brand: brandData,
      };

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
    }
  };

  const loadingElement = (
    <div className="loading">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  const formElement = (
    <React.Fragment>
      <div className="form-title">Add New Item</div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
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
        <label>Picture</label>
        <CloudinaryImg path={item.img} size={80}></CloudinaryImg>
        <input {...register("picture")} type="file" accept="image/*" />
        {errors.description && <span>Picture is required</span>}
        <input type="submit" />
      </form>
    </React.Fragment>
  );

  return (
    <div className="item-edit">{loading ? loadingElement : formElement}</div>
  );
};

export default ItemEdit;
