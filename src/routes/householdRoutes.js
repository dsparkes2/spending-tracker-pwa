const express = require("express");
const router = express.Router();
const controller = require("../controllers/householdController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/setup", authMiddleware, controller.setupPage);
router.get("/new", authMiddleware, controller.newHouseholdPage);
router.post("/new", authMiddleware, controller.createHousehold);
router.get("/join", authMiddleware, controller.joinHouseholdPage);
router.post("/join", authMiddleware, controller.joinHousehold);
module.exports = router;
