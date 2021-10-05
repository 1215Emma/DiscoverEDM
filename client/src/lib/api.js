import axios from "axios";

export const searchAlbums = (artistIdentifier, accessToken, setArtistData) => {
  axios
    .post("http://localhost:3001/searchAlbums", {
      artistIdentifier,
      accessToken,
    })
    .then((res) => {
      let returnedAlbums = {
        searchedAlbums: res.data.uniqueAlbums,
      };
      setArtistData((oldBannerData) => [...oldBannerData, returnedAlbums]);
    });
};

export const searchArtists = (artistIdentifier, accessToken, setArtistData) => {
  axios
    .post("http://localhost:3001/searchArtists", {
      artistIdentifier,
      accessToken,
    })
    .then((res) => {
      const response = res.data;
      let artistInfo = {
        searchedArtists: res.data,
      };
      setArtistData((oldBannerData) => [...oldBannerData, artistInfo]);
      axios
        .post("http://localhost:3001/searchArtistsTopTracks", {
          response,
          accessToken,
        })
        .then((res) => {
          let returnedTracks = {
            topTracks: res.data.topTracks,
          };
          setArtistData((oldBannerData) => [...oldBannerData, returnedTracks]);
        });
    });
};

export const addToQueue = (accessToken, uri, deviceId) => {
  axios
    .post("http://localhost:3001/addToQueue", {
      accessToken,
      uri,
      deviceId,
    })
    .then((res) => {
      console.log(res, "res");
    });
};

export const playTrack = (accessToken, uri) => {
  axios
    .post("http://localhost:3001/play", {
      accessToken,
      uri,
    })
    .then((results) => {});
};
export const resumeTrack = (accessToken) => {
  axios
    .post("http://localhost:3001/playAfterPause", {
      accessToken,
    })
    .then((results) => {
      console.log(results, "results");
    });
};
export const trackData = (accessToken, trackIds, setPlaybarArtistData) => {
  axios
    .post("http://localhost:3001/track", {
      accessToken,
      trackIds,
    })
    .then((results) => {
      const tracks = results.data.trackData.body.tracks;
      setPlaybarArtistData(tracks);
    });
};

// export const getDevices = (accessToken, setDeviceData) => {
//     axios.post("http://localhost:3001/getMyDevices", {
//             accessToken,
//         }).then(results => {
//             setDeviceData(results.data.deviceList.devices)
//         })
// }

export const currentUser = (accessToken, setUserData) => {
  axios
    .post("http://localhost:3001/user", {
      accessToken,
    })
    .then((res) => {
      setUserData(res.data);
    });
};

export const usersTopArtists = (accessToken, setUsersTopArtists) => {
  axios
    .post("http://localhost:3001/topArtists", {
      accessToken,
    })
    .then((res) => {
      setUsersTopArtists(res.data.topArtists);
    });
};

export const usersPlaylists = (accessToken, setPlaylists) => {
  axios
    .post("http://localhost:3001/usersPlaylists", {
      accessToken,
    })
    .then((res) => {
      setPlaylists(res.data.playlists);
    });
};

export const pauseTrack = (accessToken) => {
  axios
    .post("http://localhost:3001/pause", {
      accessToken,
    })
    .then((results) => {
      console.log(results);
    });
};

export const previousTrack = (accessToken) => {
  axios
    .post("http://localhost:3001/prevTrack", {
      accessToken,
    })
    .then((results) => {
      console.log(results);
    });
};

export const skipTrack = (accessToken) => {
  axios
    .post("http://localhost:3001/skipTrack", {
      accessToken,
    })
    .then((results) => {
      console.log(results);
    });
};

export const changeVolume = (accessToken, volume) => {
  axios
    .post("http://localhost:3001/volume", {
      accessToken,
      volume,
    })
    .then((results) => {
      console.log("volume has been set to " + volume);
    });
};

export const changePositionMs = (accessToken, durationMs) => {
  axios
    .post("http://localhost:3001/durationMs", {
      accessToken,
      durationMs,
    })
    .then((results) => {
      console.log("track is playing at " + durationMs);
    });
};

export const currentTrackData = (accessToken, setCurrentTrack) => {
  axios
    .post("http://localhost:3001/currentTrack", {
      accessToken,
    })
    .then((results) => {
      setCurrentTrack(results.data.trackData);
    });
};

export const progressMs = (accessToken, setMilliseconds) => {
  axios
    .post("http://localhost:3001/progressMs", {
      accessToken,
    })
    .then((results) => {
      console.log(results.data.progress_ms);
      setMilliseconds(results.data.progress_ms);
    });
};
export const stateListener = (position_ms, duration_ms, currentTrack) => {
  axios
    .post("http://localhost:3001/player_state_changed", {
      position_ms,
      duration_ms,
      track_window: { currentTrack },
    })
    .then((response) => {
      console.log(response);
    });
};
