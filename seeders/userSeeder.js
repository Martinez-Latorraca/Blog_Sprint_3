const { faker } = require("@faker-js/faker");
const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const roles = await Role.findAll();

  const users = [];

  for (let i = 0; i < 10; i++) {
    const randomRoleIndex = Math.floor(Math.random() * roles.length);
    const randomRole = roles[randomRoleIndex];

    users.push({
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(process.env.SESSION_CREDENTIAL, 10),
      roleId: randomRole.id,
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
