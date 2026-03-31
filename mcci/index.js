let RANKS = {
  NONE: "None",
  CHAMP: "Champ",
  GRAND_CHAMP: "Grand Champ",
  GRAND_CHAMP_ROYALE: "Grand Champ Royale",
  GRAND_CHAMP_SUPREME: "Grand Champ Supreme",
  CREATOR: "Content Creator",
  CONTESTANT: "MCC Contestant",
  MODERATOR: "MCCI Moderator",
  NOXCREW: "Noxcrew Staff",
};

let RARITY = {
  COMMON: "#879696",
  UNCOMMON: "#0b9400",
  RARE: "#0050b7",
  EPIC: "#a033ea",
  LEGENDARY: "#f87c00",
  MYTHIC: "#b62626",
  COLLECTOR: "#facf2e",
  EXCLUSIVE: "#ff8a8e",
  ARCANE: "#7d81df",
};

let LEVEL_COLOR = {
  0: "#363637",
  1: "#71719a",
  2: "#02b61b",
  3: "#0054d2",
  4: "#862eec",
  5: "#ff5400",
  6: "#ff1b1d",
  7: "#50cfb0",
  8: "#aaaaff",
  9: "#ff738f",
  10: "#3926ab",
};

let FACTION_COLOR = {
  RED_RABBITS: "#ff0000",
  ORANGE_OCELOTS: "#cc6600",
  YELLOW_YAKS: "#ffff00",
  LIME_LLAMAS: "#00ff00",
  GREEN_GECKOS: "#009933",
  CYAN_COYOTES: "#0086b3",
  AQUA_AXOLOTLS: "#00ffff",
  BLUE_BATS: "#0000ff",
  PURPLE_PANDAS: "#6600cc",
  PINK_PARROTS: "#cc00cc",
  NONE: "#000000",
};

let FACTIONS = {
  RED_RABBITS: "Red Rabbits",
  ORANGE_OCELOTS: "Orange Ocelots",
  YELLOW_YAKS: "Yellow Yaks",
  LIME_LLAMAS: "Lime Llamas",
  GREEN_GECKOS: "Green Geckos",
  CYAN_COYOTES: "Cyan Coyotes",
  AQUA_AXOLOTLS: "Aqua Axolotls",
  BLUE_BATS: "Blue Bats",
  PURPLE_PANDAS: "Purple Pandas",
  PINK_PARROTS: "Pink Parrots",
  NONE: "None",
};

let GAME_NAMES = {
  battle_box: "Battle Box",
  dynaball: "Dynaball",
  hitw: "Hole in the Wall",
  parkour_warrior: "Parkour Warrior Survivor / Dojo",
  rocket_spleef: "Rocket Spleef Rush",
  sky_battle: "Sky Battle",
  tgttos: "To Get To The Other Side",
  general: "General",
};

let COSMETIC_CATEGORY = {
  HAT: "Hat",
  HAIR: "Hair",
  ACCESSORY: "Accessory",
  AURA: "Aura",
  TRAIL: "Trail",
  CLOAK: "Cloak",
  ROD: "Rod",
  SWORD: "Sword",
  BOW: "Bow",
  CROSSBOW: "Crossbow",
  HEAVY_CROSSBOW: "Heavy Crossbow",
  SHORTBOW: "Shortbow",
  DAGGER: "Dagger",
  AXE: "Axe",
};

let MAX_ROYAL_REP = 22380;

function formatInt(int) {
  let str = `${int}`.split("").reverse();
  let res = "";

  for (let index = 0; index < str.length; index++) {
    if (!(index % 3) && index > 0) {
      res += ",";
    }
    res += str[index];
  }

  return res.split("").reverse().join("");
}

function decimalToRoman(number) {
  const RN = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  const VRN = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  var div = 0;

  var ind = RN.length - 1;
  var retRN = "";

  while (number > 0) {
    div = Math.floor(number / VRN[ind]);
    number = number % VRN[ind];

    while (div--) {
      retRN = retRN + RN[ind];
    }
    ind--;
  }

  return retRN;
}

function getRarityFormatting(rank) {
  return `width: ${0.75 * rank.length}em; height: 1em;`;
}

