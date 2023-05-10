const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 10; i++) {
    comments.push({
      content: faker.lorem.sentence(),
      articleId: faker.datatype.number({ min: 1, max: 10 }),
      userId: faker.datatype.number({ min: 1, max: 10 }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
