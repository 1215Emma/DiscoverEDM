const SpotifyWebApi = require('./node_modules/spotify-web-api-node');
const express = require('./node_modules/express');
const cors = require("cors");

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:3000/callback/',
  clientId: "c0024b0181434c5c848e7f5bf8a7afe0",
  clientSecret: "58a04698e6f64fd787c8cbcf08e40824"
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  
});

app.post('/callback/', (req, res) => {
  const code = req.body.code
  const credentials = req.body.credentials
  
  console.log(code)
  if (code && !credentials) {
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {     
          res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
          })
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        // res.send(`Error getting Tokens: ${error}`);
      });
    }
  else {
    console.log("you got a token")
  }
})

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  console.log(refreshToken)
  
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/callback/',
    clientId: 'c0024b0181434c5c848e7f5bf8a7afe0',
    clientSecret: '58a04698e6f64fd787c8cbcf08e40824', // was 28f481b9573e43ab81b6a7d6ef2b8547
    
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      console.log(res.data)
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/searchArtists", (req, res) => {
  const search = req.body.search
  accessToken = req.body.accessToken
  spotifyApi.setAccessToken(accessToken)
  spotifyApi.searchArtists(search).then(data => {
    res.json({
        artist: data.body.artists.items[0].name,
        artistImage: data.body.artists.items[0].images[1],
        artistId: data.body.artists.items[0].id,
        genres: data.body.artists.items[0].genres
      })
    }) 
    .catch(err => {
      console.log(err)
      console.log("is this error")
    })
})

app.post("/searchArtistsTopTracks", (req, res) => {
    const response = req.body.response.artistId
    const accessToken = req.body.accessToken
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.getArtistTopTracks(response, "US").then(results => {
        let count = 0;
        const topTracks = results.body.tracks.map(data => {
            count++
            return {
              song: data.name,
              songDuration: data.duration_ms,
              AlbumName: data.album.name,
              AlbumImageSmall: data.album.images[2],
              AlbumImageMedium: data.album.images[1],
              countLabel: count,
              ArtistsInSong: data.artists.map(songArtists => {
                  return {
                    songArtists: songArtists.name,
                      songArtistsId: songArtists.id,
                  }                 
              }),    
            }
        })
        res.json({
          topTracks
        })
    })
    .catch(err => {
            console.log(err)
          })
})      



app.listen(3001)