import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./router";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_PROD || "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080/");
});

const mongoURI = process.env.MONGODB_URI_CONNECTION_STRING;

mongoose.Promise = Promise;
mongoose.connect(mongoURI);
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
});

app.use("/api", router);
