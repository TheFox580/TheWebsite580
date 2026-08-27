import { NOXCREW_API } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const user = params.user;

  const response = await fetch(`https://api.mccisland.net/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": NOXCREW_API,
    },
    body: JSON.stringify({
      query: `{
                playerByUsername(username:"${user}") {
                    uuid
                    username
                    ranks
                    mccPlusStatus {
                        totalDays
                    }
                    crownLevel {
                        levelData {
                            level
                            nextLevelProgress {
                                obtained
                                obtainable
                            }
                        }
                        styleLevelData {
                            level
                            nextLevelProgress {
                                obtained
                                obtainable
                            }
                        }
                        fishingLevelData {
                            level
                            nextLevelProgress {
                                obtained
                                obtainable
                            }
                        }
                        overall_trophies: trophies {
                            obtained
                            obtainable
                            bonus
                        }
                        style_trophies: trophies(category: STYLE) {
                            obtained
                            obtainable
                            bonus
                        }
                        skill_trophies: trophies(category: SKILL) {
                            obtained
                            obtainable
                            bonus
                        }
                        angler_trophies: trophies(category: ANGLER) {
                            obtained
                            obtainable
                            bonus
                        }
                    }
                    status {
                        online
                    }
                    collections {
                        currency {
                            coins
                            royalReputation
                            anglrTokens
                        }
                        equippedCosmetics {
                            name
                            category
                            collection
                            rarity
                            type
                        }
                        cosmetics {
                            cosmetic {
                                name
                                description
                                category
                                collection
                                rarity
                                colorable
                                trophies
                                isBonusTrophies
                                canBeDonated
                                royalReputation {
                                    donationLimit
                                    reputationAmount
                                }
                                obtainmentHint
                                type
                                globalNumberOwned
                            }
                            owned
                            chromaPacks
                            donationsMade
                            weaponSkinData {
                                tier
                                kills
                                chromaSet
                                eliminationEffect
                            }
                        }
                        fish {
                            fish {
                                name
                                climate
                                collection
                                rarity
                                catchTime
                                elusive
                                average_trophies: trophies(weight: AVERAGE)
                                lagre_trophies: trophies(weight: LARGE)
                                massive_trophies: trophies(weight: MASSIVE)
                                colossal_trophies: trophies(weight: COLOSSAL)
                                gargantuan_trophies: trophies(weight: GARGANTUAN)
                                average_sellingPrice: sellingPrice(weight: AVERAGE)
                                lagre_sellingPrice: sellingPrice(weight: LARGE)
                                massive_sellingPrice: sellingPrice(weight: MASSIVE)
                                colossal_sellingPrice: sellingPrice(weight: COLOSSAL)
                                gargantuan_sellingPrice: sellingPrice(weight: GARGANTUAN)
                                average_globalNumberCaught: globalNumberCaught(weight: AVERAGE)
                                lagre_globalNumberCaught: globalNumberCaught(weight: LARGE)
                                massive_globalNumberCaught: globalNumberCaught(weight: MASSIVE)
                                colossal_globalNumberCaught: globalNumberCaught(weight: COLOSSAL)
                                gargantuan_globalNumberCaught: globalNumberCaught(weight: GARGANTUAN)
                            }
                            weights {
                                weight
                                firstCaught
                            }
                        }
                    }
                    social {
                        friends {
                            uuid
                            username
                            status {
                                online
                            }
                        }
                        party {
                            active
                            members {
                                uuid
                                username
                            }
                        }
                    }
                    statistics {
                      playtime: rotationValue(statisticKey: "playtime", rotation: LIFETIME)
                      games_played: rotationValue(statisticKey: "games_played", rotation: LIFETIME)
                      sky_battle_playtime: rotationValue(statisticKey: "sky_battle_playtime", rotation: LIFETIME)
                      sky_battle_games_played: rotationValue(statisticKey: "sky_battle_games_played", rotation: LIFETIME)
                      tgttos_playtime: rotationValue(statisticKey: "tgttos_playtime", rotation: LIFETIME)
                      tgttos_games_played: rotationValue(statisticKey: "tgttos_games_played", rotation: LIFETIME)
                      hitw_playtime: rotationValue(statisticKey: "hitw_playtime", rotation: LIFETIME)
                      hitw_games_played: rotationValue(statisticKey: "hitw_games_played", rotation: LIFETIME)
                      battle_box_playtime: rotationValue(statisticKey: "battle_box_playtime", rotation: LIFETIME)
                      battle_box_games_played: rotationValue(statisticKey: "battle_box_games_played", rotation: LIFETIME)
                      battle_box_arena_playtime: rotationValue(statisticKey: "battle_box_arena_playtime", rotation: LIFETIME)
                      battle_box_arena_games_played: rotationValue(statisticKey: "battle_box_arena_games_played", rotation: LIFETIME)
                      dynaball_playtime: rotationValue(statisticKey: "dynaball_playtime", rotation: LIFETIME)
                      dynaball_games_played: rotationValue(statisticKey: "dynaball_games_played", rotation: LIFETIME)
                      rocket_spleef_playtime: rotationValue(statisticKey: "rocket_spleef_playtime", rotation: LIFETIME)
                      rocket_spleef_games_played: rotationValue(statisticKey: "rocket_spleef_games_played", rotation: LIFETIME)
                    }
                    infinibag {
                        asset {
                            name
                            rarity
                        }
                        amount
                    }
                    factions {
                        name
                        selected
                        levelData {
                            level
                            nextLevelProgress {
                                obtained
                                obtainable
                            }
                        }
                        totalExperience
                    }
                    quests {
                        type
                        rarity
                        boost
                        tasks {
                            progress {
                                obtained
                                obtainable
                            }
                        }
                        completed
                    }
                    badges {
                        badge {
                            name
                            stages {
                                stage
                                trophies
                                bonusTrophies
                            }
                        }
                        stageProgress {
                            stage
                            progress {
                                obtained
                                obtainable
                            }
                        }
                    }
                }
            }`,
    }),
  });

  const data = await response.json();

  return { data }.data.data.playerByUsername;
};
