const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const articleList = await Article.findAll({ include: "user" });

  res.render("home", {
    articleList,
  });
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const singleArticle = await Article.findByPk(id, { include: "user" });
  //const articleList = await Article.findAll({ include: "user" });
  console.log(singleArticle);
  res.render("article", {
    singleArticle,
    //articleList,
    //id,
  });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
