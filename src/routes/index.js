const express = require("express");
const router = express.Router();

// Health route
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Items routes
const itemsController = require("../controllers/itemsController");
router.get("/items", itemsController.getItems);
router.post("/items", itemsController.createItem);

// Registration routes
const registrationRoutes = require("./registrationRoutes");
router.use("/", registrationRoutes);

module.exports = router;
