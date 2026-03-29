async function getData() {
  const response = await fetch("/keys.json");
  if (response.ok) {
    let json = await response.json();
    let key = json.NOXCREW_API_KEY;

    let query =
      "{" +
      '   playerByUsername(username:"TheFox580")  {' +
      "       uuid" +
      "       username" +
      "       ranks" +
      "       mccPlusStatus {" +
      "           totalDays" +
      "       }" +
      "        crownLevel {" +
      "            levelData {" +
      "                    level" +
      "                    nextLevelProgress {" +
      "                        obtained" +
      "                        obtainable" +
      "                }" +
      "            }" +
      "            styleLevelData {" +
      "                    level" +
      "                    nextLevelProgress {" +
      "                        obtained" +
      "                        obtainable" +
      "                }" +
      "            }" +
      "            fishingLevelData {" +
      "                    level" +
      "                    nextLevelProgress {" +
      "                        obtained" +
      "                        obtainable" +
      "                }" +
      "            }" +
      "            overall_trophies: trophies {" +
      "                obtained" +
      "                obtainable" +
      "                bonus" +
      "            }" +
      "            style_trophies: trophies(category: STYLE) {" +
      "                obtained" +
      "                obtainable" +
      "                bonus" +
      "            }" +
      "            skill_trophies: trophies(category: SKILL) {" +
      "                obtained" +
      "                obtainable" +
      "                bonus" +
      "            }" +
      "            angler_trophies: trophies(category: ANGLER) {" +
      "                obtained" +
      "                obtainable" +
      "                bonus" +
      "            }" +
      "        }" +
      "        status {" +
      "            online" +
      "        }" +
      "        collections {" +
      "            currency {" +
      "                coins" +
      "                royalReputation" +
      "                anglrTokens" +
      "            }" +
      "        }" +
      "        social {" +
      "            friends {" +
      "                uuid" +
      "            }" +
      "            party {" +
      "                active" +
      "                members {" +
      "                    username" +
      "                }" +
      "            }" +
      "        }" +
      "        factions {" +
      "            name" +
      "            selected" +
      "            levelData {" +
      "                level" +
      "                nextLevelProgress {" +
      "                    obtained" +
      "                    obtainable" +
      "                }" +
      "            }" +
      "            totalExperience" +
      "        }" +
      "    }" +
      "}";

    const rawData = await fetch("https://api.mccisland.net/graphql", {
      method: "POST",
      headers: {
        "X-API-Key": key,
      },
      body: JSON.stringify({ query: query }),
    });

    if (rawData.ok) {
      console.log(rawData);
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    let data = getData();
  },
  false,
);
