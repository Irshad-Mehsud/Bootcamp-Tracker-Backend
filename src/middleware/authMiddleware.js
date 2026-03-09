
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../constants.js";

export const verifyJWT = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    });
  }

  try {

    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};