async function getData() {
  const response = await fetch("/mcci/MCCI_Data_TheFox580.json");
  if (response.ok) {
    let data = await response.json();

    console.log(data);

    document.getElementById("rank_img").src =
      `https://islandcdn.themysterys.com/ranks_long/${data.ranks[0].toLowerCase()}.png`;

    document.getElementById("crown_level_info").textContent +=
      " " + data.crownLevel.levelData.level + " ";

    let crownLevel10 =
      Math.floor(data.crownLevel.levelData.level / 10) > 10
        ? 10
        : Math.floor(data.crownLevel.levelData.level / 10);

    let crownImage = document.createElement("img");
    crownImage.src = `https://islandcdn.themysterys.com/icons/crowns/${crownLevel10}.png`;
    crownImage.id = "crown_img";
    crownImage.alt = "TheFox580's crown level";
    crownImage.style = "width: 1em; height: 1em; transform: translate(0, 2px)";

    document.getElementById("crown_level_info").appendChild(crownImage);

    let crownProgressBar = document.getElementById("crown_progress_bar");
    let crownProgress = data.crownLevel.levelData.nextLevelProgress;
    crownProgressBar.style.width = `${(crownProgress.obtained / crownProgress.obtainable) * 100}%`;
    crownProgressBar.style.backgroundColor = LEVEL_COLOR[crownLevel10];

    let crownProgressText = document.getElementById("crown_progress_text");
    crownProgressText.textContent = `${Math.round((crownProgress.obtained / crownProgress.obtainable) * 100 * 100) / 100}% to Level ${data.crownLevel.levelData.level + 1} (${formatInt(crownProgress.obtained)} / ${formatInt(crownProgress.obtainable)})`;

    document.getElementById("style_level_info").textContent +=
      " " + data.crownLevel.styleLevelData.level + " ";

    let styleLevel10 =
      Math.floor(data.crownLevel.styleLevelData.level / 10) > 10
        ? 10
        : Math.floor(data.crownLevel.styleLevelData.level / 10);

    let styleImage = document.createElement("img");
    styleImage.src = `https://islandcdn.themysterys.com/icons/style_level/${styleLevel10}.png`;
    styleImage.id = "style_img";
    styleImage.alt = "TheFox580's style level";
    styleImage.style = "width: 1em; height: 1em; transform: translate(0, 2px)";

    document.getElementById("style_level_info").appendChild(styleImage);

    let styleProgressBar = document.getElementById("style_progress_bar");
    let styleProgress = data.crownLevel.styleLevelData.nextLevelProgress;
    styleProgressBar.style.width = `${(styleProgress.obtained / styleProgress.obtainable) * 100}%`;
    styleProgressBar.style.backgroundColor = LEVEL_COLOR[styleLevel10];

    let styleProgressText = document.getElementById("style_progress_text");
    styleProgressText.textContent = `${Math.round((styleProgress.obtained / styleProgress.obtainable) * 100 * 100) / 100}% to Level ${data.crownLevel.styleLevelData.level + 1} (${formatInt(styleProgress.obtained)} / ${formatInt(styleProgress.obtainable)})`;

    document.getElementById("fishing_level_info").textContent +=
      " " + data.crownLevel.fishingLevelData.level + " ";

    let fishingLevel10 =
      Math.floor(data.crownLevel.fishingLevelData.level / 10) > 10
        ? 10
        : Math.floor(data.crownLevel.fishingLevelData.level / 10);

    let fishingImage = document.createElement("img");
    fishingImage.src = `https://islandcdn.themysterys.com/fishing/level/${fishingLevel10}.png`;
    fishingImage.id = "fishing_img";
    fishingImage.alt = "TheFox580's fishing level";
    fishingImage.style =
      "width: 1em; height: 1em; transform: translate(0, 2px)";

    document.getElementById("fishing_level_info").appendChild(fishingImage);

    let fishingProgressBar = document.getElementById("fishing_progress_bar");
    let fishingProgress = data.crownLevel.fishingLevelData.nextLevelProgress;
    fishingProgressBar.style.width = `${(fishingProgress.obtained / fishingProgress.obtainable) * 100}%`;
    fishingProgressBar.style.backgroundColor = LEVEL_COLOR[fishingLevel10];

    let fishingProgressText = document.getElementById("fishing_progress_text");
    fishingProgressText.textContent = `${Math.round((fishingProgress.obtained / fishingProgress.obtainable) * 100 * 100) / 100}% to Level ${data.crownLevel.fishingLevelData.level + 1} (${formatInt(fishingProgress.obtained)} / ${formatInt(fishingProgress.obtainable)})`;

    let currentFaction = null;

    data.factions.forEach((faction) => {
      if (faction.selected === true) {
        currentFaction = faction;
      }
    });

    document.getElementById("faction_level_info").textContent +=
      " " + currentFaction.levelData.level + " ";

    let factionPrestige30 =
      Math.floor(currentFaction.levelData.level / 30) > 9
        ? 9
        : Math.floor(currentFaction.levelData.level / 30);

    let factionImage = document.createElement("img");
    factionImage.src = `https://islandcdn.themysterys.com/factions/${currentFaction.name.split("_")[0].toLowerCase()}/${factionPrestige30}.png`;
    factionImage.id = "faction_img";
    factionImage.alt = "TheFox580's faction level";
    factionImage.style =
      "width: 1.5em; height: 1em; transform: translate(0, 2px)";

    document.getElementById("faction_level_info").appendChild(factionImage);

    let factionProgressBar = document.getElementById("faction_progress_bar");
    let factionProgress = currentFaction.levelData.nextLevelProgress;
    factionProgressBar.style.width = `${(factionProgress.obtained / factionProgress.obtainable) * 100}%`;
    factionProgressBar.style.backgroundColor =
      FACTION_COLOR[currentFaction.name];

    let factionProgressText = document.getElementById("faction_progress_text");
    factionProgressText.textContent = `${Math.round((factionProgress.obtained / factionProgress.obtainable) * 100 * 100) / 100}% to Level ${currentFaction.levelData.level + 1} (${formatInt(factionProgress.obtained)} / ${formatInt(factionProgress.obtainable)})`;

    document.getElementById("overall_trophies_text").textContent =
      `${formatInt(data.crownLevel.overall_trophies.obtained)} / ${formatInt(data.crownLevel.overall_trophies.obtainable)} Overall Trophies`;

    document.getElementById("style_trophies_text").textContent =
      `${formatInt(data.crownLevel.style_trophies.obtained)} / ${formatInt(data.crownLevel.style_trophies.obtainable)} Style Trophies`;

    document.getElementById("angler_trophies_text").textContent =
      `${formatInt(data.crownLevel.angler_trophies.obtained)} / ${formatInt(data.crownLevel.angler_trophies.obtainable)} Angler Trophies`;

    document.getElementById("skill_trophies_text").textContent =
      `${formatInt(data.crownLevel.skill_trophies.obtained)} / ${formatInt(data.crownLevel.skill_trophies.obtainable)} Skill Trophies`;

    document.getElementById("bonus_trophies_text").textContent =
      `${formatInt(data.crownLevel.overall_trophies.bonus)} Bonus Trophies`;

    document.getElementById("coins_text").textContent =
      `${formatInt(data.collections.currency.coins)} Coins`;

    document.getElementById("anglr_token_text").textContent =
      `${formatInt(data.collections.currency.anglrTokens)} A.N.G.L.R. Tokens`;

    document.getElementById("royal_reputation_text").textContent =
      `${formatInt(data.collections.currency.royalReputation)} / ${formatInt(MAX_ROYAL_REP)} Royal Reputation`;

    let equippedCosmetics = data.collections.equippedCosmetics;

    let headCosmetic = null;
    let accessoryCosmetic = null;
    let cloakCosmetic = null;
    let trailCosmetic = null;
    let auraCosmetic = null;
    let rodCosmetic = null;

    equippedCosmetics.forEach((cosmetic) => {
      if (cosmetic.category === "HAT") {
        headCosmetic = cosmetic;
      } else if (cosmetic.category === "ACCESSORY") {
        accessoryCosmetic = cosmetic;
      } else if (cosmetic.category === "CLOAK") {
        cloakCosmetic = cosmetic;
      } else if (cosmetic.category === "TRAIL") {
        trailCosmetic = cosmetic;
      } else if (cosmetic.category === "AURA") {
        auraCosmetic = cosmetic;
      } else if (cosmetic.category === "ROD") {
        rodCosmetic = cosmetic;
      }
    });

    let headCosmeticDiv = document.getElementById("head_cosmetic");
    headCosmeticDiv.style.borderColor = RARITY[headCosmetic.rarity];

    let headCosmeticImage = document.createElement("img");
    headCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/hat/${headCosmetic.collection.toLowerCase()}/${headCosmetic.name.replaceAll(" ", "_")}.png`;
    headCosmeticImage.id = "head_cosmetic_img";
    headCosmeticImage.alt = `TheFox580's head cosmetic (${headCosmetic.name}`;
    headCosmeticImage.style = "width: 3em; height: 3em;";

    headCosmeticDiv.insertBefore(
      headCosmeticImage,
      document.getElementById("head_cosmetic_infos"),
    );

    document.getElementById("head_cosmetic_name").textContent =
      headCosmetic.name;

    document.getElementById("head_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${headCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("head_cosmetic_rarity").style = getRarityFormatting(
      headCosmetic.rarity,
    );

    document.getElementById("head_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(headCosmetic.type) ? "tooltip" : "rarity"}/${headCosmetic.type === "STANDARD" ? "head" : headCosmetic.type.toLowerCase()}.png`;
    document.getElementById("head_cosmetic_type").style =
      getRarityFormatting(
        headCosmetic.type === "STANDARD" ? "HEAD" : headCosmetic.type,
      ) + "; margin-left: 5px";

    let accessoryCosmeticDiv = document.getElementById("accessory_cosmetic");
    accessoryCosmeticDiv.style.borderColor = RARITY[accessoryCosmetic.rarity];

    let accessoryCosmeticImage = document.createElement("img");
    accessoryCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/accessory/${accessoryCosmetic.collection.toLowerCase()}/${accessoryCosmetic.name.replaceAll(" ", "_")}.png`;
    accessoryCosmeticImage.id = "accessory_cosmetic_img";
    accessoryCosmeticImage.alt = `TheFox580's accessory cosmetic (${accessoryCosmetic.name}`;
    accessoryCosmeticImage.style = "width: 3em; height: 3em;";

    accessoryCosmeticDiv.insertBefore(
      accessoryCosmeticImage,
      document.getElementById("accessory_cosmetic_infos"),
    );

    document.getElementById("accessory_cosmetic_name").textContent =
      accessoryCosmetic.name;

    document.getElementById("accessory_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${accessoryCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("accessory_cosmetic_rarity").style =
      getRarityFormatting(accessoryCosmetic.rarity);

    document.getElementById("accessory_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(accessoryCosmetic.type) ? "tooltip" : "rarity"}/${accessoryCosmetic.type === "STANDARD" ? "accessory" : accessoryCosmetic.type.toLowerCase()}.png`;
    document.getElementById("accessory_cosmetic_type").style =
      getRarityFormatting(
        accessoryCosmetic.type === "STANDARD"
          ? "ACCESSORY"
          : accessoryCosmetic.type,
      ) + "; margin-left: 5px";

    let cloakCosmeticDiv = document.getElementById("cloak_cosmetic");
    cloakCosmeticDiv.style.borderColor = RARITY[cloakCosmetic.rarity];

    let cloakCosmeticImage = document.createElement("img");
    cloakCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/cloak/${cloakCosmetic.collection.toLowerCase()}/${cloakCosmetic.name.replaceAll(" ", "_")}.png`;
    cloakCosmeticImage.id = "cloak_cosmetic_img";
    cloakCosmeticImage.alt = `TheFox580's cloak cosmetic (${cloakCosmetic.name}`;
    cloakCosmeticImage.style = "width: 3em; height: 3em;";

    cloakCosmeticDiv.insertBefore(
      cloakCosmeticImage,
      document.getElementById("cloak_cosmetic_infos"),
    );

    document.getElementById("cloak_cosmetic_name").textContent =
      cloakCosmetic.name;

    document.getElementById("cloak_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${cloakCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("cloak_cosmetic_rarity").style =
      getRarityFormatting(cloakCosmetic.rarity);

    document.getElementById("cloak_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(cloakCosmetic.type) ? "tooltip" : "rarity"}/${cloakCosmetic.type === "STANDARD" ? "cloak" : cloakCosmetic.type.toLowerCase()}.png`;
    document.getElementById("cloak_cosmetic_type").style =
      getRarityFormatting(
        cloakCosmetic.type === "STANDARD" ? "CLOAK" : cloakCosmetic.type,
      ) + "; margin-left: 5px";

    let trailCosmeticDiv = document.getElementById("trail_cosmetic");
    trailCosmeticDiv.style.borderColor = RARITY[trailCosmetic.rarity];

    let trailCosmeticImage = document.createElement("img");
    trailCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/trail/${trailCosmetic.collection.toLowerCase()}/${trailCosmetic.name.replaceAll(" ", "_")}.png`;
    trailCosmeticImage.id = "trail_cosmetic_img";
    trailCosmeticImage.alt = `TheFox580's trail cosmetic (${trailCosmetic.name}`;
    trailCosmeticImage.style = "width: 3em; height: 3em;";

    trailCosmeticDiv.insertBefore(
      trailCosmeticImage,
      document.getElementById("trail_cosmetic_infos"),
    );

    document.getElementById("trail_cosmetic_name").textContent =
      trailCosmetic.name;

    document.getElementById("trail_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${trailCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("trail_cosmetic_rarity").style =
      getRarityFormatting(trailCosmetic.rarity);

    document.getElementById("trail_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(trailCosmetic.type) ? "tooltip" : "rarity"}/${trailCosmetic.type === "STANDARD" ? "trail" : trailCosmetic.type.toLowerCase()}.png`;
    document.getElementById("trail_cosmetic_type").style =
      getRarityFormatting(
        trailCosmetic.type === "STANDARD" ? "TRAIL" : trailCosmetic.type,
      ) + "; margin-left: 5px";

    let auraCosmeticDiv = document.getElementById("aura_cosmetic");
    auraCosmeticDiv.style.borderColor = RARITY[auraCosmetic.rarity];

    let auraCosmeticImage = document.createElement("img");
    auraCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/aura/${auraCosmetic.collection.toLowerCase()}/${auraCosmetic.name.replaceAll(" ", "_")}.png`;
    auraCosmeticImage.id = "aura_cosmetic_img";
    auraCosmeticImage.alt = `TheFox580's aura cosmetic (${auraCosmetic.name}`;
    auraCosmeticImage.style = "width: 3em; height: 3em;";

    auraCosmeticDiv.insertBefore(
      auraCosmeticImage,
      document.getElementById("aura_cosmetic_infos"),
    );

    document.getElementById("aura_cosmetic_name").textContent =
      auraCosmetic.name;

    document.getElementById("aura_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${auraCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("aura_cosmetic_rarity").style = getRarityFormatting(
      auraCosmetic.rarity,
    );

    document.getElementById("aura_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(auraCosmetic.type) ? "tooltip" : "rarity"}/${auraCosmetic.type === "STANDARD" ? "aura" : auraCosmetic.type.toLowerCase()}.png`;
    document.getElementById("aura_cosmetic_type").style =
      getRarityFormatting(
        auraCosmetic.type === "STANDARD" ? "AURA" : auraCosmetic.type,
      ) + "; margin-left: 5px";

    let rodCosmeticDiv = document.getElementById("rod_cosmetic");
    rodCosmeticDiv.style.borderColor = RARITY[rodCosmetic.rarity];

    let rodCosmeticImage = document.createElement("img");
    rodCosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/rod/${rodCosmetic.collection.toLowerCase()}/${rodCosmetic.name.replaceAll(" ", "_")}.png`;
    rodCosmeticImage.id = "rod_cosmetic_img";
    rodCosmeticImage.alt = `TheFox580's rod cosmetic (${rodCosmetic.name}`;
    rodCosmeticImage.style = "width: 3em; height: 3em;";

    rodCosmeticDiv.insertBefore(
      rodCosmeticImage,
      document.getElementById("rod_cosmetic_infos"),
    );

    document.getElementById("rod_cosmetic_name").textContent = rodCosmetic.name;

    document.getElementById("rod_cosmetic_rarity").src =
      `https://islandcdn.themysterys.com/icons/rarity/${rodCosmetic.rarity.toLowerCase()}.png`;
    document.getElementById("rod_cosmetic_rarity").style = getRarityFormatting(
      rodCosmetic.rarity,
    );

    document.getElementById("rod_cosmetic_type").src =
      `https://islandcdn.themysterys.com/icons/${["LEGACY", "STANDARD"].includes(rodCosmetic.type) ? "tooltip" : "rarity"}/${rodCosmetic.type === "STANDARD" ? "rod" : rodCosmetic.type.toLowerCase()}.png`;
    document.getElementById("rod_cosmetic_type").style =
      getRarityFormatting(
        rodCosmetic.type === "STANDARD" ? "ROD" : rodCosmetic.type,
      ) + "; margin-left: 5px";

    let friends = data.social.friends;
    let friendsDiv = document.getElementById("friends_div");

    for (let friend of friends) {
      let friendBox = document.createElement("div");
      friendBox.id = `friend_${friend.uuid}`;
      friendBox.style.display = "flex";
      friendBox.style.borderColor = "darkgray";
      friendBox.style.borderRadius = "10px";
      friendBox.style.borderStyle = "solid";
      friendBox.style.padding = "10px";

      let friendImage = document.createElement("img");
      friendImage.src = `https://minotar.net/helm/${friend.uuid.replaceAll("-", "")}/75`;
      friendImage.id = `friend_${friend.uuid}_img`;
      friendImage.alt = `${friend.username}'s head`;
      friendImage.style.width = "3em";
      friendImage.style.borderRadius = "5px";

      friendBox.appendChild(friendImage);

      let friendInfos = document.createElement("div");
      friendInfos.id = `friend_${friend.uuid}`;
      friendInfos.style.display = "flex";
      friendInfos.style.flexDirection = "column";
      friendInfos.style.marginLeft = "10px";
      friendInfos.style.justifyContent = "center";

      let friendText = document.createElement("span");
      friendText.id = `friend_${friend.uuid}`;
      friendText.style.fontWeight = "bold";
      friendText.textContent = friend.username;

      friendInfos.appendChild(friendText);

      friendBox.appendChild(friendInfos);

      friendsDiv.appendChild(friendBox);
    }

    let badges = data.badges;

    let badges_sorted = {
      battle_box: [],
      dynaball: [],
      hitw: [],
      parkour_warrior: [],
      rocket_spleef: [],
      sky_battle: [],
      tgttos: [],
      general: [],
    };

    let bb_badges_name = [
      "Ace From Afar",
      "Ace in the Box",
      "Aerial Assault",
      "Battle Box Champion",
      "Battle Box Expert",
      "Raiders Challenge",
      "Raiders Pass",
      "Knights Challenge",
      "Knights Pass",
      "Battle Box Player",
      "Battle Box Warrior",
      "Blind Brawl",
      "Demolitions Expert",
      "Flawless Battle",
      "Savior Ace",
      "Stealthy Takedown",
      "Ultimate Ace",
      "Untouchable Assassin",
    ];

    let dynaball_badges_name = [
      "Airstrike Assassin",
      "Dynaball Champion",
      "Dynaball Demolitionist",
      "Dynaball Engineer",
      "Slapstick Challenge",
      "Slapstick Pass",
      "Nuclear Challenge",
      "Nuclear Pass",
      "Dynaball Sniper",
      "Dynaball Spawner Smasher",
      "Dynaball Survivor",
      "Dynaballin",
      "Dynamite Dreadlord",
      "Final Survivor",
      "Massive Repairs",
      "Tactical Powder",
      "Ultimate Baller",
    ];

    let hitw_badges_name = [
      "Barely Broiled",
      "Blaze of Glory",
      "Bring On The Wall",
      "Bullet Time",
      "Hole in the Wall Champion",
      "Hole in the Wall Expert",
      "Slimey Experiments Challenge",
      "Slimey Experiments Pass",
      "Wall King Challenge",
      "Wall King Pass",
      "Monster Catch",
      "Slimey Rivalry",
      "Something In The Waves",
    ];

    let pkw_badges_name = [
      "Advanced Completionist",
      "Advanced Leaper",
      "Parkour Warrior Assassin",
      "Parkour Warrior Champion",
      "Expert Completionist",
      "Expert Leaper",
      "Parkour Warrior Finalist",
      "Master Frog Challenge",
      "Master Frog Pass",
      "Cherry Blossom Challenge",
      "Cherry Blossom Pass",
      "Standard Completionist",
      "Standard Leaper",
    ];

    let rsr_badges_name = [
      "Advanced Tactics",
      "Careful Glider",
      "Flawless Rocketeer",
      "Rocket Brawler",
      "Rocket Rush",
      "Rocket Spleef Champion",
      "Rocket Spleef Expert",
      "Rocket Spleef Glider",
      "Spleef Sniper",
      "Rocket Spleef Survivor",
      "Rocket Spleef Warrior",
      "Spleef Slapdown",
      "Ultimate Rocketeer",
    ];

    let skb_badges_name = [
      "Creeper Coffin",
      "Fallen Warrior",
      "Personal Feast",
      "Sky Battle Champion",
      "Sky Battle Expert",
      "Sky Battle Player",
      "Sky Battle Warrior",
      "Sky Lord Challenge",
      "Sky Lord Pass",
      "Storm Lord Challenge",
      "Storm Lord Pass",
      "Sky Lord",
      "Sky Sniper",
      "Team Crusher",
      "Untouchable Champion",
      "Wings to Fly",
    ];

    let tgttos_badges_name = [
      "Chicken Puncher",
      "Got the Worm",
      "Jackpot!",
      "Pave the Way",
      "Slapdown",
      "TGTTOS Champion",
      "TGTTOS Expert",
      "Eggcellent Challenge",
      "Eggcellent Pass",
      "Roadworks Challenge",
      "Roadworks Pass",
      "TGTTOS Round Champion",
      "TGTTOS Round Expert",
      "Triple Champion",
      "Ultimate Comeback",
      "Untouchable Speedster",
      "Victorious Pacifist",
    ];

    badges.forEach((badge) => {
      if (tgttos_badges_name.includes(badge.badge.name)) {
        badges_sorted.tgttos.push(badge);
      } else if (dynaball_badges_name.includes(badge.badge.name)) {
        badges_sorted.dynaball.push(badge);
      } else if (bb_badges_name.includes(badge.badge.name)) {
        badges_sorted.battle_box.push(badge);
      } else if (skb_badges_name.includes(badge.badge.name)) {
        badges_sorted.sky_battle.push(badge);
      } else if (hitw_badges_name.includes(badge.badge.name)) {
        badges_sorted.hitw.push(badge);
      } else if (pkw_badges_name.includes(badge.badge.name)) {
        badges_sorted.parkour_warrior.push(badge);
      } else if (rsr_badges_name.includes(badge.badge.name)) {
        badges_sorted.rocket_spleef.push(badge);
      } else {
        if (badge.badge.name != "Spirit Blossom Champion") {
          // Badge Image not available yet.
          badges_sorted.general.push(badge);
        }
      }
    });

    for (const [key, value] of Object.entries(badges_sorted)) {
      let catNameH2 = document.createElement("h2");
      catNameH2.id = `badges_${key}`;
      catNameH2.textContent = GAME_NAMES[key];

      document.getElementById("badges_to_add").appendChild(catNameH2);

      let catDiv = document.createElement("div");
      catDiv.id = `badges_${key}_div`;
      catDiv.style.display = "grid";
      catDiv.style.gridTemplateColumns = "repeat(4, 1fr)";
      catDiv.style.gap = "10px";
      catDiv.style.gridAutoRows = "minmax(50px, auto)";

      for (let badge of value) {
        let badge_former_name = badge.badge.name
          .toLowerCase()
          .replaceAll(" ", "_");

        //Edge Cases:

        switch (badge_former_name) {
          case "slimey_experiments_challenge":
            badge_former_name = "slimy_experiments_challenge";
            break;
          case "slimey_experiments_pass":
            badge_former_name = "slimy_experiments_pass";
            break;
          case "jackpot!":
            badge_former_name = "jackpot";
            break;
          case "community_contribution_points":
            badge_former_name = "community_contributor";
            break;
          default:
            break;
        }

        let stageCompleted = 0;

        for (let stage of badge.stageProgress) {
          if (stage.progress.obtained >= stage.progress.obtainable) {
            stageCompleted++;
          }
        }

        let percentCompleted = Math.min(
          Math.round(
            (badge.stageProgress[
              Math.min(badge.stageProgress.length - 1, stageCompleted)
            ].progress.obtained /
              badge.stageProgress[
                Math.min(badge.stageProgress.length - 1, stageCompleted)
              ].progress.obtainable) *
              100 *
              100,
          ) / 100,
          100,
        );

        let badgeBox = document.createElement("div");
        badgeBox.id = `badge_${key}_${badge_former_name}`;
        badgeBox.style.display = "flex";
        badgeBox.style.flexDirection = "row";
        badgeBox.style.alignItems = "center";
        badgeBox.style.borderRadius = "10px";
        badgeBox.style.borderStyle = "solid";
        badgeBox.style.padding = "10px";

        let badgeImage = document.createElement("img");
        badgeImage.src = `https://islandcdn.themysterys.com/badges/${key}/${badge_former_name}.png`;
        badgeImage.id = `badge_${key}_${badge_former_name}_img`;
        badgeImage.alt = `TheFox580's ${badge.badge.name}`;
        badgeImage.style = "width: 3em; height: 3em;";
        if (stageCompleted === 0) {
          badgeImage.classList.add("grayscale");
        }

        badgeBox.appendChild(badgeImage);

        let badgeInfos = document.createElement("div");
        badgeInfos.id = `badge_${key}_${badge_former_name}_infos`;
        badgeInfos.style.display = "flex";
        badgeInfos.style.flexDirection = "column";
        badgeInfos.style.marginLeft = "10px";
        badgeInfos.style.justifyContent = "center";

        let badgeName = document.createElement("span");
        badgeName.id = `badge_${key}_${badge_former_name}_name`;
        badgeName.style.fontWeight = "bold";
        badgeName.style.color = "white";
        badgeName.textContent = badge.badge.name;
        if (
          badgeName.textContent.includes("Pass") ||
          badgeName.textContent.includes("Challenge") ||
          key === "general"
        ) {
          badgeInfos.classList.add("unobtainable");
        }

        if (badge.stageProgress.length > 1 && stageCompleted > 0) {
          badgeName.textContent += ` ${decimalToRoman(Math.min(badge.stageProgress.length, stageCompleted + 1))} / ${decimalToRoman(badge.stageProgress.length)}`;
        }

        badgeInfos.appendChild(badgeName);

        let badgeObtained = document.createElement("span");
        badgeObtained.id = `badge_${key}_${badge_former_name}_obtained`;
        badgeObtained.style.fontWeight = "bold";
        badgeObtained.textContent =
          stageCompleted === 0
            ? `0/${formatInt(badge.stageProgress[0].progress.obtainable)}`
            : `${formatInt(badge.stageProgress[Math.min(badge.stageProgress.length - 1, stageCompleted)].progress.obtained)} / ${formatInt(badge.stageProgress[Math.min(badge.stageProgress.length - 1, stageCompleted)].progress.obtainable)}`;

        if (stageCompleted === 0) {
          if (badgeInfos.classList.contains("unobtainable")) {
            badgeObtained.classList.add("unobtainable_fail");
            badgeBox.classList.add("unobtainable_fail");
          } else {
            badgeObtained.classList.add("fail");
            badgeBox.classList.add("fail");
          }
        } else if (
          Math.min(badge.stageProgress.length - 1, stageCompleted) ===
          stageCompleted
        ) {
          badgeObtained.classList.add("ongoing");
          badgeBox.classList.add("ongoing");
          badgeObtained.textContent += ` (${percentCompleted}%)`;
        } else if (badgeInfos.classList.contains("unobtainable")) {
          badgeObtained.classList.add("unobtainable_success");
          badgeBox.classList.add("unobtainable_success");
        } else {
          badgeObtained.classList.add("success");
          badgeBox.classList.add("success");
        }

        badgeInfos.appendChild(badgeObtained);

        let badgeProgressBackground = document.createElement("div");
        badgeProgressBackground.id = `badge_${key}_${badge_former_name}_backround_progress_bar`;
        badgeProgressBackground.style.width = "100%";
        badgeProgressBackground.style.height = "10px";
        badgeProgressBackground.style.borderRadius = "10px";
        badgeProgressBackground.style.borderColor = "darkgray";
        badgeProgressBackground.style.borderWidth = "2px";
        badgeProgressBackground.style.borderStyle = "solid";
        badgeProgressBackground.style.backgroundColor = "black";

        let badgeProgress = document.createElement("div");
        badgeProgress.id = `badge_${key}_${badge_former_name}_progress_bar`;
        badgeProgress.style.width = `${percentCompleted}%`;
        badgeProgress.style.backgroundColor = getComputedStyle(
          document.querySelector(`.${badgeBox.classList[0]}`),
        ).color;
        badgeProgress.style.height = "10px";
        badgeProgress.style.borderRadius = "5px";

        badgeProgressBackground.appendChild(badgeProgress);

        badgeInfos.appendChild(badgeProgressBackground);

        badgeBox.appendChild(badgeInfos);

        catDiv.appendChild(badgeBox);
      }

      document.getElementById("badges_to_add").appendChild(catDiv);
    }

    let cosmetics = data.collections.cosmetics;

    let cosmeticOwned = 0;

    for (let cosmetic of cosmetics) {
      cosmeticOwned += cosmetic.owned;
    }

    document.getElementById("cosmetics_progress_bar").style.width =
      `${Math.round((cosmeticOwned / cosmetics.length) * 100 * 100) / 100}%`;

    document.getElementById("cosmetics_progress_text").textContent =
      `${cosmeticOwned} / ${cosmetics.length} (${Math.round((cosmeticOwned / cosmetics.length) * 100 * 100) / 100}%)`;

    for (let category of Object.keys(COSMETIC_CATEGORY)) {
      let catNameH2 = document.createElement("h2");
      catNameH2.id = `cosmetics_${category}`;
      catNameH2.textContent = COSMETIC_CATEGORY[category];

      document.getElementById("cosmetics_to_add").appendChild(catNameH2);

      let cosmeticCount = 0;

      for (let cosmetic of cosmetics) {
        if (
          ![
            "Blossom Wisp Helmet",
            "Forest Spirit Bulb",
            "Noxstache",
            "Floral Staff",
            "Forest Spirit Friend",
            "Hand Fan (Blossom Wisp)",
            "Blossom Wisp Jar",
            "Forest Spirit Wings",
            "Blossom Blade",
            "Mechanical Axe",
          ].includes(cosmetic.cosmetic.name)
        )
          cosmeticCount += cosmetic.cosmetic.category === category;
      }

      let catDiv = document.createElement("div");
      catDiv.id = `cosmetics_${category}_div`;
      catDiv.style.display = "grid";
      catDiv.style.gridTemplateColumns = `repeat(${Math.min(4, cosmeticCount)}, 1fr)`;
      catDiv.style.gap = "10px";
      catDiv.style.gridAutoRows = "minmax(50px, auto)";

      for (let cosmetic of cosmetics) {
        if (
          ![
            "Blossom Wisp Helmet",
            "Forest Spirit Bulb",
            "Noxstache",
            "Floral Staff",
            "Forest Spirit Friend",
            "Hand Fan (Blossom Wisp)",
            "Blossom Wisp Jar",
            "Forest Spirit Wings",
            "Blossom Blade",
            "Mechanical Axe",
          ].includes(cosmetic.cosmetic.name)
        ) {
          if (category === cosmetic.cosmetic.category) {
            let cosmetic_former_name = cosmetic.cosmetic.name.replaceAll(
              " ",
              "_",
            );
            let cosmetic_former_collection = cosmetic.cosmetic.collection
              .replaceAll(" ", "_")
              .toLowerCase();
            let cosmetic_former_category = cosmetic.cosmetic.category
              .replaceAll(" ", "_")
              .toLowerCase();

            let cosmeticBox = document.createElement("div");
            cosmeticBox.id = `badge_${category}_${cosmetic_former_name}`;
            cosmeticBox.style.display = "flex";
            cosmeticBox.style.flexDirection = "row";
            cosmeticBox.style.alignItems = "center";
            cosmeticBox.style.borderColor = RARITY[cosmetic.cosmetic.rarity];
            cosmeticBox.style.borderRadius = "10px";
            cosmeticBox.style.borderStyle = "solid";
            cosmeticBox.style.padding = "10px";

            let cosmeticImage = document.createElement("img");
            cosmeticImage.src = `https://islandcdn.themysterys.com/cosmetics/${cosmetic_former_category}/${cosmetic_former_collection}/${cosmetic_former_name}.png`;
            cosmeticImage.id = `badge_${category}_${cosmetic_former_name}_img`;
            cosmeticImage.alt = `TheFox580's ${cosmetic.cosmetic.name}`;
            cosmeticImage.style = "width: 3em; height: 3em;";
            if (!cosmetic.owned) {
              cosmeticImage.classList.add("grayscale");
            }

            cosmeticBox.appendChild(cosmeticImage);

            let cosmeticInfos = document.createElement("div");
            cosmeticInfos.id = `cosmetic_${category}_${cosmetic_former_name}_infos`;
            cosmeticInfos.style.display = "flex";
            cosmeticInfos.style.flexDirection = "column";
            cosmeticInfos.style.marginLeft = "10px";
            cosmeticInfos.style.justifyContent = "center";

            let cosmeticName = document.createElement("span");
            cosmeticName.id = `cosmetic_${category}_${cosmetic_former_name}_name`;
            cosmeticName.style.fontWeight = "bold";
            cosmeticName.style.color = "white";
            cosmeticName.textContent = cosmetic.cosmetic.name;

            cosmeticInfos.appendChild(cosmeticName);

            let cosmeticObtained = document.createElement("img");
            cosmeticObtained.id = `cosmetic_${category}_${cosmetic_former_name}_rarity`;
            cosmeticObtained.src = `https://islandcdn.themysterys.com/icons/rarity/${cosmetic.cosmetic.rarity.toLowerCase()}.png`;
            cosmeticObtained.alt = `Rarity: ${cosmetic.cosmetic.rarity}`;
            cosmeticObtained.style = getRarityFormatting(
              cosmetic.cosmetic.rarity,
            );

            cosmeticInfos.appendChild(cosmeticObtained);

            cosmeticBox.appendChild(cosmeticInfos);

            catDiv.appendChild(cosmeticBox);
          }

          document.getElementById("cosmetics_to_add").appendChild(catDiv);
        }
      }
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    getData();
  },
  false,
);
