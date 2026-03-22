import { Request, Response } from "express";
import { googleAuthService } from "../services/auth.service.js";
import { UserModel } from "../model/userModel.js";
import Jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/AppConfiguration.js";

export const googleAuthController = async (req: Request, res: Response) => {
    console.log("Google auth controller called v2")
  try {
    const { token } = req.body;

    const jwtToken = await googleAuthService(token);

    res.json({
      status: "success",
      message: "Google sign in successful",
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Google sign in failed",
    });
  }
};

export const signupController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        await UserModel.create({ username, password });

        res.json({
            status: "success",
            message: "User sign up successful"
        });
    } catch (error) {
        res.json({
            status: "error",
            message: "User already exists"
        });
    }
};


export const signinController = async (req: any, res: any) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username, password });

    if (!existingUser) {
        return res.status(403).json({
            message: "Please check credentials"
        });
    }

    const token = Jwt.sign(
        { id: existingUser._id },
        JWT_SECRET
    );

    res.cookie("auth", "true");
    res.cookie("token", token);

    res.json({
        status: "success",
        message: "User sign in successful",
        token
    });
};