'use strict';
module.exports = (sequelize, DataTypes) => {
  const refrigerators = sequelize.define('refrigerators', {
    refrigeratorIdx : {
      allowNull : false,
      autoIncrement :  true,
      primaryKey : true,
      type :DataTypes.INTEGER
    },
  }, {});
  refrigerators.associate = function(models) {
    refrigerators.belongsToMany(models.users, {
      through : "users_refrigerators",
      foreignKey : "fk_refrigeratorIdx",
      onDelete : "cascade"
    })
  };
  return refrigerators;
};