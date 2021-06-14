import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FriendCard from "./Cards/FriendCard";

const useStyles = makeStyles({
  button: {
    fontSize: "18px",
    textTransform: "capitalize",
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
    background: "linear-gradient(145deg, #4E3276, #8569AE)",
    height: "100%",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    //className={classes.box}
    <Box bgcolor={theme.palette.primary.dark} className="h-screen rounded-r-xl">
      <div className="py-5 flex justify-around">
        <Typography variant="subtitle1" align="left">
          Dashboard😊
        </Typography>
        <MenuOpenIcon
          className="pt-2"
          color={theme.palette.primary.light} // doesn't work
          style={{ color: "#BDACD4" }}
        />
      </div>
      <div className="py-4 pl-4 pr-4">
        <div className="">
          <div className="flex p-3 rounded-r-md">
            <Button
              //style={{ color: "#BDACD4", backgroundColor: "#4E3276" }}
              //bgcolor={theme.palette.primary.main}
              className={classes.button}
              //className="capitalize w-48 rounded-l-none"
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
