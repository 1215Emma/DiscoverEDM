require('dotenv').config()
const SpotifyWebApi = require("./node_modules/spotify-web-api-node");
const express = require("./node_modules/express");
const cors = require("cors");


const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000/callback/",
  clientId: process.env.SERVER_CLIENT_ID,
  clientSecret: process.env.SERVER_CLIENT_SECRET,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.post("/callback/", (req, res) => {
  const code = req.body.code;
  const credentials = req.body.credentials;

  console.log(code);
  if (code && !credentials) {
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((error) => {
        console.error("Error getting Tokens:", error);
      });
  } else {
    console.log("you got a token");
  }
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken, "REFRESHTOKEN");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/callback/",
    clientId: process.env.SERVER_CLIENT_ID,
    clientSecret: process.env.SERVER_CLIENT_SECRET,
    refreshToken
  });
  spotifyApi.refreshAccessToken()
    .then((data) => {
      console.log(res.data);
      spotifyApi.setAccessToken(data.body["access_token"]);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/searchArtists", (req, res) => {
  const search = req.body.artistIdentifier;
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .searchArtists(search)
    .then((data) => {
      res.json({
        searchedArtistsKey: "searchedArtistsKey",
        artist: data.body.artists.items[0].name,
        artistImage: data.body.artists.items[0].images[1],
        artistId: data.body.artists.items[0].id,
        genres: data.body.artists.items[0].genres,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("probably no search query");
    });
});

app.post("/searchArtistsTopTracks", (req, res) => {
  const response = req.body.response.artistId;
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getArtistTopTracks(response, "US")
    .then((results) => {
      console.log(results.body.tracks);
      // let count = 0;
      // const topTracks = results.body.tracks.map(data => {
      //     count++
      //     return {
      //       id: data.id,
      //       name: data.name,
      //       duration_ms: data.duration_ms,
      //       albumName: data.album.name,
      //       albumImageSmall: data.album.images[2],
      //       albumImageMedium: data.album.images[1],
      //       track_number: count,
      //       uri: data.uri,
      //       artistsInSong: data.artists.map(songArtists => {
      //           return {
      //             name: songArtists.name,
      //               id: songArtists.id,
      //           }
      //       }),
      //     }
      // })
      res.json({
        topTracks: results.body.tracks,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/searchAlbums", (req, res) => {
  const search = req.body.artistIdentifier;
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  const getAlbums = spotifyApi
    .searchAlbums(search, { limit: 50 })
    .then((res) => {
      return res.body.albums.items
        .map((album) => {
          const largestAlbumImage = album.images.reduce((largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          }, album.images[0]);
          const albumName = album.name.toLowerCase();
          const albumArtist = album.artists[0].name.toLowerCase();
          const totalTracks = album.total_tracks;
          if (
            (album.album_type === "album" || totalTracks > 3) &&
            !albumName.includes("deluxe") &&
            !albumName.includes("live") &&
            !albumName.includes("remix") &&
            !albumName.includes("version") &&
            !albumName.includes("medley") &&
            !albumName.includes("radio") &&
            !albumName.includes("tour") &&
            !albumName.includes("playlist") &&
            !albumName.includes("feat") &&
            !albumName.includes("edition") &&
            !albumName.includes("ukuleke") &&
            !albumName.includes("quartet") &&
            !albumName.includes("renditions") &&
            !albumName.includes("edited") &&
            !albumName.includes("piano") &&
            !albumName.includes("performs") &&
            albumArtist === search.toLowerCase()
          ) {
            return {
              id: album.id,
              albumUrl: largestAlbumImage.url,
              album: album.name,
              totalTracks: album.total_tracks,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item != null);
    });
  return getAlbums
    .then((results) => {
      const newArr = [];
      for (let i = 0; i < results.length; i++) {
        if (results[i].albumUrl) {
          newArr.push(results[i].id);
        }
      }

      return spotifyApi.getAlbums(newArr).then((results) => {
        const albums = results.body.albums;
        const uniqueAlbums = [
          ...albums
            .reduce((map, obj) => map.set(obj.name, obj), new Map())
            .values(),
        ];
        // const searchedAlbums = uniqueAlbums.map(album => {
        //     const largestAlbumImage = album.images.reduce((largest, image) => {
        //     if (image.height > largest.height) return image
        //     return largest
        //     }, album.images[0]);
        //     return {
        //         id: album.id,
        //         albumUrl: largestAlbumImage.url,
        //         album: album.name,
        //         artist: album.artists[0].name,
        //         tracks: album.tracks.items,
        //         artistId: album.artists[0].id
        //     }
        // }).filter(item => item != null)
        res.json({
          uniqueAlbums: uniqueAlbums,
        });
      });
    })
    .catch((err) => {
      console.log("couldn't get albums");
    });
});

app.post("/topArtists", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  const topArtistsSearch = spotifyApi
    .getMyTopArtists()
    .then((results) => {
      return {
        topArtists: results.body.items,
      };
    })
    .catch((err) => {
      console.log(err);
      console.log("testestst");
    });

  topArtistsSearch
    .then((results) => {
      const topArtists = results.topArtists.map((results) => {
        return {
          name: results.name,
          id: results.id,
          genres: results.genres,
          href: results.href,
          image: results.images[2],
          image2: results.images[1],
        };
      });
      res.json({
        topArtists,
      });
    })
    .catch((err) => {
      console.log("couldn't get top artists");
    });
});

app.post("/track", (req, res) => {
  const accessToken = req.body.accessToken;
  const trackIds = req.body.trackIds;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getTracks(trackIds)
    .then((track) => {
      res.json({
        trackData: track,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("this is a get track error");
    });
});
app.post("/user", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getMe()
    .then((results) => {
      const splitName = results.body.display_name.split(" ");
      res.json({
        firstName: splitName[0],
        lastName: splitName[1],
        name: results.body.display_name,
        email: results.body.email,
        profilePicture: results.body.images[0].url,
      });
    })
    .catch((err) => {
      console.log("couldn't get user");
    });
});

app.post("/getMyDevices", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getMyDevices()
    .then((results) => {
      res.json({
        deviceList: results.body,
      });
    })
    .catch((err) => {
      console.log("Couldn't find device");
    });
});

app.post("/addToQueue", (req, res) => {
  const accessToken = req.body.accessToken;
  const uri = req.body.uri;
  const deviceId = req.body.deviceId;
  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .addToQueue(uri, { device_id: deviceId })
    .then((response) => {
      res.send(response);
    })

    .catch((err) => {
      console.log(err, "addToQueue");
    });
});

app.post("/play", (req, res) => {
  const accessToken = req.body.accessToken;
  const uri = req.body.uri;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .play({ uris: [uri] })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
      console.log("play catch 2");
    });
});

app.post("/playAfterPause", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.play().then((results) => {
    res.send(results);
  });
});

app.post("/pause", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .pause()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log("track didnt pause");
    });
});
app.post("/currentTrack", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    console.log(data);
    const trackData = {
      progress_ms: data.body.progress_ms,
      duration_ms: data.body.item.duration_ms,
      is_playing: data.body.is_playing,
      name: data.body.item.name,
      album_url: data.body.item.album.images[1],
      artists: data.body.item.artists.map((artists) => {
        return {
          name: artists.name,
          uri: artists.uri,
        };
      }),
    };
    res.json({
      trackData,
    });
  });
});

