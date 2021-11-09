

module.exports = (sequelize, DataTypes) => {
  const Publish = sequelize.define(
    "Publish",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
      },
      // userId: { type: DataTypes.INTEGER, field: "user_id" }, 
      gameDevelopmentId: { type: DataTypes.INTEGER.UNSIGNED, field: "gameDevelopment_id" }, 
      name: { type: DataTypes.STRING }, 
      code: { type: DataTypes.STRING },      
      view: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "publish",
      modelName: "Publish",
    }
  );

  Publish.associate = function (models) {
    // associations
    // Publish.belongsTo(models.User, {
    //   as: "user",
    //   foreignKey: "userId",
    //   targetKey: "id",
    // });
    Publish.hasMany(models.Like, {
      as: "like",
      foreignKey: "publishId",
      sourceKey: "id",
    });
    Publish.belongsTo(models.GameDevelopment, {
      as: "gameDevelopment",
      foreignKey: "gameDevelopmentId",
      targetKey: "id",
    });
  };

  return Publish;
};
