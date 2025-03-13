import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl text-gray-700 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Index;
