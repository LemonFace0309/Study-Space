import React from "react";
import Card from "../components/Card";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LayersIcon from "@material-ui/icons/Layers";
import FriendCard from "./FriendCard";

const Sidebar = () => {
  return (
    //<div class="grid grid-flow-col grid-cols-100 grid-rows-1 gap-4">
    <div className="overflow-auto fixed w-4/12 h-screen shadow-2xl bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="py-3 mt-1 flex justify-around">
        <p className="text-xl font-semibold text-gray-300">dashboard😊</p>
        <MenuOpenIcon style={{ color: "white" }} />
      </div>
      <div className="py-4 pl-0 pr-4 space-y-14">
        <div className="space-y-4">
          <h1 className="pl-4 text-gray-300">MENU</h1>
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700  space-x-4 0 hover:bg-purple-300 hover:text-purple-600 cursor-pointer  ">
              <HomeIcon className=" text-gray-300" />
              <p className="text-gray-300">Home</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700  space-x-4 0 hover:bg-purple-300  hover:text-purple-600  cursor-pointer  ">
              <SearchIcon className="text-gray-300" />
              <p className="text-gray-300">Browse</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700  space-x-4 0 hover:bg-purple-300  hover:text-purple-600  cursor-pointer  ">
              <EqualizerIcon className="text-gray-300" />
              <p className="text-gray-300">Statistics</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-14 mt-20">
        <div className="space-y-4">
          <h1 className="text-gray-300">FRIEND ACTIVITY</h1>
          <FriendCard></FriendCard>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
