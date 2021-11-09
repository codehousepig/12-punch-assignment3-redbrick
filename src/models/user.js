import mongoose from "mongoose";

// 회원
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
