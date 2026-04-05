const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // ✅ Get token from header (Bearer token)
    const authHeader = req.headers.authorization;
    console.log("authheader",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token using env secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user data to request
    req.user = decoded;

    next();

  } catch (error) {
    console.error(error);

    // ✅ Handle different errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }

    return res.status(401).json({ msg: "Invalid token" });
  }
};