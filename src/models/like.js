module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
      },
      userId: { type: DataTypes.INTEGER.UNSIGNED, field: "user_id" }, 
      publishId: { type: DataTypes.INTEGER.UNSIGNED, field: "publish_id" }
    },
    {
      sequelize,
      tableName: "like",
      modelName: "Like",
    }
  );

  Like.associate = function (models) {
    // associations
    Like.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
      targetKey: "id",
    });

    Like.belongsTo(models.Publish, {
      as: "publish",
      foreignKey: "publishId",
      targetKey: "id",
    });
  };

  return Like;
};
