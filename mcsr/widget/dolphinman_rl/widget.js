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

function colorByRank(rank) {
  if (rank.includes("Coal")) {
    return "#444545";
  } else if (rank.includes("Iron")) {
    return "#A59C94";
  } else if (rank.includes("Gold")) {
    return "gold";
  } else if (rank.includes("Emerald")) {
    return "#50c85a";
  } else if (rank.includes("Diamond")) {
    return "#34ebc9";
  } else {
    return "lightred";
  }
}

function getOffsetByRank(rank) {
  if (rank.includes("Coal")) {
    if (rank == "Coal 1") {
      return [0, 0];
    } else if (rank == "Coal 2") {
      return [-1.40625, 0];
    }
    return [-2.8125, 0];
  } else if (rank.includes("Iron")) {
    if (rank == "Iron 1") {
      return [-4.21875, 0];
    }
    if (rank == "Iron 2") {
      return [-5.625, 0];
    }
    return [-7.03125, 0];
  } else if (rank.includes("Gold")) {
    if (rank == "Gold 1") {
      return [0, -1.40625];
    } else if (rank == "Gold 2") {
      return [-1.40625, -1.40625];
    }
    return [-2.8125, -1.40625];
  } else if (rank.includes("Emerald")) {
    if (rank == "Emerald 1") {
      return [-4.21875, -1.40625];
    }
    if (rank == "Emerald 2") {
      return [-5.625, -1.40625];
    }
    return [-7.03125, -1.40625];
  } else if (rank.includes("Diamond")) {
    if (rank == "Diamond 1") {
      return [0, -2.8125];
    } else if (rank == "Diamond 2") {
      return [-1.40625, -2.8125];
    }
    return [-2.8125, -2.8125];
  } else if (rank == "Netherite") {
    return [-4.21875, -2.8125];
  }
  return [-5.625, -2.8125];
}

var currentElo = 0;
var currentRank = 0;
var startingElo = 0;
var last = 0;

function updateEloRate() {
  let rateSpan = document.getElementById("rate");
  let diff = currentElo - startingElo;
  if (diff < 0) {
    rateSpan.textContent = diff;
    rateSpan.style.color = "red";
  } else if (diff > 0) {
    rateSpan.textContent = "+" + diff;
    rateSpan.style.color = "lime";
  } else {
    rateSpan.textContent = "+" + diff;
    rateSpan.style.color = "gold";
  }
}

function addElo(elo) {
  let eloSpan = document.getElementById("elo");
  let intervalId = setInterval(() => {
    if (elo <= 1) {
      clearInterval(intervalId);
    }
    elo--;
    currentElo++;

    eloSpan.textContent = currentElo + " elo";
    updateEloRate();
  }, 50);
}

function removeElo(elo) {
  let eloSpan = document.getElementById("elo");
  let intervalId = setInterval(() => {
    if (elo <= 1) {
      clearInterval(intervalId);
    }
    elo--;
    currentElo--;
    eloSpan.textContent = currentElo + " elo";
    updateEloRate();
  }, 50);
}

function updatePlacement(wins, loss, draws) {
  let placement = document.getElementById("wins");
  wins += parseInt(placement.textContent.split("/")[0]);
  loss += parseInt(placement.textContent.split("/")[1]);
  draws += parseInt(placement.textContent.split("/")[2]);

  placement.textContent = `${wins}/${loss}/${draws}`;
}

function updateRank(newRank) {
  let rankImage = document.getElementById("rank");
  let nextRankSpan = document.getElementById("nextRank");
  if (newRank !== null) {
    let rankSpan = document.getElementById("rankPlace");
    let intervalId = setInterval(() => {
      if (newRank === currentRank) {
        clearInterval(intervalId);
      } else if (newRank > currentRank) {
        currentRank++;
      } else if (newRank < currentRank) {
        currentRank--;
      }

      let offset = getOffsetByRank(getRankByElo(currentElo));

      rankSpan.textContent = currentRank;
      nextRankSpan.textContent = `${getNextRank(getRankByElo(currentElo))}`;
      nextRankSpan.style.color = colorByRank(
        getNextRank(getRankByElo(currentElo)),
      );
      rankImage.style.backgroundPosition = `${offset[0]}rem ${offset[1]}rem`;
    }, 5);
  } else {
    let offset = getOffsetByRank(getRankByElo(null));
    rankImage.style.backgroundPosition = `${offset[0]}rem ${offset[1]}rem`;
  }
}

async function updateScores() {
  const response = await fetch(
    "https://api.mcsrranked.com/users/dolphinman_rl",
  );
  if (response.ok) {
    let json = await response.json();
    json = json.data;

    let userHead = document.getElementById("userHead");
    userHead.setAttribute("src", `https://minotar.net/helm/${json.uuid}/75`);

    if (startingElo === 0) {
      if (json.eloRate === null) {
        let eloSpan = document.getElementById("elo");
        eloSpan.textContent = "No elo yet";
        updateRank(null);
      } else {
        startingElo = json.eloRate;
        currentElo = json.eloRate;
        currentRank = json.eloRank;
        let eloSpan = document.getElementById("elo");
        eloSpan.textContent = currentElo + " elo";
        updateRank(json.eloRank);
      }
    }

    if (last === 0) {
      last = json.timestamp.lastRanked;
    } else if (
      last !== json.timestamp.lastRanked ||
      currentRank !== json.eloRank
    ) {
      if (last !== json.timestamp.lastRanked) {
        last = json.timestamp.lastRanked;

        let diff = json.eloRate - currentElo;

        if (diff > 0) {
          addElo(diff);
          updatePlacement(1, 0, 0);
        } else if (diff < 0) {
          removeElo(Math.abs(diff));
          updatePlacement(0, 1, 0);
        } else {
          updatePlacement(0, 0, 1);
        }
      }
      updateRank(json.eloRank);
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateScores();
    setInterval(() => {
      updateScores();
    }, 5 * 1000);
  },
  false,
);
