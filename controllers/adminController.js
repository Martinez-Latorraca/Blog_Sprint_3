const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");


async function show(req, res) {
  const articleList = await Article.findAll({ include: "user" });
    return res.render("admin", {
    articleList,
    format,
  });
}


module.exports = {
    show,
}