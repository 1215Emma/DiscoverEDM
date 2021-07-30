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
  const search = req.body.e
  const accessToken = req.body.accessToken
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
      console.log("probably no search query")
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
            console.log(data)
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

app.post("/searchAlbums", (req, res) => {

  const search = req.body.e
  const accessToken = req.body.accessToken
  spotifyApi.setAccessToken(accessToken)
  const getAlbums = spotifyApi.searchAlbums(search, { limit: 50 }).then(res => {
        return res.body.albums.items.map(album => {
            const largestAlbumImage = album.images.reduce((largest, image) => {
            if (image.height > largest.height) return image
            return largest
            }, album.images[0]);
            const albumName = album.name.toLowerCase()
            const albumArtist = album.artists[0].name.toLowerCase()
            const totalTracks = album.total_tracks
            if (
            (album.album_type === "album" || (totalTracks > 3))
            && !albumName.includes("deluxe") 
            && !albumName.includes("live") 
            && !albumName.includes("remix") 
            && !albumName.includes("version") 
            && !albumName.includes("medley") 
            && !albumName.includes("radio") 
            && !albumName.includes("tour") 
            && !albumName.includes("playlist") 
            && !albumName.includes("feat")  
            && !albumName.includes("edition") 
            && !albumName.includes("ukuleke") 
            && !albumName.includes("quartet") 
            && !albumName.includes("renditions") 
            && !albumName.includes("edited") 
            && !albumName.includes("piano") 
            && !albumName.includes("performs") 
            && albumArtist === search.toLowerCase()) {
                return {
                    id: album.id,
                    albumUrl: largestAlbumImage.url,
                    album: album.name,
                    totalTracks: album.total_tracks
                }
            }
            else {
                return null
            }
        }).filter(item => item != null) 
    })
    return getAlbums.then(results => {  
        const newArr = [];
        for (let i = 0; i < results.length; i++) {
            if (results[i].albumUrl) {
                newArr.push(results[i].id)
            }
        }
        
        return spotifyApi.getAlbums(newArr).then(results => {
            const albums = results.body.albums
            const uniqueAlbums = [...albums.reduce((map, obj) => map.set(obj.name, obj),new Map()).values()];
            const searchedAlbums = uniqueAlbums.map(album => {
                const largestAlbumImage = album.images.reduce((largest, image) => {
                if (image.height > largest.height) return image
                return largest
                }, album.images[0]);
                return {
                    id: album.id,
                    albumUrl: largestAlbumImage.url,
                    album: album.name,
                    artist: album.artists[0].name,
                    tracks: album.tracks.items,
                    artistId: album.artists[0].id
                }
            }).filter(item => item != null) 
            res.json({
              searchedAlbums
            })
        })  
    })  
})

app.post("/topArtists", (req, res) => {
  const accessToken = req.body.accessToken
  spotifyApi.setAccessToken(accessToken)
  
      const topArtistsSearch = spotifyApi.getMyTopArtists()
        .then(results => {
            return {
            topArtists: results.body.items
            }
        }).catch(err => {
            console.log(err)
            console.log("testestst")
        })
    
      return topArtistsSearch.then(results => {
        const topArtists = results.topArtists.map(results => {
            return {
            name: results.name,
            id: results.id,
            genres: results.genres,
            href: results.href,  
            image: results.images[2],
            image2: results.images[1]
            }
        })
        res.json({
          topArtists
        })
    })
    
})

app.post("/user", (req, res) => {
  const accessToken = req.body.accessToken
  spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMe()
        .then(results => {
            const splitName = results.body.display_name.split(" ")
            res.json({
              firstName: splitName[0],
              lastName: splitName[1],
              name: results.body.display_name,
              email: results.body.email,
              profilePicture: results.body.images[0].url
            })        
        })  
})

app.post("/addToQueue", (req, res) => {
  const accessToken = req.body.accessToken
  spotifyApi.setAccessToken(accessToken)
  spotifyApi.addToQueue("spotify:track:3LxG9HkMMFP0MZuiw3O2rF", "80cf93bfd578ba9e35ce4b4fadf4606c88e4a3ed" ).then(results => {
    console.log(results)
  })
})
app.listen(3001)