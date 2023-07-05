const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemons', {
    id: {
      type: DataTypes.UUID, 
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vida: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ataque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defensa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  velocidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  });
};
