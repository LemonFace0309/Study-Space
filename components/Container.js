import React from "react";
import TemplateCard from "./Cards/Card";
import Middle from "./Middle";
import RightBar from "./RightBar";

const Container = () => {
  return (
    <div className=" h-full ">
      <div className="  px-8 py-1 ">
        <p className="pt-4 text-gray-500 font-bold text-2xl">Hey Charles!</p>
        <p className=" pt-2 transform -translate-y-2">
          The key is not to prioritize what's on your schedule, but to schedule
          your priorities.
        </p>
      </div>
      <div className="flex p-4 space-x-3">
        {/*<TemplateCard title="TOTAL" balance={409.079} icon={0} />
        <TemplateCard title="AVAILABLE" balance={300.079} icon={1} /> */}
      </div>
      <div className="flex ml-3 mt-6 space-x-6 mr-4"></div>
    </div>
  );
};

export default Container;
