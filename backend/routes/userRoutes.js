import express from "express";
import { getUserProfile } from "../controllers/userControllers.js";


const router = express.Router();

// 👤 Public contributor profile
router.get("/:id/profile", getUserProfile);

export default router;
