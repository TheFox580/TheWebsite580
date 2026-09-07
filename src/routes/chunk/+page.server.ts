import type { PageServerLoad } from "./$types";
import type { MinedData } from "$lib/interfaces/chunk/MinedData";
import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DB_URL, ALLOWED_EDIT_SCHEDULE } from "$env/static/private";

export const load: PageServerLoad = async ({ params, locals }) => {
    const mined_data = [];

    let client = new MongoClient(MONGO_DB_URL, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        },
    });

    try {
        await client.connect();

        const db = client.db("minecraft");

        const mined_collection = db.collection<MinedData>("MiningChunk");

        const mined_db = mined_collection.find({}).sort({time: 1});

        for await (const mined of mined_db) {
            mined_data.push((({ _id, ...object }) => object)(mined))
        }

    } finally {
        await client.close();
    }

    return {
        mined_data
    };
};
