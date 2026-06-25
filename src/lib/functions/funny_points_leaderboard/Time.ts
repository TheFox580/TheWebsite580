import { MongoCursorInUseError } from "mongodb";

export function z(n: number): string {
  return (n < 10 ? "0" : "") + n;
}

export function timeToGo(date: Date): string {
  // Convert string to date object
  var diff = date.getTime() - new Date().getTime();

  // Allow for previous times
  var sign = diff < 0 ? "-" : "";
  if (diff < 0) {
    return "Resets soon";
  }
  diff = Math.abs(diff);

  // Get time components
  var days = (diff / 8.64e7) | 0;
  var hours = ((diff % 8.64e7) / 3.6e6) | 0;
  var mins = ((diff % 3.6e6) / 6e4) | 0;
  var secs = Math.floor((diff % 6e4) / 1e3);

  // Return formatted string
  return `Ends in ${days > 0 ? z(days) + ":" : ""}${days + hours > 0 ? z(hours) + ":" : ""}${z(mins)}:${z(secs)}`;
}
