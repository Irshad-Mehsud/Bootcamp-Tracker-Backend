import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    description: {
      type: String,
      trim: true
    },

    bootcampId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

domainSchema.index({ bootcampId: 1, name: 1 });

const Domain = mongoose.model("Domain", domainSchema);

export default Domain;

