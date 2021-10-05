import React, { useState, useEffect } from "react";
import "./MusicContainer.css";
import { GrPlay } from "react-icons/gr";
import { searchAlbums, searchArtists, trackData } from "../../../lib/api";

// The music container. Parent function
export const MusicContainer = ({
  artistIdentifier,
  setPlaybarArtistData,
  accessToken,
  setPlayState,
  setQueueIndex,
  playState,
  trackClicked,
  setTrackClicked,
  setShowHome,
}) => {
  const [artistData, setArtistData] = useState([]);
  const [albumClicked, setAlbumClicked] = useState(false);
  const [albumClickedData, setAlbumClickedData] = useState([]);

  useEffect(() => {
    if (artistIdentifier) {
      console.log("uwu");
      setArtistData([]);
      setAlbumClickedData([]);
      setAlbumClicked(false);
      setShowHome(false);
      setTimeout(() => {
        searchAlbums(artistIdentifier, accessToken, setArtistData);
        searchArtists(artistIdentifier, accessToken, setArtistData);
      }, 250);
    }
  }, [artistIdentifier, accessToken, setShowHome]);

  useEffect(() => {
    if (artistData.length > 2) {
      const convertMetadata = () => {
        const trackIds = [];
        // the user has NEVER clicked an album
        if (!albumClicked && !playState && !trackClicked) {
          const artistTopTracks = artistData.find((trackInfo) => {
            return trackInfo.topTracks;
          });
          artistTopTracks.topTracks.map((topTracks) => {
            return trackIds.push(topTracks.id);
          });
          trackData(accessToken, trackIds, setPlaybarArtistData);
          setTrackClicked(false);
        }
        // the user has clicked an album which you can only get to from clicking an artist
        if (albumClickedData && albumClicked && playState && trackClicked) {
          const trackIds = [];
          albumClickedData.tracks.items.map((albumTracks) => {
            return trackIds.push(albumTracks.id);
          });
          trackData(accessToken, trackIds, setPlaybarArtistData);
          setTrackClicked(false);
        }
        if (!albumClicked && playState && trackClicked) {
          const artistTopTracks = artistData.find((trackInfo) => {
            return trackInfo.topTracks;
          });
          artistTopTracks.topTracks.map((topTracks) => {
            return trackIds.push(topTracks.id);
          });
          trackData(accessToken, trackIds, setPlaybarArtistData);
          setTrackClicked(false);
        }
      };
      convertMetadata();
    }
  }, [
    artistData,
    albumClicked,
    trackClicked,
    accessToken,
    playState,
    albumClickedData,
    setPlaybarArtistData,
    setTrackClicked,
  ]);

  return (
    <div className="music-container">
      <MusicContainerHeader
        artistData={artistData}
        albumClicked={albumClicked}
        albumClickedData={albumClickedData}
      />
      <div className="music-track-album-container">

      <div className="music-container-tracks">
        <MusicContainerTracks
          artistData={artistData}
          albumClicked={albumClicked}
          albumClickedData={albumClickedData}
          setPlaybarArtistData={setPlaybarArtistData}
          accessToken={accessToken}
          setPlayState={setPlayState}
          setQueueIndex={setQueueIndex}
          setTrackClicked={setTrackClicked}
          />
      </div>
      <div className="music-container-albums">
        <MusicContainerAlbums
          artistData={artistData}
          setAlbumClicked={setAlbumClicked}
          setAlbumClickedData={setAlbumClickedData}
          albumClicked={albumClicked}
          setTrackClicked={setTrackClicked}
          />
      </div>
      </div>
    </div>
  );
};

