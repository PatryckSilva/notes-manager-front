import React from "react";

const Loader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex size-28 animate-spin items-center justify-center rounded-full border-8 border-gray-300 border-t-blue-400 text-4xl text-blue-400"></div>
    </div>
  );
};

export default Loader;
