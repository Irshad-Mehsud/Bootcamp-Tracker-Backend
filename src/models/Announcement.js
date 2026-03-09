
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    bootcampId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true
    },

    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
);

// Optional: indexes for faster queries
announcementSchema.index({ bootcampId: 1, domainId: 1, createdAt: -1 });

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;