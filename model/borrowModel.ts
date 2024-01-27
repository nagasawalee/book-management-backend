import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  borrowBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  borrowUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "on",
  },
  borrowAt: {
    type: Number,
  },
  backAt: {
    type: Number,
  },
  createDAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

export default borrowSchema;