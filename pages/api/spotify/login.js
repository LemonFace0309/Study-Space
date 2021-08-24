const { serialize } = require('cookie');
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');

/**
 * Get request handles spotify authentication, called from spotify, and redirects to user's current room
 * Post request handles spotify authentication when called manually (not from spotify)
 */
export default async (req, res) => {
  const { method, body, query, cookies } = req;

  let code;
  let redirectURL;
  if (method === 'GET') {
    code = query.code;
    redirectURL = cookies.productify_roomID;
    if (!redirectURL) {
      res.redirect('/room');
    }
  } else if (method === 'POST') {
    code = body.code;
  } else {
    res.status(405).json({ error: `Method '${method}' Not Allowed` });
  }

  if (!code) {
    res.status(422).json({ error: 'Access code not provided' });
  }

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
      if (redirectURL) {
        return res.redirect(`/room/${redirectURL}?data=${JSON.stringify(jwtData)}`);
      }
      return res.status(200).json({ data: jwtData });
    } else {
      throw new Error('Failed to receive data from spotify server');
    }
  } catch (err) {
    res.status(400).json({ message: 'Unable to authorize user: ' + err });
  }
};
