module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notice', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    province: {
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
    },
    image_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,500]
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  });
}
