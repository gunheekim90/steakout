module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,500]
      }
    }
  });
}
