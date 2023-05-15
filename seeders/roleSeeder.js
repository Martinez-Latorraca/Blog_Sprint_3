const { Role } = require("../models");

module.exports = async () => {
  const roles = [
    {
      name: "Administrator",
      description: "CRUD of any entity, including delete users.",
    },

    {
      name: "Editor",
      description:
        "Can edit any article, also edit/delete any comment. Can not delete others articles.",
    },

    {
      name: "Writer",
      description: "CRUD of its own articles.",
    },

    {
      name: "Reader",
      description: "Can comment on any article.",
    },
  ];

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
