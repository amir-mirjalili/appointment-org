import mongoose from "mongoose";

require("dotenv").config();

export const Database = mongoose.createConnection(
  process.env.DATABASE_URL || "",
);
