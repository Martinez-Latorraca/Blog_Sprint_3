const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const Comment = require("./Comment");
const Article = require("./Article");
const User = require("./User");
const Role = require("./Role");

Comment.initModel(sequelize);
Article.initModel(sequelize);
User.initModel(sequelize);
Role.initModel(sequelize);

User.hasMany(Article);
User.hasMany(Comment);
Article.hasMany(Comment);
Article.belongsTo(User);
Comment.belongsTo(Article);
Comment.belongsTo(User);
User.belongsTo(Role); // roles
Role.hasMany(User);

module.exports = {
  sequelize,
  Comment,
  Article,
  User,
  Role,
};
