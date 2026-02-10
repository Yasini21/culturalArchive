import express from "express";
import Story from "../models/Story.js";
import { getStories, addStory } from "../controllers/storyControllers.js";
import { protect } from "../middleware/protect.js";
import { adminOnly } from "../middleware/adminOnly.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 🌍 Public stories
router.get("/", getStories);

// ✍️ Add story (USER + IMAGE UPLOAD)
router.post(
  "/",
  protect,
  upload.single("image"), // ✅ multer runs here
  addStory
);

// 🛡️ Admin - pending stories
router.get("/pending", protect, adminOnly, async (req, res) => {
  try {
    const stories = await Story.find({ isApproved: false })
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch pending stories" });
  }
});

// ✅ Approve story
router.put("/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, {
      isApproved: true,
    });

    res.json({ msg: "Story approved" });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed" });
  }
});

export default router;
