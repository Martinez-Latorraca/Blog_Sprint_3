const { passport } = require("../config/passport");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

function login(req, res) {
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/admin",
    failureFlash: req.flash("info", "Incorrect credentials, try again. "),
  })(req, res);
}

async function signUp(req, res) {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    req.flash("info", "Ese usuario ya ha sido registrado");
    return res.redirect("/users/registro");
  } else {
    const newUser = await User.create({
      email: req.body.email,
      fullname: req.body.fullname,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    req.login(newUser, () => {
      return res.redirect("/admin");
    });
  }
}

async function logOut(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
}

module.exports = { login, signUp, logOut };
