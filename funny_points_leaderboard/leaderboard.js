// Convert string in ISO8601 format to date object
// e.g. 2013-02-08T02:40:00Z
//
function isoToObj(s) {
  var b = s.split(/[-TZ:]/i);

  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
}

// Utility to add leading zero
function z(n) {
  return (n < 10 ? "0" : "") + n;
}

function timeToGo(s) {
  // Convert string to date object
  var d = isoToObj(s);
  var diff = d - new Date();

  // Allow for previous times
  var sign = diff < 0 ? "-" : "";
  diff = Math.abs(diff);

  // Get time components
  var days = (diff / 8.64e7) | 0;
  var hours = ((diff % 8.64e7) / 3.6e6) | 0;
  var mins = ((diff % 3.6e6) / 6e4) | 0;
  var secs = Math.floor((diff % 6e4) / 1e3);

  // Return formatted string
  return (
    sign + z(days) + "d " + z(hours) + "h " + z(mins) + "m " + z(secs) + "s"
  );
}

function formatAllLogsTimeToDate() {
  let logs = document.getElementById("logs-main");
  for (div of logs.children) {
    if (div.tagName === "DIV") {
      let time = isoToObj(div.id.split("_")[1]);
      let diff = -time.getTimezoneOffset() / 60;
      let sign = diff < 0 ? "-" : "+";
      div.children["timestamp"].textContent =
        time.toDateString() +
        " at " +
        z(time.getHours()) +
        ":" +
        z(time.getMinutes()) +
        ":" +
        z(time.getSeconds()) +
        " UTC" +
        sign +
        diff;
    }
  }
}

function formatAllLogsWithPointsAndUsername() {
  let logs = document.getElementById("logs-main");
  for (div of logs.children) {
    if (div.tagName === "DIV") {
      let user = div.id.split("_")[0];
      let diff = div.id.split("_")[2];
      let amount = div.id.split("_")[3];
      let sign = diff === "add" ? "+" : "-";
      let color_class = diff === "add" ? "added" : "removed";
      div.children[
        "point_modify"
      ].innerHTML = `<strong class="${color_class}">${sign}${amount}</strong> to <strong>${user}</strong>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let time = document.getElementById("time");
  time.textContent = `in ${timeToGo("2026-11-23T19:00:00Z")}`;

  formatAllLogsTimeToDate();
  formatAllLogsWithPointsAndUsername();

  //console.log(document.getElementById("point_modify_time").innerHTML);
  //document.getElementById("point_modify_time").innerHTML =
  //  "<strong>this is a test</strong>";

  setInterval(() => {
    time.textContent = `in ${timeToGo("2026-11-23T19:00:00Z")}`;
  }, 1000);
});
