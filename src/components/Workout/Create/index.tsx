import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_WORKOUT, AVAILABLE_TAGS } from "@lib/queries";

interface FormData {
  title: string;
  description: string;
  isPublic: boolean;
  tags: string;
}

const WorkoutForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const { loading, error, data } = useQuery(AVAILABLE_TAGS);

  const onSubmit = (data: any) => {
    const { title, description, isPublic, tags } = data;
    createWorkout({
      variables: { input: { title, description, isPublic, tags } },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          {...register("title", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.title && <p className="text-red-500 text-xs italic">Title is required</p>}
      </div>
      {/* Add other form elements for description, isPublic, and tags */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
