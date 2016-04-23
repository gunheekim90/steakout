/*
* This model represents a single subscription to the Steakout mailing list
* The reason we included the "subscribed" attribute was to allow the customer
* to remove him or herself from the mailing list by following a url address
*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscription', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : true
    }
  });
}
