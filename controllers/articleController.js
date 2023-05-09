const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articleList = await Article.findAll({ include: "user" });
  return res.render("home", {
    articleList,
    format,
    es,
  });
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const comments = await Comment.findAll({
    where: { articleId: id },
    include: "article",
    order: [["createdAt", "DESC"]],
  });
  const singleArticle = await Article.findByPk(id, { include: "user" });
  return res.render("article", {
    singleArticle,
    id,
    comments,
    format,
    es,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("adminCreate");
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
  const users = await User.findAll();
  console.log(singleArticle);
  res.render("adminEdit", { singleArticle, id, users });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { title, content, userId } = fields;
    const { id } = req.params;
    const image = files["image"].newFilename;
    const result = await Article.update(
      {
        title,
        content,
        image,
        userId,
      },
      { where: { id: id } },
    );
  });

  return res.redirect("/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const { id } = req.params;
  const results = await Article.destroy({ where: { id: id } });
  console.log(`Se borró la fila con el id: ${id} correctamente`);
  return res.redirect("/admin");
}

async function showApi(req, res) {
  const articleList = await Article.findAll({ include: "user" });
  console.log(articleList);
  return res.json(articleList);
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
  showApi,
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
