import mongoose from "mongoose";

const dailyProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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

    date: {
      type: Date,
      required: true,
      default: Date.now
    },

    tasksCompleted: {
      type: String,
      required: true,
      trim: true
    },

    hoursWorked: {
      type: Number,
      required: true,
      min: 0
    },

    blockers: {
      type: String,
      trim: true
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

dailyProgressSchema.index({ userId: 1, bootcampId: 1, date: -1 });

const DailyProgress = mongoose.model("DailyProgress", dailyProgressSchema);

export default DailyProgress;

