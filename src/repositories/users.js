import models from "../models";
const sequelize = require("sequelize");
const Op = sequelize.Op;

export default {
  // CREATE
  store: async (data) => await models.User.create(data),

  // 리스트조회
  all: async (
    e 
  ) =>
    await models.User.findAll({
      order: [["id", "DESC"]],
      limit: 10,
      offset: 10 * (Number(e.page) - 1)     
    }),


  //리스트조회 + 갯수 반환
  findAndCountAll: async (
    e //페이징
  ) =>
    await models.User.findAndCountAll({
      order: [["id", "DESC"]],
      limit: 10,
      offset: 10 * (Number(e.page) - 1),
      where: {
        level: e.level,
      },
    }),

  //리스트+아이템갯수+검색
  findAndCountAllWithSearchWord: async (e) =>
    await models.User.findAndCountAll({
      order: [["id", "DESC"]],
      limit: 10,
      offset: 10 * (Number(e.page) - 1),
      where: {
          name: {
            [Op.like]: "%" + e.searchWord + "%",
          },
      },
    }),

  findByEmail: async (email) => {
    return await models.User.findOne({
      where: {
        email: email,
      },
    });
  },

  findById: async (id) => await models.User.findByPk(id),


  // UPDATE
  update: async (id, param) => {
    return await models.User.update(param, {
      where: {
        id: id,
      },
    });
  },

};
