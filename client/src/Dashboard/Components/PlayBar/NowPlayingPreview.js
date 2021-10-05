const NowPlayingPreview = (props) => {
  const playbarArtistData = props.playbarArtistData;
  const queueIndex = props.queueIndex;
  const playState = props.playState;

  const artistNames = () => {
    let output = "";
    for (let i = 0; i < playbarArtistData[queueIndex].artists.length; i++) {
      let artistName = playbarArtistData[queueIndex].artists[i].name;
      output += artistName;
      if (i < playbarArtistData[queueIndex].artists.length - 1) {
        output += ", ";
      }
      output += "";
    }
    if (output.length > 40) {
      output = output.slice(0, 40) + "...";
    }
    return output;
  };

  const trackName = () => {
    let trackTitle = playbarArtistData[queueIndex].name;
    if (trackTitle.length > 33) {
      trackTitle = trackTitle.slice(0, 33) + "...";
    }
    return trackTitle;
  };
  return (
    <>
      {playState &&
      playbarArtistData.length > 0 &&
      queueIndex <= playbarArtistData.length - 1 ? (
        <div className="playbar-current-track">
          <img
            className="now-playing-album-cover"
            src={playbarArtistData[queueIndex].album.images[1].url}
            alt="album-artist"
          ></img>

          <div className="now-playing-track">{trackName()}</div>
          <div className="now-playing-artists">{artistNames()}</div>
        </div>
      ) : (
        <div style={{ fill: "white" }} className="playbar-current-track">
          showing nothing
        </div>
      )}
    </>
  );
};

export default NowPlayingPreview;
