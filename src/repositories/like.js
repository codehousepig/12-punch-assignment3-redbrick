const Like = require('../models/like');
const mongoose = require('mongoose');


export default {
  // CREATE
  store: async (data) => {
    const addLike = new Like(data);
    const like = await addLike.save();
    return like;
  },

  findByParam: async (param) => {
    const like = await Like.findOne({ 
      user_id: new mongoose.mongo.ObjectId(param.user_id) ,
      publish_id: new mongoose.mongo.ObjectId(param.publish_id) 
     });
    return like;
  },

  // DELETE
   deleteLike : async (_id) => {
    const result = await Like.remove({ _id: _id });
    return result;
  }

};
