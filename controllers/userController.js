const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const userList = await User.findAll({});
  res.json(userList);
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  await User.create({
    fullname: req.body.fullname,
    userEmail: req.body.email,
    userPass: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
  });
  res.redirect("/articulos");
}

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
