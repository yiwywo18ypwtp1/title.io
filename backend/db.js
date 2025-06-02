import {MongoClient} from "mongodb";

const uri = "mongodb+srv://ashashasadafda:y13rg9c0@daipivchikbot.dnlfrzo.mongodb.net/?retryWrites=true&w=majority&appName=DaiPivchikBot"; // или твой Mongo Atlas URI
const client = new MongoClient(uri);

let db;

export const connectToDB = async () => {
   try {
      await client.connect();
      db = client.db("titleiodb");
      console.log("✅ Connected to MongoDB");
   } catch (err) {
      console.error("❌ MongoDB connection error:", err);
   }
};

export function getDB() {
   if (!db) {
      throw new Error("DB not connected");
   }
   return db;
}
