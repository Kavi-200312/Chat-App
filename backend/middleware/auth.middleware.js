import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const ProtectRoute  = async (req, res, next) => {
  try {
    console.log("ProtectRoute ==========>");
    
    const token = req.cookies.jwt;
    console.log(req.cookies ,"req.cookies---->");
    console.log(token ,"token---->");
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized -No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized -Invaild Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in ProectRoute middleware", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
