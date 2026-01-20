const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user.model");

const protect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token etibarsızdır" });
    }
  } else {
    res.status(401).json({ message: "Token tapılmadı" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin icazəsi lazımdır!" });
  }
};

module.exports = { protect, isAdmin };