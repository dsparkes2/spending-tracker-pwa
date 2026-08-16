const express = require("express");
const router = express.Router();
const controller = require("../controllers/householdController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/setup", authMiddleware, controller.setupPage);

module.exports = router;
