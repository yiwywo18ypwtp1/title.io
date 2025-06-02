import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import usersRoutes from "./routes/users.js";

import {connectToDB} from "./db.js";

const app = express();

app.use(cors({
   origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
   ],
   credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", usersRoutes);

app.get("/api/hello", (req, res) => {
   res.status(200).json("hello");
})

connectToDB()
   .then(() => {
      app.listen(3001, () => {
         console.log("Server is running on http://localhost:3001");
      });
   })
   .catch((err) => {
      console.error("Failed to connect to DB", err);
      process.exit(1);
   });
