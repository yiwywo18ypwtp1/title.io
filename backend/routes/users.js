import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import express from "express";
import { getDB } from "../db.js";
console.log("getDB on module load:", getDB);

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
console.log("users.js module loaded, JWT_SECRET =", process.env.JWT_SECRET);

function authenticateToken(req, res, next) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      return res.status(401).json({ error: "No token provided" });
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
   }
}


router.get("/all", async (req, res) => {
   try {
      const db = getDB();
      const users = await db.collection("titleio_users").find().toArray();
      res.json(users);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
   }
});


router.get("/me", authenticateToken, async (req, res) => {
   try {
      const db = getDB();
      const user = await db
         .collection("titleio_users")
         .findOne({ _id: new ObjectId(req.user.userId) });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({ username: user.username, email: user.email });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
   }
});


router.post("/signup", async (req, res) => {
   try {
      const db = await getDB();
      const { username, email, password } = req.body;

      const existingUser = await db.collection("titleio_users").findOne({ username });
      if (existingUser) {
         return res.status(409).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.collection("titleio_users").insertOne({
         username,
         email,
         password: hashedPassword,
      });

      res.status(201).json({ message: "User registered", id: result.insertedId });
   } catch (err) {
      res.status(500).json({ error: "Failed to insert user" });
   }
});


router.post("/login", async (req, res) => {
   console.log(JWT_SECRET);
   try {
      const db = await getDB();
      const { username, password } = req.body;

      const user = await db.collection("titleio_users").findOne({ username });
      if (!user) {
         return res.status(404).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, message: "Logged in" });

   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert user" });
   }
});

export default router;
