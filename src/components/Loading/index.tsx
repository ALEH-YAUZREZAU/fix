import React from "react";

export const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-200"></div>
    </div>
  );
};

export default FullScreenLoading;
