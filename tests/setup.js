import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB, closeDB } from "../src/config/db.js";

// load environment variables (if any)
dotenv.config();



// close db connection after all tests complete
afterAll(async () => {
  await closeDB();
});

export default null;