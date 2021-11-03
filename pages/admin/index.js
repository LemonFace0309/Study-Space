import Grid from '@mui/material/Grid';

import People from '@/components/Admin/People';
import Chat from '@/components/Admin/Chat';

import { AdminProvider } from '@/context/admin';

const Admin = () => {
  return (
    <AdminProvider>
      <Grid container sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
        <Grid item xs={4} xl={2}>
          <People />
        </Grid>
        <Grid item xs={8} xl={10}>
          <Chat />
        </Grid>
      </Grid>
    </AdminProvider>
  );
};

export default Admin;
