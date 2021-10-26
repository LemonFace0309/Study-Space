import Image from 'next/image';
import Typography from '@mui/material/Typography';

import LAYOUT_ENUM from '@/context/spaces/libs/layoutEnum';
import { useSpaceContext } from '@/context/spaces';

const MyVideo = () => {
  const { layout, username, myStream } = useSpaceContext();

  return (
    <div className="relative border">
      <video
        muted
        ref={myStream}
        autoPlay
        className="object-cover"
        style={{ transform: 'scaleX(-1)', height: '18rem', width: '32rem' }}
      />
      {layout == LAYOUT_ENUM.LIST && (
        <div>
          <div className="absolute top-0 left-0 w-full h-full">
            <Image src="/images/avatar/anime.png" alt="login screen picture" layout="fill" objectFit="cover" />
          </div>
        </div>
      )}
      <Typography variant="body1" className="z-10 absolute bottom-0 right-0 w-full text-white p-1">
        {username}
      </Typography>
    </div>
  );
};

export default MyVideo;