// Displays the header with image and name of the music container. Child 1
export const MusicContainerHeader = ({
  artistData,
  albumClicked,
  albumClickedData,
}) => {
  const artistDataInfo = artistData.find((artistInfo) => {
    return artistInfo.searchedArtists;
  });
  return (
    <>
      {artistDataInfo === undefined ? (
        <></>
      ) : albumClickedData && albumClicked ? (
        <div className="music-container-header-album">
          <div className="music-header-album">
            <img
              src={albumClickedData.images[0].url}
              alt=""
              className="music-image-album"
            />
            <div className="music-name">{albumClickedData.name}</div>
          </div>
        </div>
      ) : (
        <div className="music-container-header">
          <div className="music-header">
            <img
              src={artistDataInfo.searchedArtists.artistImage.url}
              alt=""
              className="music-image"
            />
            <div className="music-name">
              {artistDataInfo.searchedArtists.artist}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Displays the albums component of the music container. Child 2
export const MusicContainerAlbums = ({
  artistData,
  setAlbumClicked,
  setAlbumClickedData,
  setTrackClicked,
}) => {
  const artistAlbums = artistData.find((albums) => {
    return albums.searchedAlbums;
  });

  return (
    <>
      <h1>Albums</h1>
      {artistAlbums === undefined ? (
        <></>
      ) : (
        <div className="music-container-albums-main">
            {artistAlbums.searchedAlbums.map((albums) => {
            let shortenedName = albums.name
            if (albums.name.length > 15) {
              shortenedName = albums.name.slice(0, 15) + "...";
            }
            return (
              <button
                onClick={(e) => {
                  setAlbumClicked(true);
                  setAlbumClickedData(albums);
                  setTrackClicked(false);
                }}
                className="music-container-albums-button"
                key={albums.id}
              >
                <div className="music-albums-individual-container">
                  <img
                    src={albums.images[1].url}
                    alt=""
                    className="music-album-cover"
                  />
                  <div className="music-album-name">{shortenedName}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

// Displays tracks component of the music container. Child 3
export const MusicContainerTracks = ({
  artistData,
  albumClicked,
  albumClickedData,
  setPlayState,
  setQueueIndex,
  setTrackClicked,
}) => {
  const artistTopTracks = artistData.find((trackInfo) => {
    return trackInfo.topTracks;
  });
  const SongDuration = (x) => {
    const minutes = Math.floor(x / 60000);
    const seconds = ((x % 60000) / 1000).toFixed(0);
    const songDur = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return songDur;
  };

  return (
    <>
    <h1>Popular</h1>
    <div className="music-tracks-container-main">
      {artistTopTracks === undefined ? (
        <></>
      ) : albumClickedData && albumClicked ? (
        albumClickedData.tracks.items.map((track, index) => {
          const songDuration = SongDuration(track.duration_ms);
          let trackTitle = track.name;
          if (trackTitle.length > 50) {
            trackTitle = trackTitle.slice(0, 50) + "...";
          }
          return (
            <button
              className="music-track-buttons-container"
              onClick={() => {
                setPlayState(true);
                setQueueIndex(index);
                setTrackClicked(true);
              }}
              key={track.id}
            >
              <div className="music-track-info-container">
                <div className="music-track-hover-display">
                  <GrPlay className="music-track-play-button" />
                  <div className="music-track-count">{index + 1}</div>
                </div>
                <div className="music-track-name">{trackTitle}</div>
                <div className="music-track-runtime">{songDuration}</div>
              </div>
            </button>
          );
        })
      ) : (
        artistTopTracks.topTracks.map((track, index) => {
          const songDuration = SongDuration(track.duration_ms);
          let trackTitle = track.name;
          if (trackTitle.length > 50) {
            trackTitle = trackTitle.slice(0, 50) + "...";
          }
          return (
            <button
              className="music-track-buttons-container"
              onClick={() => {
                setPlayState(true);
                setQueueIndex(index);
                setTrackClicked(true);
              }}
              key={track.id}
            >
              <div className="music-track-info-container">
                <div className="music-track-hover-display">
                  <GrPlay className="music-track-play-button" />
                  <div className="music-track-count">{index + 1}</div>
                </div>
                <img
                  src={track.album.images[2].url}
                  alt=""
                  className="banner-track-album-image"
                />
                <div className="music-track-name">{trackTitle}</div>
                <div className="music-track-runtime">{songDuration}</div>
              </div>
            </button>
          );
        })
      )}
      </div>
      </>
  );
};
