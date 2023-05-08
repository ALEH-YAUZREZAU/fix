import React, { useState } from "react";
// import CreateWorkoutForm from "./CreateWorkoutForm";
import WorkoutList from "./List";

const Workout: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <WorkoutList />
    </div>
  );
};

export default Workout;
