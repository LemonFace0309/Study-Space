import { useSpaceContext } from '@/context/spaces';

import ImageOverlay from './ImageOverlay';
import TextOverlay from './TextOverlay';

const MyVideo = () => {
  const { username, myStream, myScreenShare, isMyAudioEnabled, isMyVideoEnabled, statusBubble, isScreenShare } =
    useSpaceContext();

  return (
    <>
      <div className="relative border">
        <video
          muted
          ref={myStream}
          autoPlay
          style={{ objectFit: 'cover', transform: 'scaleX(-1)', height: '18rem', width: '32rem' }}
        />
        {!isMyVideoEnabled && <ImageOverlay />}
        <TextOverlay username={username} isAudioEnabled={isMyAudioEnabled} statusBubble={statusBubble} />
      </div>
      <video
        muted
        ref={myScreenShare}
        autoPlay
        style={{ display: isScreenShare ? 'block' : 'none', objectFit: 'cover', height: '18rem', width: '32rem' }}
      />
    </>
  );
};

export default MyVideo;
