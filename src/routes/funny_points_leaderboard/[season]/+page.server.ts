import type {
  Point,
  PointDB,
} from "$lib/interfaces/funny_points_leaderboard/Point";
import type {
  SeasonDate,
  SeasonDateDB,
} from "$lib/interfaces/funny_points_leaderboard/Date";
import type { Season } from "$lib/interfaces/funny_points_leaderboard/Season";
import type {
  Score,
  ScoresDB,
} from "$lib/interfaces/funny_points_leaderboard/Score";
import type { PageServerLoad } from "./$types";
import { getSeasons } from "$lib/functions/funny_points_leaderboard/GetSeasons";
import { MONGO_DB_USERNAME, MONGO_DB_PASSWORD } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const seasons: Season[] = getSeasons();

  const looking_for = params.season;
  const season = seasons.find((season) => season.url_name === looking_for);

  if (!season) {
    throw error(404, { message: `${looking_for} does not exist` });
  }

  let points: Point[] = [];
  let players: Score[] = [];
  let date: SeasonDate = {
    season: season.id,
    start_time: new Date("0-0-0T00:00:00Z"),
    end_time: new Date("0-0-0T00:00:00Z"),
  };

  let client = new MongoClient(
    `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@funny-points-leaderboar.pjwbel5.mongodb.net/?appName=funny-points-leaderboard`,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    },
  );

  try {
    await client.connect();

    const db = client.db("seasons");

    const date_collection = db.collection<SeasonDateDB>("Dates");

    const date_result = await date_collection.findOne<SeasonDateDB>({
      season: season.id,
    });

    if (!date_result) {
      console.log("No Season Date found.");
    } else {
      date = (({ _id, ...object }) => object)(date_result);
    }

    const players_collection = db.collection<ScoresDB>("Scores");

    const players_result = await players_collection.findOne<ScoresDB>({
      season: season.id,
    });

    if (!players_result) {
      console.log("No Player Scores found.");
    } else {
      players = (({ _id, ...object }) => object)(players_result).scores.sort(
        (a, b) => b.score - a.score,
      );
    }

    const points_collection = db.collection<PointDB>(season.name);

    const points_result = await points_collection
      .find<PointDB>({})
      .sort({ date: 1 })
      .toArray();

    if (points_result.length === 0) {
      console.log("No points found.");
    } else {
      for (let elm of points_result) {
        let point: Point = (({ _id, ...object }) => object)(elm);
        points.push(point);
      }
    }
  } finally {
    await client.close();
  }
  return { points, date, players };
};
