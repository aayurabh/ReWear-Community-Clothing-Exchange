const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/auth");
const upload = require("../middleware/upload");
const Item = require("../models/Item");
const User = require("../models/User");

// Get all items
router.get("/", async (req, res) => {
  try {
    const { category, search, available } = req.query;
    let query = {};

    if (category) query.category = category;
    if (available !== undefined) query.isAvailable = available === "true";
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const items = await Item.find(query)
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// Get single item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "username email points"
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item" });
  }
});

// Create new item (with image upload)
router.post(
  "/",
  [
    authMiddleware,
    upload.array("images", 5), // Max 5 images
    body("title").notEmpty().trim(),
    body("description").notEmpty().trim(),
    body("category").isIn([
      "men-wear",
      "women-wear",
      "kids-wear",
      "accessories",
    ]),
    body("size").notEmpty(),
    body("condition").isIn(["new", "like-new", "good", "fair"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, category, size, condition, tags } = req.body;

      // Get uploaded image paths
      const images = req.files
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

      const item = new Item({
        user: req.user.id,
        title,
        description,
        category,
        size,
        condition,
        images,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      });

      await item.save();
      await item.populate("user", "username email");

      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating item" });
    }
  }
);

// Update item
router.put(
  "/:id",
  [
    authMiddleware,
    body("title").optional().trim(),
    body("description").optional().trim(),
    body("isAvailable").optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Check ownership
      if (item.user.toString() !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      Object.assign(item, req.body);
      await item.save();

      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error updating item" });
    }
  }
);

// Delete item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check ownership
    if (item.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
