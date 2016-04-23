/*
* This model represents a single entry on the Steakout notice_board
* A single notice will contain the rough location of where the Steakout truck
* will be that day, on what date, and the longitude/latitude location of the
* truck so that we can create a pin on Google maps
*/

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
