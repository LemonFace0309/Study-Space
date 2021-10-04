import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import {
  Dialog,
  Grid,
  Typography,
  Box as MuiBox,
  InputLabel,
  InputBase,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';

import createNewSpace from '@/utils/spaces/createNewSpace';
import * as userState from '@/atoms/user';

const Box = styled(MuiBox)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'relative',
  backgroundColor: `${theme.palette.primary.light}15`,
}));

const Label = styled(InputLabel)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.dark,
  fontSize: theme.spacing(2.5),
  fontWeight: '500',
}));

const TextInput = styled(InputBase, { shouldForwardProp: (prop) => prop !== 'textCenter' })(
  ({ textCenter, theme }) => ({
    'label + &': {
      marginTop: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      padding: '6px 12px',
      border: '1px solid #BDACD4',
      fontSize: theme.spacing(2.5),
      ...(textCenter && {
        textAlign: 'center',
      }),
    },
  })
);

const CreateSpaceDialog = ({ open, setOpen }) => {
  const user = useRecoilValue(userState.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createASpace = async () => {
    setLoading(true);
    try {
      const newSpaceURL = await createNewSpace(user);
      router.push(newSpaceURL);
    } catch (err) {
      console.debug('Unable to create new space:', err);
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      sx={{
        '& .MuiPaper-root': {
          p: (theme) => theme.spacing(2),
          borderRadius: '1rem',
        },
      }}
      onClose={() => setOpen(false)}
      aria-labelledby="Create Space Dialog">
      <Grid
        container
        sx={{ p: (theme) => theme.spacing(6), pb: (theme) => theme.spacing(1) }}
        direction="row"
        spacing={4}>
        <Typography
          variant="h4"
          sx={{
            color: (theme) => theme.palette.primary.dark,
            width: '100%',
            ml: (theme) => theme.spacing(4),
            mb: (theme) => `-${theme.spacing(2)}}`,
          }}>
          Create a new space
        </Typography>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Basic Info</Typography>
          <Box>
            <Label htmlFor="csd-name-input">Name</Label>
            <TextInput
              fullWidth
              required
              id="csd-name-input"
              defaultValue={`${user?.username ? user.username : user?.name ? user.name : 'My'} Study Space`}
            />

            <Label htmlFor="csd-description-input">Description (Optional)</Label>
            <TextInput fullWidth multiline minRows="3" id="csd-description-input" />

            <Label htmlFor="csd-visilbity-radio">Visibility</Label>
            <RadioGroup aria-label="visibility" id="csd-visilbity-radio">
              <FormControlLabel value="private" control={<Radio />} label="Private" />
              <FormControlLabel value="public" control={<Radio />} label="Public" />
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Functions</Typography>
          <Box>
            <Label htmlFor="csd-study-break-input">Study Break Pattern</Label>
            <TextInput required id="csd-study-input" defaultValue="50" textCenter sx={{ width: '6rem' }} />
            <Typography
              variant="subtitle1"
              sx={{ fontSize: (theme) => theme.spacing(2.5), display: 'inline', mx: '12px' }}>
              /
            </Typography>
            <TextInput required id="csd-break-input" defaultValue="10" textCenter sx={{ width: '6rem' }} />
            <Typography
              variant="subtitle1"
              sx={{ fontSize: (theme) => theme.spacing(2.5), display: 'inline', ml: '12px' }}>
              min
            </Typography>

            <Label htmlFor="csd-description-input">Description (Optional)</Label>
            <TextInput fullWidth multiline minRows="3" id="csd-description-input" />

            <Label htmlFor="csd-visilbity-radio">Visibility</Label>
            <RadioGroup aria-label="visibility" id="csd-visilbity-radio">
              <FormControlLabel value="private" control={<Radio />} label="Private" />
              <FormControlLabel value="public" control={<Radio />} label="Public" />
            </RadioGroup>
          </Box>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowForwardIcon />}
          sx={{
            background: (theme) => theme.palette.primary.dark,
            borderRadius: '2rem',
            whiteSpace: 'nowrap',
            ml: 'auto',
            mt: (theme) => theme.spacing(4),
            mb: (theme) => theme.spacing(2),
          }}
          onClick={createASpace}>
          Next {loading && <CircularProgress size={30} sx={{ ml: (theme) => theme.spacing(1) }} />}
        </Button>
      </Grid>
    </Dialog>
  );
};

CreateSpaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateSpaceDialog;
