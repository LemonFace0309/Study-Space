import PropTypes from 'prop-types';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SmallFeature = ({ feature }) => {
  return (
    <Grid item xs={12} md={6} className="flex flex-row items-center">
      <div className="rounded-full h-24 w-24 mr-4 overflow-hidden relative flex-shrink-0">
        <Image
          src={feature.img}
          alt="Interesting Study Space Feature"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
        />
      </div>
      <div className="flex-shrink">
        <Typography variant="h6">{feature.title}</Typography>
        <Typography variant="body1">{feature.body}</Typography>
      </div>
    </Grid>
  );
};

SmallFeature.propTypes = {
  feature: PropTypes.exact({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }),
};

export default SmallFeature;
