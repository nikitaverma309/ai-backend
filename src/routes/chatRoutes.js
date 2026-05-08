const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");

// POST /api/chat
router.post("/", sendMessage);

module.exports = router;
