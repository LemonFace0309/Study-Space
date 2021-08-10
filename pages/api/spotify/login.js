const { serialize } = require('cookie');
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');

export default async (req, res) => {
  const { method, body } = req;

  if (method !== 'POST') return;

  const { code } = body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    if (data) {
      const jwtData = {
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      };

      const cookie = jwt.sign(jwtData, process.env.JWT_SECRET);
      res.setHeader('Set-Cookie', serialize('spotify_session', cookie, { path: '/' }));
      return res.status(200).json({ data: jwtData });
    } else {
      throw new Error('Failed to receive data from spotify server');
    }
  } catch (err) {
    res.status(400).json({ message: 'Unable to authorize user: ' + err });
  }
};
