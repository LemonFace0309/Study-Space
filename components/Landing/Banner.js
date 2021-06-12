import { Container, Grid, Typography, Button, Hidden } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Banner = () => {
  return (
    <Container maxWidth="xl" className="flex-grow flex items-stretch">
      <Grid container direction="row" className="items-center p-2" spacing={3}>
        <Grid
          item
          xs={12}
          md={6}
          className="flex flex-col h-full justify-between items-start py-12">
          <Typography variant="body1">
            Hey there! Let us welcome you to
          </Typography>
          <div>
            <Typography variant="h4">
              Your aromia filled table at Starbucks.
            </Typography>
            <Typography variant="subtitle1">
              Increase your productivity with virtual spaces customized to your
              liking.
            </Typography>
          </div>
          <div>
            <Button
              className="normal-case px-10 m-2 rounded-full outline-none text-white bg-gray-500 hover:bg-gray-600"
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              Try it Yourself
            </Button>
            <Button
              color="inherit"
              className="normal-case px-10 m-2 rounded-full outline-none"
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              Create a Space
            </Button>
          </div>
          <Button
            endIcon={<ArrowDownwardIcon />}
            className="normal-case outline-none">
            See what you can do with XXX
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid item xs={6} className="flex justify-center items-center">
            <img
              src="/images/placeholder.jpg"
              alt="landing photo"
              className="max-h-96"
            />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Banner;
