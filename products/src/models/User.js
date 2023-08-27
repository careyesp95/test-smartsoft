const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    money:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    purchases:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
    exp: DataTypes.DATE,
    activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },);
};
