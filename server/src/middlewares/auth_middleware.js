const jwt = require("jsonwebtoken");

const auth_middleware = (
  req,
  res,
  next
) => {
  try {
    const auth_header =
      req.headers.authorization;

    if (
      !auth_header ||
      !auth_header.startsWith("Bearer")
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token =
      auth_header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth_middleware;