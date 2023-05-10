const { passport } = require("../config/passport");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

function login(req, res) {
  passport.authenticate("local", { failureRedirect: "/", successRedirect: "/admin" })(req, res);
}

async function signUp(req, res) {
  const [user, created] = await User.findOrCreate({
    where: {
      email: req.body.email,
      fullname: req.body.fullname,
      password: bcrypt.hashSync(req.body.password, 10),
    },
  });
  
  if (false) {
    passport.authenticate("local", {
      successRedirect: "/admin",
    })(req, res);
  } else {
    req.flash("info", "Ese usuaruio ya ha sido registrado");
    res.redirect("/users/registro");
  }
}

module.exports = { login, signUp };
