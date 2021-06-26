import { Grid, Hidden } from '@material-ui/core';

import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardContainer from '../../components/Dashboard/DashboardContainer';
import ChartCard from '../../components/Dashboard/Cards/ChartCard';
import VerticalBar from '../../components/Dashboard/Cards/Charts/VerticalBar';
import LineChart from '../../components/Dashboard/Cards/Charts/LineChart';
import { chartData } from '../../data/chartData';

export default function Dashboard() {
  const { peakStudyTimes, studyTimes } = chartData;
  return (
    <Grid container>
      <Hidden smDown>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9} container>
        <Grid item>
          <DashboardContainer />
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={6}>
            <ChartCard
              title={peakStudyTimes.title}
              date={peakStudyTimes.date}
              chart={
                <VerticalBar
                  options={peakStudyTimes.options}
                  data={peakStudyTimes.data}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard
              title={studyTimes.title}
              date={studyTimes.date}
              chart={
                <LineChart
                  options={studyTimes.options}
                  data={studyTimes.data}
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
