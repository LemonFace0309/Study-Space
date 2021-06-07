import { Container, Grid, Typography } from "@material-ui/core"

const Banner = () => {
  return (
    <Container maxWidth="xl" className="flex-grow">
      <Grid container direction="row" className="h-full items-center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h1">TEXT</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h1">Image</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Banner
