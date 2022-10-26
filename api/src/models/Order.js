const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      stocks: {
        type: DataTypes.JSON, //ARRAY(DataTypes.JSON)
        allowNull: false,
      },
      contactAdress: {
        type: DataTypes.JSON, //ARRAY(DataTypes.JSON)
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      idpurchase: {
        type: DataTypes.STRING,
      },
      stateOrder:{
        type: DataTypes.ENUM('Created', 'Paid', 'Dispatched')
      }
    }
    // {
    //   timestamps: false,
    // }
  );
};
