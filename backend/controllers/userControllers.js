import User from "../models/User.js";
import Story from "../models/Story.js";



export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stories = await Story.find({
      createdBy: req.params.id,
      isApproved: true,
      isDeleted: false,
    })
    .populate("createdBy", "name")
  .sort({ createdAt: -1 });

    const totalLikes = stories.reduce(
      (sum, story) => sum + story.likes.length,
      0
    );

    res.json({
      user,
      stories,
      totalLikes,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch profile" });
  }
};
