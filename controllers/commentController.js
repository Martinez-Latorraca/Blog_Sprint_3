const { Comment } = require("../models");

async function store(req, res) {
  await Comment.create({
    fullname: req.body.fullname,
    content: req.body.content,
    userId: req.user.id,
    articleId: req.params.id,
  });

  res.redirect(`/articulos/${req.params.id}`);
}

module.exports = {
  store,
};
