const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const aux = [process.env.IS_WRITER, process.env.IS_EDITOR, process.env.IS_ADMIN];
  const roles = [];

  aux.forEach((role) => {
    roles.push({ role: role });
  });

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
