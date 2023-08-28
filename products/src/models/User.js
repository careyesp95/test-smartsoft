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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
  },);
};
