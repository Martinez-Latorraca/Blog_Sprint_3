const { Permission } = require("../models");

module.exports = async () => {
  const aux = [
    process.env.PERMISSION_CREATE_ARTICLE,
    process.env.PERMISSION_UPDATE_ARTICLE,
    process.env.PERMISSION_DELETE_ARTICLE,
    process.env.PERMISSION_CREATE_COMMENT,
    process.env.PERMISSION_UPDATE_COMMENT,
    process.env.PERMISSION_DELETE_COMMENT,
  ];
  const permissions = [];

  aux.forEach((permission) => {
    permissions.push({ permission: permission });
  });
  await Permission.bulkCreate(permissions);

  await



  console.log("[Database] Se corrió el seeder de Permissions.");
};
