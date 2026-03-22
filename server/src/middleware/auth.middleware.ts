import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/AppConfiguration";
import { googleClient } from "../config/googleClient.js";
import { UserModel } from "../model/userModel.js";

export const authMiddleware = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 🟢 Try JWT first
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      req.userId = decoded.id;
      return next();
    } catch (err) {
      // 🔵 If JWT fails → try Google token
    }

    // 🔵 Google token verification
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    // Find or create user
    let user = await UserModel.findOne({
      $or: [
        { googleId: payload.sub },
        { username: payload.email },
      ],
    });

    if (!user) {
      user = await UserModel.create({
        username: payload.email,
        googleId: payload.sub,
      });
    }

    req.userId = user._id;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};