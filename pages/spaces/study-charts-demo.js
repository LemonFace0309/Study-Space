import React from 'react';
import {Bar} from 'react-chartjs-2';
import ChartCard from "../../components/Spaces/Dashboard/ChartCard"
import VerticalBar from '../../components/Spaces/Dashboard/Charts/VerticalBar';
import { chartData } from '../../data/chartData';


export default function StudyChartsDemo() {
    const {peakStudyTimes, studyTimes} = chartData;
    return (
      <div className="flex flex-row space-x-5">
        {/* {cardData.map((data) => {
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
        })} */}
      <ChartCard title={peakStudyTimes.title} date={peakStudyTimes.date} chart={VerticalBar}/>
      <ChartCard title={studyTimes.title} date={studyTimes.date} chart={VerticalBar}/>
      {/* Github Heat Frequency Chart */}

      </div>
    
    )
      
      
    
  }
