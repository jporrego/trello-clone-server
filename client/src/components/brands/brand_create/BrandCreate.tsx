import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Brand } from "../../../types";
import "./BrandCreate.css";

type Inputs = {
  name: string;
};

const BrandCreate = () => {
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

      const res = await fetch(`http://localhost:4000/brand/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
      if (res.status !== 200) {
        throw new Error("Already exists");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-create">
      <div className="form-title">Add New Brand</div>
      <form onSubmit={handleSubmit(onSubmit)} className="category-create-form">
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="name">Brand Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default BrandCreate;
