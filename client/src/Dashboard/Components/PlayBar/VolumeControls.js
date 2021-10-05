import React, { useState, useEffect } from "react";
import {
  RiVolumeMuteFill,
  RiVolumeDownFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import { changeVolume } from "../../../lib/api";
const VolumeControls = ({ accessToken }) => {
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    changeVolume(accessToken, volume);
  }, [volume, accessToken]);

  return (
    <div className="playbar-volume-container">
      {volume >= 40 ? (
        <RiVolumeUpFill className="volume-button" style={{ fill: "white" }} />
      ) : volume === 0 ? (
        <RiVolumeMuteFill className="volume-button" style={{ fill: "white" }} />
      ) : (
        <RiVolumeDownFill className="volume-button" style={{ fill: "white" }} />
      )}
      <div className="volume-bar">
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          step={5}
          onChange={(event) => {
            setVolume(event.target.valueAsNumber);
          }}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default VolumeControls;
