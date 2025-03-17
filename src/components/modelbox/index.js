import React from "react";

const Index = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white  w-full max-w-lg p-4">
        <div className="border-b border-stroke py-3 px-1 flex justify-between">
          <h3 className="font-medium text-black dark:text-white">
            {title} Information
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Index;
