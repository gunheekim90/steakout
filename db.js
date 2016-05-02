var Sequelize = require('sequelize');

// if running on Heroku, env = "production", otherwise it will be "development"
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresl',
  });
} else {
  sequelize = new Sequelize('steakout','steakout','qortkdgns', {
    host :'steakout.crumgltvdqqx.ap-northeast-2.rds.amazonaws.com',
    dialect : 'mysql',
    port : 3306
  });
}

/*
subscription
  id email subscribed

review
  id name phone_number message

notice_board
  id title message date province city longitude latitude image_address
*/

var db = {};

db.subscription = sequelize.import(__dirname + '/models/subscription.js');
db.review = sequelize.import(__dirname + '/models/review.js');
db.notice = sequelize.import(__dirname + '/models/notice.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
