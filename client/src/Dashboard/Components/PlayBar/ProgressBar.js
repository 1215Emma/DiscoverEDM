import React, { useEffect } from "react";
import { useRuntimeCounter } from "./useRuntimeCounter";
import { changePositionMs } from "../../../lib/api";
import { RuntimeDisplay } from "./RuntimeDisplay";
import { FormatTime } from "./FormatTime";
export const ProgressBar = ({
  totalDurationMs,
  queueIndex,
  accessToken,
  setQueueIndex,
  indexZeroCheck,
  pause,
  setShuffleDelay,
  shuffleActive,
}) => {
  let millisecondsCounter = useRuntimeCounter({
    totalDurationMs,
    queueIndex,
    setQueueIndex,
    indexZeroCheck,
    pause,
    accessToken,
  });
  const durationMs = millisecondsCounter.milliseconds;
  const seekPosition = () => {
    changePositionMs(accessToken, durationMs);
  };
  useEffect(() => {
    setShuffleDelay(totalDurationMs - durationMs);
  }, [shuffleActive, setShuffleDelay, durationMs, totalDurationMs]);
  return (
    <div className="song-length-bar">
      <div className="song-length-time-start">
        <div className="song-length-timer">
          <RuntimeDisplay durationMs={durationMs} queueIndex={queueIndex} />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={totalDurationMs}
        value={durationMs}
        step={1000}
        onChange={(event) => {
          millisecondsCounter.changeProgress(event.target.valueAsNumber);
        }}
        onMouseUp={() => {
          seekPosition(durationMs);
          millisecondsCounter.progressUpdating(false);
        }}
        onMouseDown={() => {
          millisecondsCounter.progressUpdating(true);
        }}
        className="song-length-slider"
      />
      <div className="song-length-time">
        {FormatTime(totalDurationMs / 1000)}
      </div>
    </div>
  );
};
