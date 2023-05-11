const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

async function show(req, res) {
  const articles = await Article.findAll({
    where: { userId: req.user.id },
    include: [User, Comment],
    sort: ["createdAt", "DESC"],
  });
  articles &&
    articles.forEach((article) => {
      article.createdAt = format(article.createdAt, "yyyy'-'MM'-'dd hh:mm:ss", {
        locale: es,
      });
    });
  return res.render("admin", { articles, format, es });
}

module.exports = {
  show,
};
