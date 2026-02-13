import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);


app.listen(4000, () => {
  console.log("Server running on port 4000");
});
