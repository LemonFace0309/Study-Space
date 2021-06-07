import React from "react";
import {Paper} from "@material-ui/core";

import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

export default function SpacesCard(props) {
  return (
    <Paper className={`flex flex-col cursor-pointer w-4/12 transform hover:scale-110 hover:shadow transition ease-out duration-200`}
    elevation={5}>
      <div className="flex flex-grow justify-between ">
        <div className="text-left p-3">
          <h2 className="text-xl text-purple-900">{props.spaceName}</h2>
          <p className="text-sm text-gray-600">{props.description}</p>
        </div>

        <div className=" text-purple-300 flex items-center justify-center flex-col m-1 bg-opacity-30">
          <VideocamOffIcon />
          <MicIcon />
          <ChatIcon />
        </div>
      </div>

      <div className="flex flex-row text-gray-900 text-sm text-purple-400 bg-purple-50 rounded-xl p-2 space-x-2">
        <div>
          <PeopleIcon />
          {props.headCount}
        </div>

        <div>
          <LibraryMusicIcon />
          {props.music}
        </div>
      </div>
    </Paper>
  );
}
