const { Article, Comment, User } = require("../models");
const { format } = require("date-fns");
const { en } = require("date-fns/locale");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll({
    include: [User, Comment],
    sort: ["createdAt", "DESC"],
  });

  return res.render("home", { articles, format, en });
}

async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [
      { model: User },
      {
        model: Comment,
        include: { model: User, attributes: ["fullname"] },
      },
    ],
  });
  console.log(article);
  return article ? res.render("article", { article, format, en }) : res.redirect("/");
}
/*async function show(req, res) {
  const article = await Article.findByPk(
    req.params.id,
    { include: [User, Comment] },
    //{ include: [User, Comment] },
    {
      model: Comment,
      include: {
        model: User,
        attributes: ["fullname"],
      },
    },
  );
  console.log(article);
  return res.json({ article });
  //return article ? res.render("article", { article, format, es }) : res.redirect("/");
}*/

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
  if (req.user.id === article.user.id) {
    return res.render("adminEdit", { article, id });
  } else {
    return res.render("forbidden", { message: "No tienes permiso para editar este artículo" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    // si cambia la imagen, modificala en la bd si no dejar la imagen original
    const data = {
      title: fields.title,
      content: fields.content,
    };

    if (files.image.size > 0) {
      console.log(files.image.newFilename);
      data.image = files.image.newFilename;
    }

    await Article.update(data, { where: { id: req.params.id } });
  });

  return res.redirect("/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const { id } = req.params;
  const results = await Article.destroy({ where: { id: req.params.id } });
  console.log(`Se borró la fila con el id: ${id} correctamente`);
  return res.redirect("/admin");
}

async function showApi(req, res) {
  const articles = await Article.findAll({ include: "user" });

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
