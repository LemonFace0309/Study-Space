import { Grid } from '@material-ui/core';

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
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} container direction="column">
        <Grid item>
          <DashboardContainer />
        </Grid>
        <Grid item container>
          <Grid item>
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
          <Grid item>
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
