const { Sequelize, DataTypes } = require("sequelize");

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
const Role = require("./Role");
const Permission = require("./Permission");

Comment.initModel(sequelize);
Article.initModel(sequelize);
Role.initModel(sequelize);
User.initModel(sequelize);
Permission.initModel(sequelize);
const permissionRole = sequelize.define("permission-role", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
});

User.hasMany(Article);
User.hasMany(Comment);
Role.hasMany(User);
User.belongsTo(Role);
Article.hasMany(Comment);
Article.belongsTo(User);
Comment.belongsTo(Article);
Comment.belongsTo(User);
Role.hasMany(Permission);
Permission.belongsToMany(Role, { through: permissionRole });

module.exports = {
  sequelize,
  Comment,
  Article,
  User,
  Role,
  Permission,
  permissionRole,
};
