import { useState } from 'react';
import Button from '@material-ui/core/Button';
import SignUpModal from '../../components/Auth/SignUpModal';

const SignUp = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Signup
      </Button>
      <SignUpModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default SignUp;
