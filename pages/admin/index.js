import Grid from '@mui/material/Grid';

import People from '@/components/Admin/People';
import AdminChat from '@/components/Admin/AdminChat';

import { AdminProvider } from '@/context/admin';

const Admin = () => {
  return (
    <AdminProvider>
      <Grid container sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
        <Grid item xs={4} md={3} xl={2} sx={{ borderRight: '1px solid black' }}>
          <People />
        </Grid>
        <Grid item xs={8} md={9} xl={10}>
          <AdminChat />
        </Grid>
      </Grid>
    </AdminProvider>
  );
};

export default Admin;
