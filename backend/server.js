import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import usersRoutes from "./routes/users.js";

import { connectToDB } from "./db.js";

const app = express();

app.use(cors({
   origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://www.title-io.xyz",
   ],
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
   res.status(200).json("hello");
});

async function startServer() {
   try {
      await connectToDB();
      console.log("DB should be connected before server start");
      app.listen(PORT, () => {
         console.log("Server running on port", PORT);
      });
   } catch (err) {
      console.error("Failed to connect to DB", err);
      process.exit(1);
   }
}

startServer();
