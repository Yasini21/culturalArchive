import Story from "../models/Story.js";
import cloudinary from "../config/cloudinary.js";

/* GET PUBLIC STORIES (Explore Page) */

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find({
      isApproved: true,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name"); // 🔥 only name

    res.json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stories" });
  }
};

/* ADD STORY (Goes to Admin Approval) */

export const addStory = async (req, res) => {
  try {
    const { title, region, description, category, era } = req.body;

    if (!title || !region || !description) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "cultural_archive/stories" }
      );
      imageUrl = result.secure_url;
    }

    const story = await Story.create({
      title,
      region,
      description,
      category,
      era,
      image: imageUrl,
      createdBy: req.user.id,
      isApproved: false,
      isDeleted: false,
      isEditRequest: false,
    });

    res.status(201).json({
      msg: "Story submitted for admin approval",
      story,
    });
  } catch (error) {
    console.error("ADD STORY ERROR:", error);
    res.status(500).json({ msg: "Failed to add story" });
  }
};

/* UPDATE STORY (Edit -> Reapproval) */

export const updateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: "Story not found" });
    }

    if (story.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const { title, description, region, category, era } = req.body;

    story.title = title || story.title;
    story.description = description || story.description;
    story.region = region || story.region;
    story.category = category || story.category;
    story.era = era || story.era;

    // 🔥 Send back to admin
    story.isApproved = false;
    story.isEditRequest = true;
    story.isDeleted = false;

    await story.save();

    res.json({ msg: "Story updated and sent for re-approval" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server crashed" });
  }
};

/* LIKE / UNLIKE */

export const toggleLikeStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = story.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      story.likes = story.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      story.likes.push(userId);
    }

    await story.save();

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error toggling like" });
  }
};

/* FILTER STORIES */

export const getFilteredStories = async (req, res) => {
  try {
    const { region, category } = req.query;

    let filter = {
      isApproved: true,
      isDeleted: false,
    };

    if (region) filter.region = region;
    if (category) filter.category = category;

    const stories = await Story.find(filter)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/* MY STORIES */

export const getMyStories = async (req, res) => {
  try {
    const stories = await Story.find({
      createdBy: req.user.id,
      isDeleted: false,
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch your stories" });
  }
};

/* TIMELINE */

export const getTimelineStories = async (req, res) => {
  try {
    const stories = await Story.find({
      isApproved: true,
      isDeleted: false,
    }).sort({ era: 1 });

    res.json(stories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/* FEATURED */

export const getFeaturedStory = async (req, res) => {
  try {
    const story = await Story.findOne({
      isFeatured: true,
      isApproved: true,
      isDeleted: false,
    }).populate("createdBy", "name");

    res.json(story);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
