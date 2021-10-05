import React, { useEffect, useRef } from "react";
import {
  GiPreviousButton,
  GiNextButton,
  GiPlayButton,
  GiPauseButton,
} from "react-icons/gi";
import { RiRepeatFill, RiShuffleFill } from "react-icons/ri";
import { pauseTrack, resumeTrack } from "../../../lib/api";
import PlayNextSong from "./PlayNextSong";

const TrackControls = (props) => {
  const queueIndex = props.queueIndex;
  const setQueueIndex = props.setQueueIndex;
  const shuffleActive = props.shuffleActive;
  const setShuffleActive = props.setShuffleActive;
  const repeat = props.repeat;
  const setRepeat = props.setRepeat;
  const pause = props.pause;
  const setPause = props.setPause;
  const playState = props.playState;
  const setPlayState = props.setPlayState;
  const playbarArtistData = props.playbarArtistData;
  const timeoutIndex = props.timeoutIndex;
  const setTimeoutIndex = props.setTimeoutIndex;
  const setTotalDurationMs = props.setTotalDurationMs;
  const accessToken = props.accessToken;
  const indexZeroCheck = props.indexZeroCheck;
  const setIndexZeroCheck = props.setIndexZeroCheck;
  const shuffleDelay = props.shuffleDelay;
  let shuffleListExecuted = useRef(false);
  let shuffleTimeout = useRef();
  const skipTrack = () => {
    setQueueIndex((queueIndex) => queueIndex + 1);
    clearTimeout(timeoutIndex);
    if (queueIndex >= playbarArtistData.length - 1) {
      pauseSong();
      setPlayState(false);
      setQueueIndex(0);
    }
  };
  const previousTrack = () => {
    if (queueIndex >= 1) {
      setQueueIndex((queueIndex) => queueIndex - 1);
      clearTimeout(timeoutIndex);
    }
    if (queueIndex < 1) {
      PlayNextSong(
        playbarArtistData,
        queueIndex,
        setTotalDurationMs,
        accessToken,
        repeat,
        setTimeoutIndex,
        setQueueIndex,
        setPlayState
      );
      clearTimeout(timeoutIndex);
      setIndexZeroCheck(!indexZeroCheck);
    }
  };
  const pauseSong = () => {
    setPause(true);
    clearTimeout(timeoutIndex);
    pauseTrack(accessToken);
  };

  const playSong = () => {
    setPause(false);
    clearTimeout(timeoutIndex);
    resumeTrack(accessToken);
  };

  const shuffleList = () => {
    console.log(shuffleDelay, "SHUFFLEDELAY");
    shuffleTimeout.current = setTimeout(() => {
      shuffleListExecuted.current = true;
      playbarArtistData.sort(() => Math.random() - 0.5);
    }, shuffleDelay);
  };

  useEffect(() => {
    if (shuffleListExecuted.current === false && playState && shuffleActive) {
      playbarArtistData.sort(() => Math.random() - 0.5);
      clearTimeout(shuffleTimeout.current);
    }
  }, [queueIndex, playbarArtistData, playState]);
  return (
    <div className="playbar-play-icons">
      <button
        className="shuffle-button"
        onClick={() => {
          setShuffleActive(!shuffleActive);
          shuffleList();
        }}
      >
        {!shuffleActive ? (
          <RiShuffleFill
            className="shuffle-button-icon"
            style={{ fill: "white" }}
          />
        ) : (
          <RiShuffleFill
            className="shuffle-button-icon"
            style={{ fill: "green" }}
          />
        )}
      </button>
      <button
        className="previous-button"
        onClick={() => {
          previousTrack();
        }}
      >
        <GiPreviousButton
          className="previous-button-icon"
          style={{ fill: "white" }}
        />
      </button>
      <button className="pause-play-button">
        {playState && !pause ? (
          <GiPauseButton
            className="track-pause-button"
            onClick={() => {
              pauseSong();
            }}
            style={{ fill: "white" }}
          />
        ) : (
          <GiPlayButton
            className="track-play-button"
            onClick={() => {
              playSong();
            }}
            style={{ fill: "white" }}
          />
        )}
      </button>
      <button
        className="next-button"
        onClick={() => {
          skipTrack();
        }}
      >
        <GiNextButton className="next-button-icon" style={{ fill: "white" }} />
      </button>
      <button className="repeat-button" onClick={() => setRepeat(!repeat)}>
        {!repeat ? (
          <RiRepeatFill
            className="repeat-button-icon"
            style={{ fill: "white" }}
          />
        ) : (
          <RiRepeatFill
            className="repeat-button-icon"
            style={{ fill: "green" }}
          />
        )}
      </button>
    </div>
  );
};

export default TrackControls;
