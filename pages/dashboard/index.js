import Sidebar from "../../components/Dashboard/Sidebar";
import Container from "../../components/Dashboard/Container";
import {Grid} from "@material-ui/core";

export default function Dashboard() {
  return (

    <Grid container>
      <Grid  xs={3}>
        <Sidebar/>
      </Grid>
    </Grid>
  );
}
