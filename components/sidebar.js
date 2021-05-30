import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "./Cards/Card";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LayersIcon from "@material-ui/icons/Layers";
import FriendCard from "./Cards/FriendCard";

const Sidebar = () => {
  return (
    <div className="overflow-auto fixed w-4/12 h-screen shadow-2xl bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="py-3 mt-1 flex justify-around">
        <Typography variant="h6" align="left">
          dashboard😊
        </Typography>
        <MenuOpenIcon style={{ color: "white" }} />
      </div>
      <div className="py-4 pl-4 pr-4 space-y-4">
        <Typography variant="h6">MENU</Typography>
        <div className="pl-0 space-y-4">
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700">
              <Button
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                style={{
                  maxWidth: "200px",
                  maxHeight: "50px",
                  minWidth: "200px",
                  minHeight: "30px",
                }}
              >
                Home
              </Button>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                style={{
                  maxWidth: "200px",
                  maxHeight: "50px",
                  minWidth: "200px",
                  minHeight: "30px",
                }}
              >
                Browse
              </Button>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md text-gray-700 ">
              <Button
                variant="contained"
                color="primary"
                startIcon={<EqualizerIcon />}
                style={{
                  maxWidth: "200px",
                  maxHeight: "50px",
                  minWidth: "200px",
                  minHeight: "30px",
                }}
              >
                Statistics
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-14 mt-20">
        <div className="space-y-4">
          <Typography variant="h6">FRIEND ACTIVITY</Typography>
          <FriendCard></FriendCard>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
