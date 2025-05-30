import jwt from "jsonwebtoken";

export const tokenGenertion = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    sameSite: "None",
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
