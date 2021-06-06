import React from "react";
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
export default function SpacesCard(props) {
  return (
    <div
      className={`transform hover:scale-110 cursor-pointer transition delay-100 w-3/12  p-2 py-4 shadow-xl  border rounded-xl bg-gradient-to-r`}
    >
      <div className="flex justify-between ">
        <div className="bg-pink-500">
          <h2>{props.spaceName}</h2>
          <p>{props.description}</p>
        </div>

        <div className=" flex items-center justify-center  flex-col m-1  bg-opacity-30 bg-red-500">
         <VideocamOffIcon/>
         <MicIcon/>
         <ChatIcon/>
        </div>
      </div>





      <div className="bg-gray-500">
          <div>
          <PeopleIcon/>
            {props.headCount}  
          </div>
          <div>
            <LibraryMusicIcon/>
            {props.music}
          </div>
        </div>

    </div>
  );
}
