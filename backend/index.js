// server.js
import express from "express";
import { connectDb } from "./db/db.js";
import session from "express-session";
import passport from 'passport'

import dotenv from "dotenv";
import  './config/passport.js';
import authRoutes  from './routes/auth.route.js'
import cors from 'cors';

dotenv.config();


const app = express();
connectDb();



app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in prod
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());


/* Routes */
app.use("/auth", authRoutes);

/* DB */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
