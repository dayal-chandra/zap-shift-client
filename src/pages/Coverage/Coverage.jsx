import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district name"
          className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("flyToDistrict", { detail: searchTerm })
            )
          }
          className="bg-[#CAEB66] text-black hover:text-white px-4 py-2 rounded-r-md hover:bg-green-600"
        >
          Search
        </button>
      </div>

      <BangladeshMap />
    </div>
  );
};

export default Coverage;
