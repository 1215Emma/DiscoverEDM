import React, { useState, useEffect, useMemo } from "react";
import "./Playbar.css";
import { ProgressBar } from "./ProgressBar";
import TrackControls from "./TrackControls";
import PlayNextSong from "./PlayNextSong";
import NowPlayingPreview from "./NowPlayingPreview";
import VolumeControls from "./VolumeControls";
export const PlayBar = ({
  playbarArtistData,
  accessToken,
  playState,
  setPlayState,
  setPlaybarArtistData,
  queueIndex,
  setQueueIndex,
  trackClicked,
}) => {
  // const [deviceData, setDeviceData] = useState([])
  const [pause, setPause] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [totalDurationMs, setTotalDurationMs] = useState(0);
  const [timeoutIndex, setTimeoutIndex] = useState();
  const [indexZeroCheck, setIndexZeroCheck] = useState(false);
  const [shuffleDelay, setShuffleDelay] = useState(0);

  const updateState = function (call_back) {
    setTimeout(function () {
      call_back();
    });
  };

  const isPlaying = useMemo(() => {
    if (playbarArtistData.length !== 0 && playState) {
      clearTimeout(timeoutIndex);
      updateState(function () {
        PlayNextSong(
          playbarArtistData,
          queueIndex,
          setTotalDurationMs,
          accessToken,
          repeat,
          setTimeoutIndex,
          setQueueIndex,
          setPlayState,
          totalDurationMs
        );
      });
    }
  }, [queueIndex, playState, accessToken, playbarArtistData]);

  useEffect(() => {
    console.log("track is starting to play");
  }, [isPlaying]);

  return (
    <div className="playbar">
      <div className="playbar-container">
        <NowPlayingPreview
          playbarArtistData={playbarArtistData}
          queueIndex={queueIndex}
          playState={playState}
          wait={1000}
        />
        <div className="playbar-play-controls">
          <TrackControls
            setQueueIndex={setQueueIndex}
            timeoutIndex={timeoutIndex}
            queueIndex={queueIndex}
            playbarArtistData={playbarArtistData}
            setPlayState={setPlayState}
            playState={playState}
            setPause={setPause}
            setShuffleActive={setShuffleActive}
            shuffleActive={shuffleActive}
            pause={pause}
            setRepeat={setRepeat}
            repeat={repeat}
            accessToken={accessToken}
            setTimeoutIndex={setTimeoutIndex}
            setTotalDurationMs={setTotalDurationMs}
            setIndexZeroCheck={setIndexZeroCheck}
            indexZeroCheck={indexZeroCheck}
            shuffleDelay={shuffleDelay}
          />
          <ProgressBar
            totalDurationMs={totalDurationMs}
            queueIndex={queueIndex}
            accessToken={accessToken}
            setQueueIndex={setQueueIndex}
            indexZeroCheck={indexZeroCheck}
            pause={pause}
            setShuffleDelay={setShuffleDelay}
            shuffleActive={shuffleActive}
          />
        </div>
        <VolumeControls accessToken={accessToken} />
      </div>
    </div>
  );
};
