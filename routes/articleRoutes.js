const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/:id", articleController.show);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/", ensureAuthenticated, articleController.store);
router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.post("/:id/editar", ensureAuthenticated, articleController.update);
router.get("/eliminar/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
