import React from 'react'
import Middle from '../Middle'
import RightBar from '../RightBar'
import Typography from '@material-ui/core/Typography'
import DashboardCard from "./Cards/DashboardCard";

const DashboardContainer = () => {
  return (
    <div className="h-full">
      <div className="px-8 py-1">
        <Typography variant="h4" className="pt-4">
          Hey Charles!
        </Typography>
        <Typography variant="h7">
          The key is not to prioritize what's on your schedule, but to schedule
          your priorities.
        </Typography>
      </div>
      <div className="flex ml-3 mt-6 space-x-6 mr-4"></div>

      {/* can be editied to store new cards */}
      <div className="flex flex-row space-x-5 p-10">
        <DashboardCard
          variant="primary"
          spaceName="Create a Space"
          description="insert some sort of tagline or feature description "
        />
        <DashboardCard
          spaceName="Join a Space"
          description="insert some sort of tagline or feature description "
        />
      </div>;
    </div>
  )
}
export default DashboardContainer;
