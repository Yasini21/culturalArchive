import Story from "../models/Story.js";
import cloudinary from "../config/cloudinary.js";


/* GET PUBLIC STORIES */
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find({ isApproved: true })
      .sort({ createdAt: -1 });

    res.json(stories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stories" });
  }
};

/* ADD STORY (USER) */
export const addStory = async (req, res) => {
  
  try {
      console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, region, description } = req.body;

    let imageUrl = null;
  

    // if image exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "cultural_archive/stories",
        }
      );

      imageUrl = result.secure_url;
    }

    const story = await Story.create({
      title,
      region,
      description,
      image: imageUrl,
      createdBy: req.user.id,
    });

    res.status(201).json({
      msg: "Story submitted for approval",
      story,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to add story" });
  }
};