app.post("/progressMs", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    res.json({
      progress_ms: data.body.progress_ms,
    });
  });
});

app.post("/usersPlaylists", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getUserPlaylists("125269873")
    .then((results) => {
      res.json({
        playlists: results.body.items,
      });
    })
    .catch((err) => {
      console.log("couldn't get users playlists");
    });
});

app.post("/skipTrack", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .skipToNext()
    .then((results) => {
      res.send(results);
      console.log("skipped");
    })
    .catch((err) => {
      console.log("cannot skip");
    });
});

app.post("/prevTrack", (req, res) => {
  const accessToken = req.body.accessToken;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .skipToPrevious()
    .then((results) => {
      res.send(results);
      console.log("previous track");
    })
    .catch((err) => {
      console.log("cannot go back");
    });
});

app.post("/volume", (req, res) => {
  const accessToken = req.body.accessToken;
  const volume = req.body.volume;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .setVolume(volume)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/durationMs", (req, res) => {
  const accessToken = req.body.accessToken;
  const positionMs = req.body.durationMs;
  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .seek(positionMs)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/player_state_changed", (req, res) => {
  const position = req.body.position_ms;
  const duration = req.body.duration_ms;
  const track_window = req.body.track_window;
  player.addListener(
    "player_state_changed",
    ({ position, duration, track_window }) => {
      console.log("currently playing", track_window);
      console.log("position in song", position);
      console.log("duration of song", duration);
    }
  );
});

app.listen(3001);
