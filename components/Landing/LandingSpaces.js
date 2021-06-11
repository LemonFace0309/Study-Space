import Grid from '@material-ui/core/Grid'

import SpaceCard from '../Shared/SpaceCard'

const LandingSpaces = ({ data }) => {
  return (
    <Grid container spacing={3} className="py-4 px-8 bg-gray-200">
      {data.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          md={6}
          lg={4}
          className="cursor-pointer transform hover:scale-105 transition ease-out duration-200"
        >
          <SpaceCard
            spaceName={card.spaceName}
            description={card.description}
            headCount={card.headCount}
            music={card.music}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default LandingSpaces
