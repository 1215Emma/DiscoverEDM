// const express = require("express")
// const cors = require("cors")
// const SpotifyWebApi = require("spotify-web-api-node")

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: 'http://localhost:3000',
//     clientId: 'c0024b0181434c5c848e7f5bf8a7afe0',
//     clientSecret: '28f481b9573e43ab81b6a7d6ef2b8547',
    
//     refreshToken,
//   })

//   spotifyApi
//     .refreshAccessToken()
//     .then(data => {
//       res.json({
//         accessToken: data.body.access_token,
//         expiresIn: data.body.expires_in,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// })

// app.post("/api/token", (req, res) => {
//   const code = (req.body.code)
//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: 'http://localhost:3000',
//     clientId: 'c0024b0181434c5c848e7f5bf8a7afe0',
//     clientSecret: '28f481b9573e43ab81b6a7d6ef2b8547'
//   })
//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then(data => {
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// })


// app.listen()

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


// let count = true
// app.post('/callback/', (req, res) => {
//   const code = req.body.code
//   if (code && count) {
//     count = false
//     spotifyApi
//       .authorizationCodeGrant(code)
//       .then(data => {
//           console.log(data.body)
//           res.json({
//             accessToken: data.body.access_token,
//             refreshToken: data.body.refresh_token,
//             expiresIn: data.body.expires_in,
//           })
//       })
//       .catch(error => {
//         console.error('Error getting Tokens:', error);
//         // res.send(`Error getting Tokens: ${error}`);
//       });
//     }
//   else {
//     console.log("you got a token")
//   }
// })
app.post('/callback/', (req, res) => {
  const code = req.body.code
  const credentials = req.body.credentials
  console.log(credentials)
  if (code && !credentials) {
    console.log("hello")
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
          console.log(data.body)
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

app.listen(3001)

      