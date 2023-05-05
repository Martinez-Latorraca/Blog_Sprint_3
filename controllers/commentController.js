const { Article, Comment } = require("../models");

// Display the specified resource.
async function show(req, res) {
  const comments = await Comment.findAll({where: { articleId: req.body.id}},{ include: "article" });
  console.log(comments)
  res.render("article", {
    comments,
  });
}

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
