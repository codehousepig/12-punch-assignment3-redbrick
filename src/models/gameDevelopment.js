import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameDevSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  published: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = GameDevelopment;
