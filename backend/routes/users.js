import express from "express";
import {getDB} from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";


dotenv.config({ path: '../.env' });

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ error: "No token" });
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
      res.status(500).json({error: "Something went wrong"});
   }
});


router.get("/me", authenticateToken, async (req, res) => {
   const db = getDB();
   const user = await db.collection("titleio_users").findOne({_id: new ObjectId(req.user.userId)});
   if (!user) return res.status(404).json({error: "User not found"});
   res.json({username: user.username, email: user.email});
});


router.post("/signup", async (req, res) => {
   try {
      const db = getDB();
      const {username, email, password} = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.collection("titleio_users").insertOne({
         username,
         email,
         password: hashedPassword,
      });

      console.log(`user registered: ${result}`);
      res.status(201).json(result);
   } catch (err) {
      console.error(err);
      res.status(500).json({error: "Failed to insert user"});
   }
});


router.post("/login", async (req, res) => {
   try {
      const db = getDB();
      const {username, password} = req.body;

      const user = await db.collection("titleio_users").findOne({username});
      if (!user) {
         return res.status(404).json({error: "Invalid credentials"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({error: "Invalid credentials"});
      }

      const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1h"});

      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax",
         maxAge: 60 * 60 * 1000,
      });
      console.log(`user logged in: ${user} - ${token}`);

      res.json({message: "Logged in"});

   } catch (err) {
      console.error(err);
      res.status(500).json({error: "Failed to insert user"});
   }
})


router.post("/logout", async (req, res) => {
   res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
   });

   res.json({ message: "Logged out" });
})

export default router;
