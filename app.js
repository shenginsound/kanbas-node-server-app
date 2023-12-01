// const express = require('express')
import express from 'express';
import Hello from './hello.js';
import Lab5 from "./Lab5.js"; // modify it to from ./lab5.js
import cors from "cors";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
app.use(cors(
    {credentials: true,
   origin: "http://localhost:3000",}
));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  app.use(
    session(sessionOptions)
  );
  
app.use(express.json());
UserRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);

Hello(app);
app.listen(process.env.PORT || 4000);