import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000; // PORT to run backend server
export const dbUri = process.env.MONGO_CONNECTION_URL; // MongoDB connection string
