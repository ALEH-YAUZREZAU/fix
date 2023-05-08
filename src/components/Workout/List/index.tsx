import { MY_WORKOUTS, DELETE_WORKOUT } from "@lib/queries";
import React, { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { ITag } from "@components/Workout/types";
import Tag from "@components/Workout/Tag";

const WorkoutList: React.FC = () => {
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(MY_WORKOUTS);
  const [deleteWorkout] = useMutation(DELETE_WORKOUT);

  const workouts = data?.myWorkouts;

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p>Error loading workouts: {error.message}</p>;

  const hanleEditClick = (id: string) => {
    router.push(`/workout/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkout({ variables: { id } });
      await refetch();
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  return (
    <div>
      {workouts.map((workout: { id: string; title: string; description: string; tags: ITag[] }) => {
        return (
          <div key={workout.id} className="border-b pb-2 mb-2">
            <h2 className="text-xl font-semibold mb-4 cursor-pointer">
              <a onClick={() => hanleEditClick(workout.id)} className="hover:underline">
                {workout.title}
              </a>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(workout.description) }} />
            <div className="mt-2">
              {workout.tags.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </div>
            <button
              onClick={() => handleDelete(workout.id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutList;
