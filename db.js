var Sequelize = require('sequelize');

// if running on Heroku, env = "production", otherwise it will be "development"
var env = process.env.NODE_ENV || 'development';
var sequelize;

// TEST CODE - DO NOT PUSH TO AWS /////////////////////////////////////
if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresl',
  });
} else {
  //if we have db account, shoud we put the account in this line??
  sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-steakout-api.sqlite'
  });
}
//////////////////////////////////////////////////////////////////////////




// if (env === 'production') {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgresl',
//   });
// } else {
//   sequelize = new Sequelize('steakout','steakout','qortkdgns', {
//     host :'steakout.crumgltvdqqx.ap-northeast-2.rds.amazonaws.com',
//     dialect : 'mysql',
//     port : 3306
//   });
// }

var db = {};

db.subscription = sequelize.import(__dirname + '/models/subscription.js');
db.review = sequelize.import(__dirname + '/models/review.js');
db.notice = sequelize.import(__dirname + '/models/notice.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
