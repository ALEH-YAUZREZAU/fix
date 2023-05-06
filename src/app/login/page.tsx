"use client";
import { signIn } from "next-auth/react";

interface GoogleAuthButtonProps {
  onClick: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center space-x-2 px-4 py-2 text-white font-semibold bg-red-600 hover:bg-red-500 rounded"
    >
      <i className="fab fa-google text-xl"></i>
      <span>Sign in with Google</span>
    </button>
  );
};

export default function Login() {
  const handleGoogleAuthClick = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <GoogleAuthButton onClick={handleGoogleAuthClick} />
      </div>
    </>
  );
}
