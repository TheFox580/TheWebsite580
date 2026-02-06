// Utility to add leading zero
function z(n) {
  return (n < 10 ? "0" : "") + n;
}

function capitalizeFirstLetter(val) {
  return (
    String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase()
  );
}

var mapResultNumber = Object.freeze({
  0: "Lost (By forfeit)",
  1: "Lost",
  2: "Draw",
  3: "Won",
  4: "Won (By forfeit)",
  "Lost (By forfeit)": 0,
  Lost: 1,
  Draw: 2,
  Won: 3,
  "Won (By forfeit)": 4,
});

var mapResultColorNumber = Object.freeze({
  0: "red",
  1: "red",
  2: "aqua",
  3: "lime",
  4: "lime",
});

function getTimeUntilNow(time) {
  let now = new Date();
  let timeDiff = now - time;
  let days = (timeDiff / 8.64e7) | 0;
  let hours = ((timeDiff % 8.64e7) / 3.6e6) | 0;
  let mins = ((timeDiff % 3.6e6) / 6e4) | 0;
  let secs = Math.floor((timeDiff % 6e4) / 1e3);

  if (days > 0) {
    return `${days} days`;
  }
  if (hours > 0) {
    return `${hours} hours`;
  }
  if (mins > 0) {
    return `${mins} minutes`;
  }
  return `${secs} seconds`;
}

function updateIdWithTime(id, time) {
  let diff = -time.getTimezoneOffset() / 60;
  let sign = diff < 0 ? "-" : "+";

  let timeBetweenNow = getTimeUntilNow(time);

  document.getElementById(id).textContent =
    time.toDateString() +
    " at " +
    z(time.getHours()) +
    ":" +
    z(time.getMinutes()) +
    ":" +
    z(time.getSeconds()) +
    " UTC" +
    sign +
    diff +
    ` (${timeBetweenNow} ago)`;
}

function updateTime(data) {
  let time = data.timestamp.firstOnline;
  time = new Date(time * 1000);
  updateIdWithTime("first_join_time", time);

  time = data.timestamp.lastOnline;
  time = new Date(time * 1000);
  updateIdWithTime("last_join_time", time);

  time = data.timestamp.lastRanked;
  time = new Date(time * 1000);
  updateIdWithTime("last_ranked_time", time);
}

function getRankByElo(elo) {
  if (elo === null) {
    return "Unrated";
  } else if (elo < 400) {
    return "Coal 1";
  } else if (elo < 500) {
    return "Coal 2";
  } else if (elo < 600) {
    return "Coal 3";
  } else if (elo < 700) {
    return "Iron 1";
  } else if (elo < 800) {
    return "Iron 2";
  } else if (elo < 900) {
    return "Iron 3";
  } else if (elo < 1000) {
    return "Gold 1";
  } else if (elo < 1100) {
    return "Gold 2";
  } else if (elo < 1200) {
    return "Gold 3";
  } else if (elo < 1300) {
    return "Emerald 1";
  } else if (elo < 1400) {
    return "Emerald 2";
  } else if (elo < 1500) {
    return "Emerald 3";
  } else if (elo < 1650) {
    return "Diamond 1";
  } else if (elo < 1800) {
    return "Diamond 2";
  } else if (elo < 2000) {
    return "Diamond 3";
  } else {
    return "Netherite";
  }
}

function getNextRank(currentRank) {
  if (currentRank === "Unrated") {
    return "TBD";
  } else if (currentRank === "Coal 1") {
    return "Coal 2";
  } else if (currentRank === "Coal 2") {
    return "Coal 3";
  } else if (currentRank === "Coal 3") {
    return "Iron 1";
  } else if (currentRank === "Iron 1") {
    return "Iron 2";
  } else if (currentRank === "Iron 2") {
    return "Iron 3";
  } else if (currentRank === "Iron 3") {
    return "Gold 1";
  } else if (currentRank === "Gold 1") {
    return "Gold 2";
  } else if (currentRank === "Gold 2") {
    return "Gold 3";
  } else if (currentRank === "Gold 3") {
    return "Emerald 1";
  } else if (currentRank === "Emerald 1") {
    return "Emerald 2";
  } else if (currentRank === "Emerald 2") {
    return "Emerald 3";
  } else if (currentRank === "Emerald 3") {
    return "Diamond 1";
  } else if (currentRank === "Diamond 1") {
    return "Diamond 2";
  } else if (currentRank === "Diamond 2") {
    return "Diamond 3";
  } else if (currentRank === "Diamond 3") {
    return "Netherite";
  } else {
    return "None";
  }
}

function getOffsetByRank(rank) {
  if (rank === "Unrated") {
    return 0;
  } else if (rank.includes("Coal")) {
    return -1.25;
  } else if (rank.includes("Iron")) {
    return -3.75;
  } else if (rank.includes("Gold")) {
    return -5;
  } else if (rank.includes("Diamond")) {
    return -6.25;
  } else if (rank.includes("Emerald")) {
    return -7.5;
  } else {
    return -8.75;
  }
}

