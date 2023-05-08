"use client";
import CreateWorkoutForm from "@components/Workout/Create";
import CheckAuth from "@components/CheckAuth";

function CreateWorkout() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl mb-4">Create a Workout</h1>
      <CreateWorkoutForm />
    </div>
  );
}

export default CheckAuth(CreateWorkout);
