'use strict';
module.exports = (sequelize, DataTypes) => {
  const foods = sequelize.define('foods', {
    foodIdx : {
      allowNull : false,
      autoIncrement :  true,
      primaryKey : true,
      type :DataTypes.INTEGER
    },
    foodName: DataTypes.STRING,
    fk_refrigeratorIdx: {
      allowNull : false,
      primaryKey : true,
      type :DataTypes.INTEGER
    },
    purchaseDate: DataTypes.DATE,
    shelfLife: DataTypes.DATE
  }, {});
  foods.associate = function(models) {
    foods.belongsTo(models.refrigerators, {
      foreignKey : "fk_refrigeratorIdx",
      onDelete : "cascade"
    })
  };
  return foods;
};