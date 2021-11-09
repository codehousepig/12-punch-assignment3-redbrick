import models from "../models";
import sequelize from "sequelize";
const Op = sequelize.Op;

export default {
  // CREATE
  store: async (data) => await models.User.create(data),

  // 리스트조회 + 검색
  all: async (
    search 
  ) =>{
    let where = {};
    if(search) where.email = {
      [Op.like]: "%" + search + "%",
    }
    return await models.User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
      where: where                  
    })  
  },


  //리스트조회 + 페이징 + total반환
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

  //리스트조회 + 페이징 + total반환 + 검색
  findAndCountAllWithSearchWord: async (e) =>
    await models.User.findAndCountAll({
      order: [["id", "DESC"]],
      limit: 10,
      offset: 10 * (Number(e.page) - 1),
      where: {
          email: {
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
