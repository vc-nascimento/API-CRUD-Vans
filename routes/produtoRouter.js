// routes/produtoRoutes.js
// routes/produtoRoutes.js
const express = require("express");
const router = express.Router();
const ProdutoController = require("../controllers/ProdutoController");

router.get("/", ProdutoController.getAll);
router.get("/:id", ProdutoController.getById);
router.post("/", ProdutoController.create);
router.put("/:id", ProdutoController.update);
router.delete("/:id", ProdutoController.remove);
router.post("/", upload.single("imagem"), ProdutoController.create);





