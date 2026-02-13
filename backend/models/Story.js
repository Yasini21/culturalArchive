import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isEditRequest: {
  type: Boolean,
  default: false
},
originalStory: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Story",
  default: null
},

    image: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    era: {
  type: String,
  enum: ["Ancient", "Colonial", "Modern"],
},

year: {
  type: Number,
},

region: {
  type: String,
},

category: {
  type: String,
  enum: ["Ritual", "Festival", "Food", "Language", "Oral History", "Dress"],
},

isFeatured: {
  type: Boolean,
  default: false,
},
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    categories: [
  {
    type: String,
    enum: [
      "Ritual",
      "Festival",
      "Food",
      "Language",
      "Oral History",
      "Dress",
      "Belief",
      "Custom"
    ],
  },
],

  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
