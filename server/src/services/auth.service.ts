import Jwt from "jsonwebtoken";
import { googleClient } from "../config/googleClient.js";
import { UserModel } from "../model/userModel.js";
import { random } from "../utils.js";
import { JWT_SECRET } from "../config/AppConfiguration.js";

export const googleAuthService = async (token: string) => {
  //log
  console
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  let user = await UserModel.findOne({
    googleId: payload.sub,
  });

  if (!user) {
    user = await UserModel.create({
      username: payload.email,
      googleId: payload.sub,
      password: random(10),
    });
  }

  const jwtToken = Jwt.sign(
    { id: user._id },
    JWT_SECRET
  );

  return jwtToken;
};
