const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const Comment = require("./Comment");
const Article = require("./Article");
const User = require("./User");

Comment.initModel(sequelize);
Article.initModel(sequelize);
User.initModel(sequelize);

Article.belongsTo(User);
Article.hasMany(Comment);
Comment.belongsTo(Article);

module.exports = {
  sequelize,
  Comment,
  Article,
  User,
};
