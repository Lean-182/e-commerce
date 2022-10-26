const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moreInfo: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
