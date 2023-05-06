"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useAuth(redirectUrl = "/login") {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      if (!session) {
        router.push(redirectUrl);
      } else {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      router.push(redirectUrl);
    } else {
      setLoading(true);
    }
  }, [status, session, router, redirectUrl]);

  return { loading };
}
