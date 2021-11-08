import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const { development } = require("../configs/sequelize.js");

const basename = path.basename(__filename);

const models = {};

let sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  development,
  {
    logging: false,
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-9) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
