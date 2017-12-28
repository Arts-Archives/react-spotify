let prod = true;

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = prod ? "https://spot-react-ify.herokuapp.com/" : "http://localhost:8080/";

export const clientID = "28c0d2a90c924223a48b18dc0801c512";
export const clientSecret = "28af750c1a7446168a886c1e9f9af7e0";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";
