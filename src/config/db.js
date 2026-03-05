import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      // use in-memory mongodb for tests
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
    } else {
      await mongoose.connect(process.env.MONGO_URI);
    }

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error("Error closing database", error);
  }
};

export { connectDB, closeDB };
