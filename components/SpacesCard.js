import React from "react";
import Card from "@material-ui/core/Card";

import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

export default function SpacesCard(props) {
  return (
    <div
      className={`flex flex-col transform hover:scale-110 cursor-pointer transition delay-100 w-4/12  p-2 py-2 shadow-xl  border rounded-xl bg-gradient-to-r `}
    >
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
    </div>
  );
}
