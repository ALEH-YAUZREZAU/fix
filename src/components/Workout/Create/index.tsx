import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_WORKOUT = gql`
  mutation CreateWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
      title
      description
      isPublic
      tags {
        tag {
          id
          name
        }
      }
    }
  }
`;

interface FormData {
  title: string;
  description: string;
  isPublic: boolean;
  tags: string;
}

const CreateWorkoutForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [createWorkout] = useMutation(CREATE_WORKOUT);

  const onSubmit = (data: FormData) => {
    createWorkout({
      variables: { input: { ...data, tags: data.tags.split(",") } },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title")} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input id="description" {...register("description")} />
      </div>
      <div>
        <label htmlFor="isPublic">Is Public</label>
        <input id="isPublic" type="checkbox" {...register("isPublic")} />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input id="tags" {...register("tags")} />
      </div>
      <button type="submit">Create Workout</button>
    </form>
  );
};

export default CreateWorkoutForm;
