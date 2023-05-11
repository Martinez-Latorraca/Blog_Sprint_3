const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");

// Rutas relacionadas al panel de control (Admin):
// ...
router.get("/", ensureAuthenticated, adminController.show);
router.get("/api/articulos", ensureAuthenticated, articleController.showApi);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/crear", ensureAuthenticated, articleController.store);
router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.post("/:id/editar", ensureAuthenticated, articleController.update);
router.get("/eliminar/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
