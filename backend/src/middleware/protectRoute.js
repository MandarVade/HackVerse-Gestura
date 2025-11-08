export const protectRoute = (req, res, next) => {
  console.log("🔍 req.auth from Clerk:", req.auth());
  if (!req.auth().isAuthenticated) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }

  next();
};
