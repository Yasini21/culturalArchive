import express from "express";
import Story from "../models/Story.js";
import {
  getStories,
  addStory,
  toggleLikeStory,
  getFilteredStories,
  getTimelineStories,
  getFeaturedStory,
  getMyStories,
  updateStory
} from "../controllers/storyControllers.js";

import { protect } from "../middleware/protect.js";
import { adminOnly } from "../middleware/adminOnly.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ============================= */
/* PUBLIC ROUTES */
/* ============================= */

router.get("/", getStories);
router.get("/filter", getFilteredStories);
router.get("/timeline", getTimelineStories);
router.get("/featured", getFeaturedStory);

/* ============================= */
/* USER ROUTES */
/* ============================= */

router.post("/", protect, upload.single("image"), addStory);
router.get("/mystories", protect, getMyStories);

/* ============================= */
/* ADMIN ROUTES */
/* ============================= */

/* 🔥 MUST COME BEFORE /:id */
router.get("/pending", protect, adminOnly, async (req, res) => {
  try {
    const stories = await Story.find({
      isApproved: false,
      isDeleted: false,
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch pending stories" });
  }
});

router.put("/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, {
      isApproved: true,
       isEditRequest: false, 
    });

    res.json({ msg: "Story approved" });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed" });
  }
});

router.put("/:id/reject", protect, adminOnly, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: "Story not found" });
    }

    story.isApproved = false;
    story.isDeleted = true;
    await story.save();

    res.json({ msg: "Story rejected successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Reject failed" });
  }
});

/* ============================= */
/* OTHER ROUTES */
/* ============================= */

router.put("/like/:id", protect, toggleLikeStory);

/* 🔥 GET SINGLE STORY (AFTER ADMIN ROUTES) */
router.get("/:id", protect, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: "Story not found" });
    }

    if (
      story.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(story);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch story" });
  }
});

/* 🔥 UPDATE STORY (MUST BE LAST DYNAMIC ROUTE) */
router.put("/:id", protect, updateStory);

/* DELETE */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: "Story not found" });
    }

    story.isDeleted = true;
    await story.save();

    res.json({ msg: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});

export default router;
