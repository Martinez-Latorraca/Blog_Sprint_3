const { Comment } = require("../models");

async function store(req, res) {
  const comments = await Comment.create({
    fullname: req.body.fullname,
    content: req.body.content,
    articleId: req.body.id,
  });

  res.redirect(`/articulos/${comments.articleId}`);
}

module.exports = {
  store,
};
