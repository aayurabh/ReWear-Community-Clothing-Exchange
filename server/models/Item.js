const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["men-wear", "women-wear", "kids-wear", "accessories"],
  },
  size: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ["new", "like-new", "good", "fair"],
  },
  images: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
