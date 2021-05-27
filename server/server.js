const express = require("express")
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'c0024b0181434c5c848e7f5bf8a7afe0',
        clientSecret: '28f481b9573e43ab81b6a7d6ef2b8547',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
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

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'c0024b0181434c5c848e7f5bf8a7afe0',
    clientSecret: '28f481b9573e43ab81b6a7d6ef2b8547'
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
      res.status(200).send(message.sid)
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.listen(3001)

