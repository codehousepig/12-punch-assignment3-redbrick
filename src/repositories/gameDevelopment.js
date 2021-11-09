const GameDevelopment = require('../models/gameDevelopment');
const mongoose = require('mongoose');

export default {
  // CREATE
  // 개발중인 게임을 저장하면 생성
  // name property가 unique이므로 중복 생성 불가
  // 이미 생성된 게임을 저장하면 update
  create: async (data) => {
    const addGameDev = new GameDevelopment(data);
    const newGameDev = await addGameDev.save();
    return newGameDev;
  },

  // READ
  // 유저 자신의 개발중인 게임을 이름으로 검색
  findAll: async (params) => {
    const where = {};
    if (params.search != undefined) {
      where.name = new RegExp(params.name, 'i');
    }

    const gameDev = await GameDevelopment.find(where)
      .skip(Number(params.offset))
      .limit(Number(params.limit));
    return gameDev;
  },

  // UPDATE
  update: async (_id, params) => {
    const gameDev = await GameDevelopment.findByIdAndUpdate(_id, params);
    return gameDev;
  },

  // DELETE
  hardDelete: async (id) => {
    const result = await GameDevelopment.remove({ _id: id });
    return result;
  },
};
