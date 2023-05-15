const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const { sendEmail } = require("../middlewares/sendEmail");

async function show(req, res) {
  const google = process.env.GA_MEASUREMENT_ID;
  const articles = await Article.findAll({
    where: { userId: req.user.id },
    include: [User, Comment],
    sort: ["createdAt", "DESC"],
  });

  return res.render("admin", { articles, format, es, sendEmail, google });
}

module.exports = {
  show,
};
