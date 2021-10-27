import Image from 'next/image';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import genericPic from '@/public/images/avatar/anime.png';

const DisplayImageContainer = styled(Box)({
  position: 'absolute',
  height: '18rem',
  width: '32rem',
  top: 0,
  left: 0,
  backgroundColor: 'black',
  display: 'grid',
  placeItems: 'center',
  zIndex: 10,
});

const ImageOverlay = () => {
  return (
    <DisplayImageContainer>
      <Box sx={{ height: '6rem', width: '6rem', overflow: 'hidden', borderRadius: '9999px', position: 'relative' }}>
        <Image priority src={genericPic} layout="fill" objectFit="cover"></Image>
      </Box>
    </DisplayImageContainer>
  );
};

export default ImageOverlay;
