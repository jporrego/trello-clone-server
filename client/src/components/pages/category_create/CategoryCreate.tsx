import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Category } from "../../../types";
import "./CategoryCreate.css";

type Inputs = {
  name: string;
};

const CategoryCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // We check if the category name already exists before creating.
      // If it does, show error. If it doesn't (status 204), create it.
      const response = await fetch(
        `http://localhost:4000/category/name/${data.name}`
      );
      if (response.status === 200) {
        //showError()
      } else if (response.status === 204) {
        await fetch("http://localhost:4000/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="category-create-form">
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="name">Category Name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}
      <input type="submit" />
    </form>
  );
};

export default CategoryCreate;
