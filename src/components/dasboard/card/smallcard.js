import React from "react";

const StikyCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-transparent rounded-2xl shadow-sm border border-gray-300">
      <p className="text-xs text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold text-gray-700">{value}</h2>
    </div>
  );
};

export default StikyCard;
