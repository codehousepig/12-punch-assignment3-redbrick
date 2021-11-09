import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    publish_id: {
        type: Schema.Types.ObjectId, ref: "Publish"
    },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;