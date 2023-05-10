const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll({
    include: [User, Comment],
    sort: ["createdAt", "DESC"],
  });

  return res.render("home", { articles, format, es });
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [User, Comment] });

  return article ? res.render("article", { article, format, es }) : res.redirect("/");
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
  const article = await Article.findByPk(id, { include: "user" });
  const users = await User.findAll();
  console.log(article);
  res.render("adminEdit", { article, id, users });
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
  const articles = await Article.findAll({ include: "user" });
  console.log(articles);
  return res.json(articles);
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
