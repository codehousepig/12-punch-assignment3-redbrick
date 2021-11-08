"use strict";

module.exports = (sequelize, DataTypes) => {
  const GameDevelopment = sequelize.define(
    "GameDevelopment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
      },
      userId: { type: DataTypes.INTEGER, field: "user_id" },     
      name: { type: DataTypes.STRING }, 
      code: { type: DataTypes.STRING },
      published: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      tableName: "gameDevelopment",
      modelName: "GameDevelopment",
    }
  );

  GameDevelopment.associate = function (models) {
    // associations
    
    GameDevelopment.hasOne(models.Publish, {
      as: "publish",
      foreignKey: "gameDevelopmentId",
      sourceKey: "id",
    });
    GameDevelopment.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
      targetKey: "id",
    });
  };

  return GameDevelopment;
};
