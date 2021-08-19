import getClosestImageSize from './getClosestImageSize';

const parseTracks = (tracks) => {
  const parsedTracks = tracks.map((track) => {
    const smallestAlbumImage = getClosestImageSize(track.album.images, 64);
    const artists = track.artists.map((artist) => artist.name);

    return {
      artist: artists.join(', '),
      title: track.name,
      uri: track.uri,
      albumUrl: smallestAlbumImage.url,
    };
  });
  return parsedTracks;
};

export default parseTracks;
