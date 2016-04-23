var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresl',
  });
} else {
  sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-steakout-api.sqlite'
  });
}

/*
subscription
  id
  email
  subscribed

review
  id
  name
  phone_number
  message

notice_board
  id
  title
  message
  date
  province
  city
  longitude
  latitude
  image_address
*/

var db = {};

db.subscription = sequelize.import(__dirname + '/models/subscription.js');
db.review = sequelize.import(__dirname + '/models/review.js');
db.notice = sequelize.import(__dirname + '/models/notice.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
