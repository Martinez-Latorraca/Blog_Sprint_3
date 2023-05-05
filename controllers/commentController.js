const { Article, Comment } = require("../models");

async function show(req, res) {}
// Store a newly created resource in storage.
async function store(req, res) {
  const comments = await Comment.create({
      fullname: req.body.fullname,
      content: req.body.content,
      articleId: req.body.id
  });
  console.log(res);
  res.redirect(201, `/articulos/${comments.articleId}`)
}

module.exports = {
  show,
  store,
};
