const { permissionRole } = require("../models");

module.exports = async () => {
  await permissionRole.bulkCreate([
    { roleId: 1, permissionId: 1 },
    { roleId: 2, permissionId: 1 },
    { roleId: 2, permissionId: 2 },
    { roleId: 3, permissionId: 1 },
    { roleId: 3, permissionId: 2 },
    { roleId: 3, permissionId: 3 },
  ]);

  await console.log("[Database] Se corrió el seeder de PermissionsRoles.");
};
