const { Article, Comment } = require("../models");

// Display the specified resource.
async function show(req, res) {
  const comments = await Comment.findAll({ include: "article" });
  res.render("article", {
    comments,
  });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const comments = await Comment.create({
      fullname: req.body.fullname,
      comment: req.body.comment
  });
}

module.exports = {
  show,
  store,
};
