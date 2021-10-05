import React, { useState, useEffect } from "react";
import TimeOfDayGreeting from "./TimeOfDayGreeting";
import { currentUser, usersPlaylists } from "../../../lib/api";
import "./Sidebar.css";
import { RiSearchLine } from "react-icons/ri";
export const Sidebar = ({ setArtistIdentifier, accessToken, setTrackClicked, setShowHome }) => {
  const [userData, setUserData] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    currentUser(accessToken, setUserData);
    usersPlaylists(accessToken, setPlaylists);
  }, [accessToken]);
  console.log(search)
  
  return (
    <div className="sidebar-container">
      <div className="user_info">
        <button className="user_button">
          <div className="greeting">
            {TimeOfDayGreeting()} {userData.firstName}
          </div>
          <div className="pfp-container">
            <img
              src={userData.profilePicture}
              alt=""
              className="profile_picture"
            />
          </div>
        </button>
      </div>
      <div className="navigation-bar">
        <form className="SearchBar">
          <input
            placeholder="  Search an artist"
            type="text"
            defaultValue={search}
            onChange={(searchVal) => setSearch(searchVal.target.value)}
          />
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              setArtistIdentifier(search);
              setShowHome(false);
              setTrackClicked(false);
            }}
          >
            <RiSearchLine className="searchicon" />
          </button>
        </form>
      </div>
      <div className="home-redirect">
        <button
          className="home-redirect"
          onClick={() => {
            setShowHome(true);
          }}
        >
          <h1>Home</h1>
        </button>
      </div>
      <>
        <h2 className="sidebar-line-style">______________________</h2>
        <div className="users-playlists-container">
          <h1>Your Playlists</h1>
          {playlists.map((yourPlaylists) => {
            let playlistName = yourPlaylists.name;
            if (playlistName.length > 30) {
              playlistName = playlistName.slice(0, 25) + "...";
            }
            return (
              <button
                type="submit"
                className="users-playlists"
                key={yourPlaylists.id}
              >
                <h1>{playlistName}</h1>
              </button>
            );
          })}
        </div>
      </>
    </div>
  );
};
