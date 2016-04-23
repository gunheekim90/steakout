/*
* This model represents a single review left by customer on the main page
* The reason why we included the "phone_number" attribute was so that
* upon review of the message of the review in the backoffice, the admin
* could send a coupon to the customer via text message 
*/

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
