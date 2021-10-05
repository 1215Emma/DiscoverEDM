import { playTrack } from "../../../lib/api";

const PlayNextSong = (
  playbarArtistData,
  queueIndex,
  setTotalDurationMs,
  accessToken,
  repeat,
  setTimeoutIndex,
  setQueueIndex,
  setPlayState
) => {
  if (repeat) {
    const uri = playbarArtistData[queueIndex].uri;
    const songLength = playbarArtistData[queueIndex].duration_ms;
    setTotalDurationMs(songLength);
    playTrack(accessToken, uri);
    const timeoutId = setTimeout(() => {
      PlayNextSong();
    }, songLength);
    setTimeoutIndex(timeoutId);
  } else {
    if (queueIndex >= 0 && queueIndex <= playbarArtistData.length - 1) {
      const uri = playbarArtistData[queueIndex].uri;
      const songLength = playbarArtistData[queueIndex].duration_ms;
      setTotalDurationMs(songLength);
      playTrack(accessToken, uri);
      const timeoutId = setTimeout(() => {
        setQueueIndex((queueIndex) => queueIndex + 1);
      }, songLength);
      setTimeoutIndex(timeoutId);
    }
    if (queueIndex > playbarArtistData.length - 1) {
      console.log("playqueue ended");
      setPlayState(false);
      setQueueIndex(0);
    }
  }
};

export default PlayNextSong;
