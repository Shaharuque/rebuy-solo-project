import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// For Socket IO
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
// import routes
import authRoute from "./route/authRoute";
import userRoute from "./route/userRoute"


// Socket IO server connected on 8080 port
const httpServer = createServer();
const socketIO = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

socketIO.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

httpServer.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});

//----------------------------------------//


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yz2oh.mongodb.net/typescript_fullstack?retryWrites=true&w=majority`
    );
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
//error middleware
app.use((err:any, req:any, res:any, next:any) => {
  const errorStatus = err.status || 500;
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: "Something Went Wrong",
    stack: err.stack,
  });
});


app.listen(9000, () => {
  connect();
  console.log("Connected to backend.");
});
