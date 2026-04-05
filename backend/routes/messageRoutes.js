const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/", auth, sendMessage);
router.get("/:id", auth, getMessages);

module.exports = router;