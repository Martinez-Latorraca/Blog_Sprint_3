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

async function showHome(req, res) {
  const articles = await Article.findAll({ include: "user" });
  articles.forEach((article) => {
    article.dataValues.createdAt = format(article.dataValues.createdAt, "yyyy'-'MM'-'dd hh:mm:ss", {
      locale: es,
    });
  });
  return res.render("home", { articles });
}

async function showSignUp(req, res) {
  const message = "";
  return res.render("signup", { message });
}
async function showLogin(req, res) {
  return res.render("login");
}

module.exports = {
  showHome,
  showSignUp,
  showLogin,
};
