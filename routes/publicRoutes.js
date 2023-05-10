const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const articleController = require("../controllers/articleController");

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/", articleController.index);
router.get("/articulos/:id", articleController.show);
router.get("/login", pageController.showLogin);
router.post("/login", authController.login);
router.get("/users/registro", pageController.showSignUp);
router.post("/users/registro", authController.signUp);
// router.get("/logout", pageController.logoutUser);

module.exports = router;
