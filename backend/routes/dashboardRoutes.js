import express from "express";
import { protect } from "../middleware/protect.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/user-dashboard", protect, (req, res) => {
  res.json({ msg: "Welcome User Dashboard" });
});

router.get("/admin-dashboard", protect, adminOnly, (req, res) => {
  res.json({ msg: "Welcome Admin Dashboard" });
});

export default router;
