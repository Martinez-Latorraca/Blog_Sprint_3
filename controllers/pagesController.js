/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article } = require("../models");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const passport = require("passport");

const google = process.env.GA_MEASUREMENT_ID;

async function showHome(req, res) {
  const articles = await Article.findAll({ include: "user" });
  articles.forEach((article) => {
    article.dataValues.createdAt = format(article.dataValues.createdAt, "yyyy'-'MM'-'dd hh:mm:ss", {
      locale: es,
    });
  });
  return res.render("home", { articles, google });
}

async function showSignUp(req, res) {
  return req.user ? res.redirect("/") : res.render("signup", { google });
}
async function showLogin(req, res) {
  return req.user ? res.redirect("/") : res.render("login", { google });
}
async function facebookLogin(req, res, next) {
  console.log("logearme con facebook");
  passport.authenticate("facebook", function (err, user, info, status) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/signin");
    }
    res.redirect("/account");
  })(req, res, next);
}
async function facebookRedirect(req, res) {
  passport.authenticate("facebook", { failureRedirect: "/login" }),
    (function (req, res) {
      // Aquí puedes redirigir al usuario a la página de inicio de sesión exitosa
      console.log(req.user, "user");
      res.redirect("/");
    })(req, res);
}
async function googleLogin(req, res) {
  passport.authenticate("google"),
    function (req, res) {
      // The request will be redirected to Google for authentication, so
      // this function will not be called.
    };
}
async function googleRedirect(req, res) {
  passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    };
}

module.exports = {
  showHome,
  showSignUp,
  showLogin,
  facebookLogin,
  facebookRedirect,
  googleLogin,
  googleRedirect,
};
