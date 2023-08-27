const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    purchaseDate:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};