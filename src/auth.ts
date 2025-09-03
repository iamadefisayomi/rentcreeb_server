import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import client from "./lib/mongodb";




export default async function getAuth () {
    await client.connect();
    const db = client.db();


    return betterAuth({
        database: mongodbAdapter(db),
        user: {
            additionalFields: {
            username: { type: "string", required: true, unique: true },
            phone: { type: "string", required: false, defaultValue: '' },
            whatsapp: { type: "string", required: false, defaultValue: '' },
            gender: { type: "string", required: false, defaultValue: "" },
            role: { type: "string", required: true, defaultValue: "" },
            },
        },
        })
}