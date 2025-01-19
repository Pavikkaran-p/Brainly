import dotenv from "dotenv";
import { Environment } from "../types/environment";
dotenv.config();

const env: Environment = <any>process.env;

export const port = env.PORT || 3000;
export const MongoUri = env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_KEY || ""