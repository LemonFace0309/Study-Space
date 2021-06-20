import React from "react";
import SpaceCard from "../../components/Spaces/Dashboard/SpaceCard";

import { spaceCardTestData } from "../../data/spaceCardTestData";


export default function SpaceCardDemo() {

  const { cardData } = spaceCardTestData;

  return (
  
      <div className="flex flex-row space-x-5">
        {cardData.map((data) => {
          let { spaceName, description, headCount, music } = data;

          return (
            <div className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
              <SpaceCard
                spaceName={spaceName}
                description={description}
                headCount={headCount}
                music={music}
              />
            </div>
          );
        })}
      </div>

  );
}
