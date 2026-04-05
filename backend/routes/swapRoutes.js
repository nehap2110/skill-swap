const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createSwap, getSwaps, acceptSwap } = require("../controllers/swapController");

router.post("/", auth, createSwap);
router.get("/", auth, getSwaps);
router.put("/:id/accept", auth, acceptSwap);

module.exports = router;