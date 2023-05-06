"use client";
import CreateWorkoutForm from "@components/Workout/Create";
import CheckAuth from "@components/CheckAuth";

function CreateWorkout() {
  return (
    <div className="m-12">
      <CreateWorkoutForm />
    </div>
  );
}

export default CheckAuth(CreateWorkout);
