import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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

const useStyles = makeStyles({
  button: {
    fontSize: "18px",
    textTransform: "lowercase", //makes it lowercase
    maxWidth: "200px",
    maxHeight: "50px",
    minWidth: "200px",
    minHeight: "30px",
    backgroundColor: "transparent",
    color: "#BDACD4",
    "&:hover": {
      backgroundColor: "#977BBF",
      color: "#fff",
    },
  },
  box: {
    borderRadius: "0px 15px 15px 0px",
    // HOW TO PUT MATERIAL UI COLORS HERE
    background: "linear-gradient(145deg, #4E3276, #8569AE)",
    height: "100%",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <div className="py-3 flex justify-around">
        <Typography variant="subtitle1" align="left">
          dashboard😊
        </Typography>
        <MenuOpenIcon style={{ color: "#BDACD4" }} />
      </div>
      <div className="py-4 pl-4 pr-4 space-y-4">
        <div className="pl-0 space-y-4">
          <div className="">
            <div className="flex p-3 rounded-r-md">
              <Button
                className={classes.button}
                variant="contained"
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md">
              <Button
                className={classes.button}
                variant="contained"
                startIcon={<SearchIcon />}
              >
                Browse
              </Button>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 rounded-r-md">
              <Button
                className={classes.button}
                variant="contained"
                startIcon={<EqualizerIcon />}
              >
                Statistics
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-14 mt-20">
        <div className="space-y-4">
          <Typography variant="subtitle2">FRIEND ACTIVITY</Typography>
          <FriendCard></FriendCard>
        </div>
      </div>
    </Box>
  );
};

export default Sidebar;
