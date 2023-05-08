"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { FullScreenLoading } from "@components/Loading";

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
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <FullScreenLoading />;
  }

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

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
