const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const adminController = require("../controllers/adminController");
const articleController = require("../controllers/articleController");

router.use(ensureAuthenticated.ensureAuthenticated);
router.get("/", ensureAuthenticated.isEditor, adminController.show);
router.get("/api/articulos", ensureAuthenticated.isAdmin, articleController.showApi);
router.get("/crear", ensureAuthenticated.isWriter, articleController.create);
router.post("/crear", ensureAuthenticated.isWriter, articleController.store);
router.get("/:id/editar", ensureAuthenticated.isEditor, articleController.edit);
router.post("/:id/editar", ensureAuthenticated.isEditor, articleController.update);
router.get("/eliminar/:id", ensureAuthenticated.isAdmin, articleController.destroy);

module.exports = router;
