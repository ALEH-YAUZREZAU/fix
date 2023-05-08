import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_WORKOUT } from "@lib/queries";
import Editor from "@shared/Editor";

import { TagSelect, Tag } from "./TagSelect";

interface FormData {
  title: string;
  description: string;
  isPublic: boolean;
  tags: Tag[];
}
const CreateWorkoutForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [createWorkout] = useMutation(CREATE_WORKOUT);
  const [description, setDescription] = useState("");
  // const { loading, error, data } = useQuery(AVAILABLE_TAGS);

  // const tags = useMemo(() => {
  //   return data?.availableTags || [];
  // }, [data]);

  const onSubmit = (data: FormData) => {
    createWorkout({
      variables: {
        input: {
          title: data.title,
          description: data.description,
          isPublic: data.isPublic,
          tags: data.tags,
        },
      },
    });
  };

  const handleTagChange = (tags: Tag[]) => {
    setValue(
      "tags",
      tags.map(({ id }) => id)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <TagSelect onChange={handleTagChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Editor
          value={description}
          onEditorChange={(content) => {
            setDescription(content);
            setValue("description", content);
          }}
          {...register("description", { required: true })}
        />
      </div>
      {/* <div className="mb-4 flex items-center">
        <input
          id="isPublic"
          type="checkbox"
          {...register("isPublic")}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-700">
          Public
        </label>
      </div> */}

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Workout
      </button>
    </form>
  );
};

export default CreateWorkoutForm;
