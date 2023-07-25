// Objetivo: Crear el modelo de la tabla Pokemon en la base de datos

const { DataTypes } = require('sequelize');

// defino el modelo de la tabla Pokemon
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemons', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attack: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  created: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  }, {timestamps: false});
};
