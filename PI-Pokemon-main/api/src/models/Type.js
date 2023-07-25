//Objetivo : Crear el modelo de la tabla Type en la base de datos

const { DataTypes } = require('sequelize');

// defino el modelo de la tabla tipos de pokemon
module.exports = (sequelize) => {
 
  sequelize.define('Types', {
    id: {
        type: DataTypes.UUID, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {timestamps: false});
};