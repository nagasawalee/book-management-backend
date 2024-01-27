import mongoose from "mongoose";
//create user table
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  nickName: {
    type: String
  },
  password: {
    type: String
  },
  gender: {
    type: String
  },
  role: {
    type: String
  },
  status: {
    type: String
  },
  createAt: {
    type: Number,
    default: Date.now
  },
  updateAt: {
    type: Number,
    default: Date.now
  }
})

export default userSchema