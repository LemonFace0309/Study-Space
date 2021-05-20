import React from "react";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LayersIcon from "@material-ui/icons/Layers";
import Friends from "./Friends";

const Sidebar = () => {
  return (
    //<div class="grid grid-flow-col grid-cols-100 grid-rows-1 gap-4">
    <div className="md: w-4/12 h-screen shadow-2xl bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="border-b py-3 mt-1 flex justify-around">
        <p className="text-xl  font-semibold">picture</p>
        <p>|</p>
        <p className="text-gray-400 text-lg">wallet</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">Menu</h1>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-white-600  cursor-pointer  ">
              <HomeIcon className=" text-gray-300" />
              <p className="text-gray-300">Home</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-white-600  cursor-pointer  ">
              <SearchIcon className="text-gray-300" />
              <p className="text-gray-300">Browse</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-white-600  cursor-pointer  ">
              <EqualizerIcon className="text-gray-300" />
              <p className="text-gray-300">Statistics</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="space-y-6 align-baseline">
            <h1 className="text-gray-300">FRIEND ACTIVITY</h1>
            <div className=""></div>
            <div
              className="transform cursor-pointer w-3/12  p-12 py-20 shadow-xl  
                    border rounded-xl bg-gradient-to-r from-purple-400 to-purple-400"
            >
              <Friends></Friends>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
