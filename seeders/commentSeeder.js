const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 10; i++) {
    comments.push({
      fullname: faker.name.firstName(),
      content: faker.lorem.sentence(), 
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};