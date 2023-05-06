const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", articleController.create);
router.post("/", articleController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", articleController.edit);
router.post("/:id/editar", articleController.update);
router.get("/eliminar/:id", articleController.destroy);

module.exports = router;
