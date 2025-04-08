import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { requestLogger } from "./middleware/apiLogger.js";
import { app, server } from "./lib/socket.js";
import path from "path";
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Payload too large" });
  }
  next(err);
});
app.use(requestLogger);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend" ,"dist","index.html"))
  })
}

const port = process.env.PORT;
server.listen(5001, () => {
  console.log(`server running in port ${port}`);
  connectDB();
});
