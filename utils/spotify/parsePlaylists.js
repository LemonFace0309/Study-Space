import getClosestImageSize from './getClosestImageSize';

const parsePlaylists = (rawPlaylists) => {
  const parsedPlaylists = rawPlaylists.map((playlist) => {
    const bestImage = getClosestImageSize(playlist.images, 300);

    return {
      id: playlist.id,
      title: playlist.name,
      uri: playlist.uri,
      trackURL: playlist.tracks.href,
      image: bestImage.url,
    };
  });
  return parsedPlaylists;
};

export default parsePlaylists;
