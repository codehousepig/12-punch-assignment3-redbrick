import bcrypt from "bcrypt";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
      },
      email: { type: DataTypes.STRING }, 
      password: { type: DataTypes.STRING }
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );

  User.associate = function (models) {
    // associations
    User.hasMany(models.GameDevelopment, {
      as: "gameDevelopment",
      foreignKey: "userId",
      sourceKey: "id",
    });
    User.hasMany(models.Like, {
      as: "like",
      foreignKey: "userId",
      sourceKey: "id",
    });
  };


  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.toWeb = function () {
    const values = Object.assign({}, this)
    delete values.password
    return values
  }

  return User;
};
