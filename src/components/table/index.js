import React from "react";
import { CiSearch } from "../icons";

const Index = ({ children, searchQuery, setSearchQuery }) => {
  return (
    <div className="overflow-x-auto">
      <div className="my-2 text-lg w-96">
        <div className="">
          <input
            className="w-full rounded border border-stroke bg-gray py-2 pl-2 pr-8 text-black focus:border-primary focus-visible:outline-none"
            type="text"
            id="searchQuery"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <CiSearch color="#6C6C6C" size={25} />
          </span> */}
        </div>
      </div>

      <table className="min-w-full bg-white text-sm">{children}</table>
    </div>
  );
};

export default Index;
