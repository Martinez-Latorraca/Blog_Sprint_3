const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pagesController");

// Rutas relacionadas a la parte pública del sitio web:
// ...
router.get("/registro", pageController.showRegister);
router.get("/login", pageController.showLogin);
/*router.post("/registro", pageController.registerUser);
router.post("/login", pageController.loginUser);
router.get("/logout", pageController.logoutUser);*/

module.exports = router;
