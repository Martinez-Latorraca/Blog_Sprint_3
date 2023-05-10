const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const pageController = require("../controllers/pagesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas relacionadas a los usuarios:
// ...

router.get("/", userController.index);
router.get("/crear", userController.create);
router.post("/", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", ensureAuthenticated, userController.edit);
router.patch("/:id", ensureAuthenticated, userController.update);
router.delete("/:id", ensureAuthenticated, userController.destroy);
router.get("/login", pageController.showLogin);
router.post("/login", authController.login);
router.get("/registro", pageController.showRegister);

/*router.post("/home/registro", pageController.registerUser);
router.get("/logout", pageController.logoutUser);*/

module.exports = router;
