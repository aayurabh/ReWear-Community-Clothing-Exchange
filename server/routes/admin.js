const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const User = require("../models/User");
const Item = require("../models/Item");
const Swap = require("../models/Swap");

// Admin middleware applied to all routes
router.use(authMiddleware, adminMiddleware);

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get all items (with moderation capabilities)
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// Delete item (admin)
router.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

// Get statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalItems: await Item.countDocuments(),
      availableItems: await Item.countDocuments({ isAvailable: true }),
      totalSwaps: await Swap.countDocuments(),
      completedSwaps: await Swap.countDocuments({ status: "completed" }),
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

module.exports = router;
