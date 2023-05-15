/*const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const roles = [];
  const roleDescriptions = ["Admin", "Editor", "Writer", "Reader"];
  const roleCodes = [100, 200, 300, 400];

  for (let i = 0; i < 4; i++) {
    const randomIndex = i % 4; // Obtener el índice del rol y código correspondiente
    const role = roleDescriptions[randomIndex];
    const code = roleCodes[randomIndex];
    roles.push({
      roleCode: code,
      roleDescription: role,
    });
  }

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};*/
