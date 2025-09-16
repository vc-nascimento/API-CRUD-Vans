const express = require("express");
const router = express.Router();
const ProdutoController = require("../controllers/ProdutoController");
const upload = require("../config/multer"); // ✅ importa o multer configurado

// Rotas
router.get("/", ProdutoController.getAll);
router.get("/:id", ProdutoController.getById);
router.post("/", upload.single("imagem"), ProdutoController.createProduto);
router.put("/:id", upload.single("imagem"), ProdutoController.updateProduto);
router.delete("/:id", ProdutoController.deleteProduto);


module.exports = router;





