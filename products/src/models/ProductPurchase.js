const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product_purchase', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    purchaseDate:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    products:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull:false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};