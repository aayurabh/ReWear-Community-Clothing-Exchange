const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const Swap = require("../models/Swap");
const Item = require("../models/Item");
const User = require("../models/User");

// Create swap request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { itemId, swapType } = req.body;

    const item = await Item.findById(itemId).populate("user");
    if (!item || !item.isAvailable) {
      return res.status(400).json({ message: "Item not available" });
    }

    if (item.user._id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot swap your own item" });
    }

    // Check if user has enough points for point-based swap
    if (swapType === "points") {
      const requester = await User.findById(req.user.id);
      if (requester.points < 50) {
        // Assuming 50 points per item
        return res.status(400).json({ message: "Insufficient points" });
      }
    }

    const swap = new Swap({
      item: itemId,
      requester: req.user.id,
      owner: item.user._id,
      swapType,
      pointsUsed: swapType === "points" ? 50 : 0,
    });

    await swap.save();
    await swap.populate(["item", "requester", "owner"]);

    res.status(201).json(swap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating swap request" });
  }
});

// Get user's swaps
router.get("/my-swaps", authMiddleware, async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user.id }, { owner: req.user.id }],
    })
      .populate("item")
      .populate("requester", "username email")
      .populate("owner", "username email")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching swaps" });
  }
});

// Update swap status
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findById(req.params.id)
      .populate("item")
      .populate("requester")
      .populate("owner");

    if (!swap) {
      return res.status(404).json({ message: "Swap not found" });
    }

    // Only owner can accept/reject
    if (swap.owner._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    swap.status = status;

    if (status === "accepted") {
      // Update item availability
      await Item.findByIdAndUpdate(swap.item._id, { isAvailable: false });

      // Handle points transfer
      if (swap.swapType === "points") {
        await User.findByIdAndUpdate(swap.requester._id, {
          $inc: { points: -swap.pointsUsed },
        });
        await User.findByIdAndUpdate(swap.owner._id, {
          $inc: { points: swap.pointsUsed },
        });
      }

      swap.completedAt = new Date();
    }

    await swap.save();
    res.json(swap);
  } catch (error) {
    res.status(500).json({ message: "Error updating swap" });
  }
});

module.exports = router;
