import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
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
    },

    dueDate: {
      type: Date,
      required: true
    },

    maxScore: {
      type: Number,
      default: 100
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

assignmentSchema.index({ bootcampId: 1, domainId: 1, dueDate: -1 });

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;

