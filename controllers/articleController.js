const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articleList = await Article.findAll({ include: "user" });
  res.render("home", {
    articleList,
    format,
    es,
  });
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const comments = await Comment.findAll({ where: { articleId: id }, include: "article" });
  const singleArticle = await Article.findByPk(id, { include: "user" });
  res.render("article", {
    singleArticle,
    id,
    comments,
    format,
    es,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("adminCreate");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, firstname, lastname, content } = fields;
    await User.create({
      firstname,
      lastname,
    });
    const user = await User.findOne({
      where: {
        firstname: `${firstname}`,
      },
      where: {
        lastname: `${lastname}`,
      },
    });
    const userId = user.id;

    await Article.create({
      title,
      content,
      image: files["image"].newFilename,
      userId,
    });
  });
  return res.redirect("/articulos");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const id = req.params.id;
  const singleArticle = await Article.findByPk(id, { include: "user" });
  res.render("adminEdit", { singleArticle, id });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, content } = fields;
    const { id } = req.params;
    const result = await Article.update(
      {
        title: title,
        content: content,
        image: files["image"].newFilename,
      },
      { where: { id: id } },
    );
  });
  return res.redirect("/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const { id } = req.params;
  const results = await Article.destroy({ where: { id: id } });
  console.log(`Se borraron: ${results.affectedRows} filas`);
  res.redirect(200, "/articulos");
}

async function showAdmin(req, res) {
  const adminList = await Article.findAll({ include: "user" });

  res.render("admin", {
    adminList,
    format,
  });
}

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
  showAdmin,
};

/* 
const { title, authorFirst, content, image } = req.body;
  const user = await User.findOne({
    where: {
      firstname: authorFirst,
    },
  });
  const userId = user.id;
  const result = await Article.update(
    {
      title,
      content,
      image,
      userId,
    },
    {
      where: {
        id: req.params.id,
      },
    },
    { include: "user" },
  );
  */
