const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getUsers, getProfile } = require("../controllers/userController");

router.get("/", getUsers);
router.get("/me", auth, getProfile);

module.exports = router;