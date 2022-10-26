const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {

      ///Actualizacion Angelo
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ///
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:undefined,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      typeUser: {
        type: DataTypes.ENUM('Banned', 'User', 'Admin'),
        defaultValue: 'User',
      },
      verify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lat:{
        type: DataTypes.DOUBLE, 
        defaultValue: -1,
      },
      lng:{
        type: DataTypes.DOUBLE, 
        defaultValue: -1,
      }
    },
    {
      timestamps: false,
    }
  );
};
