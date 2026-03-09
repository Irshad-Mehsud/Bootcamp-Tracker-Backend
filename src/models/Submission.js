import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    submissionUrl: {
      type: String,
      required: true,
      trim: true
    },

    submissionText: {
      type: String,
      trim: true
    },

    score: {
      type: Number,
      min: 0
    },

    feedback: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["submitted", "graded", "late"],
      default: "submitted"
    },

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    gradedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

submissionSchema.index({ assignmentId: 1, userId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;

