import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

export const connectToDB = async () => {
   try {
      await client.connect();
      console.log("MongoClient connected");
      db = client.db("titleiodb");
      console.log("DB instance assigned");
      console.log("✅ Connected to MongoDB");
   } catch (err) {
      console.error("❌ MongoDB connection error:", err);
   }
};

export function getDB() {
   if (!db) {
      console.error("getDB called but DB is not connected yet");
      throw new Error("DB not connected");
   }
   return db;
}
