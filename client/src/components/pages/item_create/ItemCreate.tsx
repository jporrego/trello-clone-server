import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
  price: number;
  stock: number;
  img: string;
};

const ItemCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name"));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("description", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.description && <span>Name is required</span>}

      <input {...register("price", { required: true, min: 0 })} />
      <input {...register("stock", { required: true, min: 0 })} />
      <input {...register("img", { required: true })} />

      <input type="submit" />
    </form>
  );
};

export default ItemCreate;
