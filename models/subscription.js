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
