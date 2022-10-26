const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "calendar",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      time: {
        type: DataTypes.ENUM("8", "9", "10", "11", "12", "13", "14", "15", "16", "17", '18'),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
      }
    },
    {
      timestamps: false,
    }
  );
};
