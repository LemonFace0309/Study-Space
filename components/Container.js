import React from "react";
import Middle from "./Middle";
import RightBar from "./RightBar";

const Container = () => {
  return (
    <div className="h-full">
      <div className="px-8 py-1">
        <p className="pt-4 text-purple-900 font-medium text-4xl">
          Hey Charles!
        </p>
        <p className="pt-4 transform -translate-y-2 text-sm">
          The key is not to prioritize what's on your schedule, but to schedule
          your priorities.
        </p>
      </div>
      <div className="flex ml-3 mt-6 space-x-6 mr-4"></div>
    </div>
  );
};

export default Container;
