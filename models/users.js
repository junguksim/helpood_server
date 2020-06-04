'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userIdx : {
      allowNull : false,
      primaryKey : true,
      autoIncrement :  true,
      type :DataTypes.INTEGER
    },
    userId: DataTypes.STRING,
    userPw: DataTypes.STRING,
    salt : DataTypes.STRING,
  }, {});
  users.associate = function(models) {
    users.belongsToMany(models.refrigerators, {
      through : "users_refrigerators",
      foreignKey : "fk_userIdx",
      onDelete : "cascade"
    })
  };
  return users;
};