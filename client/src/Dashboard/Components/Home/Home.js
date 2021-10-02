import React, { useState, useEffect } from "react";
import { usersPlaylists, usersTopArtists } from "../../../lib/api";
import "./Home.css";
export const Home = ({
  accessToken,
  setArtistIdentifier,
  setTrackClicked,
  setShowHome,
}) => {
  const [topArtists, setUsersTopArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    usersTopArtists(accessToken, setUsersTopArtists);
    usersPlaylists(accessToken, setPlaylists);
  }, [accessToken]);

  const top20Button = (e) => {
    setArtistIdentifier(e);
  };

  return (
    <div className="home-container">
      <div className="users-top-artists-main-container">
        <h1 className="users-favorite-artists-header">Your favorite artists</h1>
        <div className="users-top-artists-container">
          {topArtists.map((artists) => {
            const search = artists.name;
            return (
              <button
                type="submit"
                onClick={(e) => {
                  top20Button(search);
                  setTrackClicked(false);
                  setShowHome(false);
                }}
                className="users-top-artists"
                key={artists.id}
              >
                <img
                  className="fav-artist-image"
                  src={artists.image.url}
                  alt={search}
                />
                <h1>{search}</h1>
              </button>
            );
          })}
        </div>
      </div>
      <div className="users-playlists-home-container">
        <h1 className="users-playlists-header-home">Your Playlists</h1>
        <div className="users-playlists-container-home">
          {playlists.map((usersPlaylists) => {
            return (
              <button
                type="submit"
                className="individual-playlists-container"
                key={usersPlaylists.id}
              >
                <img
                  className="playlist-image"
                  src={usersPlaylists.images[0].url}
                  alt={usersPlaylists.name}
                />
                <h1>{usersPlaylists.name}</h1>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
