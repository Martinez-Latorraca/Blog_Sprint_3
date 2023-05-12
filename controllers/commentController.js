const { sendEmail } = require("../middlewares/sendEmail");
const { Comment, Article, User } = require("../models");

async function store(req, res) {
  await Comment.create({
    content: req.body.content,
    userId: req.user.id,
    articleId: req.params.id,
  });
  const article = await Article.findByPk(req.params.id, { include: User });
  const user = { name: article.user.fullname, email: article.user.email };
  sendEmail(user, req.params.id);

  res.redirect(`/articulos/${req.params.id}`);
}

module.exports = {
  store,
};
