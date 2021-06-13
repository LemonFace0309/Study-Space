import React from 'react'
import Middle from './Middle'
import RightBar from './RightBar'
import Typography from '@material-ui/core/Typography'

const Container = () => {
  return (
    <div className="h-full">
      <div className="px-8 py-1">
        <Typography variant="h1" className="pt-4">
          Hey Charles!
        </Typography>
        <Typography variant="h3">
          The key is not to prioritize what's on your schedule, but to schedule
          your priorities.
        </Typography>
      </div>
      <div className="flex ml-3 mt-6 space-x-6 mr-4"></div>
    </div>
  )
}

export default Container
