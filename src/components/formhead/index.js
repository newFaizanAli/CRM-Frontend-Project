import React from "react";

const Index = ({ title, children }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default ">
          <div className="border-b border-stroke py-4 px-7">
            <h3 className="font-medium text-black">{title} Information</h3>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Index;
