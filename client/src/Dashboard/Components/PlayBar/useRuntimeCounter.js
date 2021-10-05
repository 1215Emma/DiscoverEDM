import { useState, useEffect, useRef } from "react";
import { progressMs } from "../../../lib/api";
export const useRuntimeCounter = ({
  totalDurationMs,
  queueIndex,
  setQueueIndex,
  indexZeroCheck,
  pause,
  accessToken,
}) => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [change, setChange] = useState(false);
  let interval = useRef();

  const changeProgress = (ms) => {
    clearInterval(interval.current);
    setMilliseconds(ms);
  };

  const progressUpdating = (boolean) => {
    if (boolean === true) {
      setChange(boolean);
      clearInterval(interval.current);
      return boolean;
    } else {
      setChange(boolean);
    }
  };

  useEffect(() => {
    if (pause) {
      clearInterval(interval.current);
      progressMs(accessToken, setMilliseconds);
    }
  }, [pause, accessToken]);

  useEffect(() => {
    setMilliseconds(0);
    clearInterval(interval.current);
  }, [queueIndex, indexZeroCheck]);

  useEffect(() => {
    if (totalDurationMs > 0 && !change && !pause) {
      clearInterval(interval.current);
      const StartTimer = () => {
        let remainderRuntime = totalDurationMs - milliseconds;
        interval.current = setInterval(() => {
          remainderRuntime -= 1000;
          if (remainderRuntime > 0) {
            setMilliseconds((seconds) => seconds + 1000);
          } else {
            clearInterval(interval.current);
            setQueueIndex((queueIndex) => queueIndex + 1);
          }
        }, 1000);
      };
      StartTimer();
    }
  }, [totalDurationMs, change, setQueueIndex, indexZeroCheck, pause]);
  return { milliseconds, changeProgress, progressUpdating };
};