function updateElo(data) {
  let elo = data.eloRate;
  let rank = data.eloRank;
  let peak = data.seasonResult.highest;
  let rankName = getRankByElo(elo);
  let nextRankName = getNextRank(rankName);

  let eloHTML = document.getElementById("eloRate");
  let peakHTML = document.getElementById("peakElo");
  let rankHTML = document.getElementById("eloRank");
  let rankNameHTML = document.getElementById("currentRankName");
  let nextRankHTML = document.getElementById("nextRankName");

  if (elo >= peak) {
    eloHTML.parentElement.style.color = "gold";
    peakHTML.parentElement.style.color = "gold";

    eloHTML.parentElement.style.fontWeight = "bold";
    peakHTML.parentElement.style.fontWeight = "bold";
  }

  eloHTML.textContent = elo;
  peakHTML.textContent = peak;
  rankHTML.textContent = `#${rank}`;

  document.getElementById("currentRankLogo").style.backgroundPosition =
    `${getOffsetByRank(rankName)}rem 0px`;
  rankNameHTML.textContent = `${rankName}`;

  document.getElementById("nextRankLogo").style.backgroundPosition =
    `${getOffsetByRank(nextRankName)}rem 0px`;
  nextRankHTML.textContent = `${nextRankName}`;
}

function gameWonOrLost(data, uuid) {
  //Returns 4 if won by forfeit, 3 if won, 2 if drew, 1 if lost, 0 for lost by forfeit

  if (data.result.uuid === uuid) {
    return 3 + data.forfeited;
  }
  if (data.result.uuid === null) {
    return 2;
  }
  return 1 - data.forfeited;
}

async function updateLastGame(uuid) {
  const response = await fetch(
    "https://api.mcsrranked.com/users/TheFox580/matches",
  );
  if (response.ok) {
    let json = await response.json();
    json = json.data[0];

    document.getElementById("last_match_played").innerHTML =
      `<a href=https://mcsrranked.com/stats/TheFox580/${json.id} target="_blank">Last Match Played</a>`;

    let uuid_player = {};

    let players = json.players;

    let otherPlayers = players
      .filter((player) => player.uuid !== uuid)
      .map((player) => player.nickname);

    let lastMatchPlayers = document.getElementById("last_match_players");

    for (let player of players) {
      uuid_player[player.uuid] = player.nickname;
    }

    for (let player of otherPlayers) {
      let playerLink = document.createElement("a");
      playerLink.href = `https://mcsrranked.com/stats/${player}`;
      playerLink.target = "_blank";
      playerLink.textContent = player;
      lastMatchPlayers.append(playerLink);

      if (player !== otherPlayers[otherPlayers.length - 1]) {
        lastMatchPlayers.appendChild(document.createTextNode(", "));
      }
    }

    let matchTime = new Date(json.date * 1000);

    let diff = -matchTime.getTimezoneOffset() / 60;
    let sign = diff < 0 ? "-" : "+";

    document.getElementById("last_match_time").textContent =
      matchTime.toDateString() +
      " at " +
      z(matchTime.getHours()) +
      ":" +
      z(matchTime.getMinutes()) +
      ":" +
      z(matchTime.getSeconds()) +
      " UTC" +
      sign +
      diff;

    let resultInt = gameWonOrLost(json, uuid);

    let result = mapResultNumber[resultInt];
    let resultColor = mapResultColorNumber[resultInt];

    document.getElementById("match_result").textContent = result;
    document.getElementById("match_result").style.color = resultColor;

    let endTime = json.result.time;

    let mins = ((endTime % 3.6e6) / 6e4) | 0;
    let secs = Math.floor((endTime % 6e4) / 1e3);

    document.getElementById("match_length").textContent = mins + ":" + secs;

    let change = json.changes.filter((player) => player.uuid === uuid)[0]
      .change;
    if (change != null) {
      change = change >= 0 ? "+" + change : "-" + change;
    } else {
      change = "Placement Game | No elo was gained or lost";
      resultColor = "aqua";
    }

    document.getElementById("elo_diff").textContent = change;
    document.getElementById("elo_diff").style.color = resultColor;

    document.getElementById("seed_overworld").textContent =
      capitalizeFirstLetter(json.seed.overworld);
    document.getElementById("seed_nether").textContent = capitalizeFirstLetter(
      json.seed.nether,
    );
  }
}

async function updateLast10Ranked(uuid) {
  const response = await fetch(
    "https://api.mcsrranked.com/users/TheFox580/matches?type=2&count=10",
  );
  if (response.ok) {
    let json = await response.json();
    json = json.data;
    let listGamesHTML = [];
    for (const maybeP of document.getElementById("last_10_games").children[1]
      .children) {
      if (maybeP.tagName === "LI") {
        listGamesHTML.push(maybeP);
      }
    }

    for (let i in listGamesHTML) {
      let resultInt = gameWonOrLost(json[i], uuid);
      let result = mapResultNumber[resultInt];
      let resultColor = mapResultColorNumber[resultInt];

      listGamesHTML[i].style.color = resultColor;

      let resultHTML = document.createElement("span");
      resultHTML.textContent = result;
      resultHTML.style.color = resultColor;
      resultHTML.style.fontWeight = "bold";
      listGamesHTML[i].appendChild(resultHTML);

      let against = document.createElement("span");
      against.textContent = " against ";
      against.style.color = "white";
      listGamesHTML[i].appendChild(against);

      let players = json[i].players;

      let otherPlayers = players
        .filter((player) => player.uuid !== uuid)
        .map((player) => player.nickname);

      let linkToOpponent = document.createElement("a");
      linkToOpponent.textContent = otherPlayers[0];
      linkToOpponent.href = `https://mcsrranked.com/stats/${otherPlayers[0]}`;
      linkToOpponent.target = "_blank";
      listGamesHTML[i].appendChild(linkToOpponent);
    }
  }
}

async function updateSoloInfos() {
  const response = await fetch("https://api.mcsrranked.com/users/TheFox580");
  if (response.ok) {
    let json = await response.json();
    json = json.data;

    let uuid = json.uuid;

    updateTime(json);
    updateElo(json);
    updateLastGame(uuid);
    updateLast10Ranked(uuid);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateSoloInfos();
  },
  false,
);
