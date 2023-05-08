"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  about: string;
}

const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register("email", { required: true })}
          type="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
          About
        </label>
        <textarea
          id="about"
          {...register("about")}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-150">
        Save Changes
      </button>
    </form>
  );
};

export default UserForm;
