const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

async function show(req, res) {
  const articleList = await Article.findAll({
    include: [User, Comment],
    sort: ["createdAt", "DESC"],
  });
  articleList &&
    articleList.forEach((article) => {
      article.dataValues.createdAt = format(
        article.dataValues.createdAt,
        "yyyy'-'MM'-'dd hh:mm:ss",
        {
          locale: es,
        },
      );
    });
  return res.render("admin", { articleList });
}

module.exports = {
  show,
};
