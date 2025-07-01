function isAdmin(req, res, next) {
  const user = req.user;

  if (user && user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ error: "Access denied: Admin only" });
  }
}

module.exports = isAdmin;