'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_refrigerators = sequelize.define('users_refrigerators', {
    fk_userIdx: {
      allowNull : false,
      primaryKey : true,
      type :DataTypes.INTEGER
    },
    fk_refrigeratorIdx: {
      allowNull : false,
      primaryKey : true,
      type :DataTypes.INTEGER
    }
  }, {});
  users_refrigerators.associate = function(models) {
    users_refrigerators.belongsTo(models.users, {
      foreignKey : "fk_userIdx",
      onDelete : "cascade"
    })
    users_refrigerators.belongsTo(models.refrigerators, {
      foreignKey : "fk_refrigeratorIdx",
      onDelete : "cascade"
    })
  };
  return users_refrigerators;
};