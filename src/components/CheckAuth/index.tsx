"use client";
import React from "react";
import { useAuth } from "./useAuth";

import { FullScreenLoading } from "../Loading";

export const CheckAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC = ({ ...props }) => {
    const { loading } = useAuth();

    console.log(loading, "loading");
    if (loading) {
      return <FullScreenLoading />;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default CheckAuth;
