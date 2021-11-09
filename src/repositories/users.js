const User = require('../models/user');
const mongoose = require('mongoose');


export default {
  // CREATE
  store: async (data) => {
    const addUser = new User(data);
    const user = await addUser.save();
    return user;
  },

  findByEmail: async (email) => {
    const user = await User.findOne({ email: email });
    return user;
  },

  //리스트 조회 + 검색
  all : async (params) => {
    let where = {};
    if (params.search != undefined) {
      where.email = new RegExp(params.email, 'i');
    }
    const boards = await User.find(where)
      .skip(Number(params.offset))
      .limit(Number(params.limit));
    return boards;
  },

  findById: async (_id) => {
    const user = await User.findOne({ _id: new mongoose.mongo.ObjectId(_id) });
    return user;
  },

  // UPDATE
  update : async (_id, params) => {
    const user = await User.findByIdAndUpdate(_id, params);
    return user;
  },

  // DELETE
   deleteUser : async (_id) => {
    const result = await User.remove({ _id: _id });
    return result;
  }

};
