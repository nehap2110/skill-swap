const User = require("../models/User");

// 🔹 GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    // ✅ Pagination (important)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
      .select("-password") // ❌ hide password
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔹 GET PROFILE (LOGGED-IN USER)
exports.getProfile = async (req, res) => {
  try {
    // ✅ Check if user exists
    console.log("User ID from token:", req.user.id);
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};