import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardContainer from '../../components/Dashboard/DashboardContainer';
import { Grid, Container } from '@material-ui/core';

export default function Dashboard() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <DashboardContainer />
      </Grid>
    </Grid>
  );
}
