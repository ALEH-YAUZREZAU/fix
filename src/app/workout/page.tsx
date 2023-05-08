"use client";
import WorkoutsMain from "@components/Workout";
import CheckAuth from "@components/CheckAuth";
import { useRouter } from "next/navigation";

function Workouts() {
  const router = useRouter();

  const toggleCreateWorkoutForm = () => {
    router.push("/workout/create");
  };

  return (
    <div className="container mx-auto mt-8">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Workouts</h1>
        <button onClick={toggleCreateWorkoutForm} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Workout
        </button>
      </nav>
      <WorkoutsMain />
    </div>
  );
}

export default CheckAuth(Workouts);
