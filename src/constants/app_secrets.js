const clientID = "28c0d2a90c924223a48b18dc0801c512";
const clientSecret = "28af750c1a7446168a886c1e9f9af7e0";
const redirectURI = "https://spot-react-ify.herokuapp.com/";
const scopes =
  "user-read-private+user-read-email+playlist-read-private+user-top-read";
const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";

export {
  spotifyWebApiURL,
  clientID,
  clientSecret,
  redirectURI,
  spotifyProfileURL
};