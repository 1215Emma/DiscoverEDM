import { FormatTime } from "./FormatTime";

export const RuntimeDisplay = ({ durationMs }) => {
  // durationMs comes in milliseconds, we converted to seconds for the format function to format it correctly
  const seconds = durationMs / 1000;
  const formattedTime = FormatTime(seconds);
  return <>{formattedTime}</>;
};
