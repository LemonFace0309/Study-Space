import {
  Button,
} from '@material-ui/core';


function LeaveCall({ leaveCall }) {

  return (
    <div className="absolute top-0 right-0">
      <Button
        className="m-3 font-bold"
        color="primary"
        variant="outlined"
        onClick={leaveCall}
      >
        Quit
      </Button>
    </div>
  );
}

export default LeaveCall;
