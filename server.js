const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const path = require("path");

const produtoRoutes = require("./routes/produtoRouter");
const usuarioRoutes = require("./routes/usuarioRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir imagens (uploads)
app.use("/uploads", express.static("uploads"));

// Rotas
app.get("/", (req, res) => {
  res.send("API CRUD de Produtos com Autenticação e Upload de Imagem");
});

app.use("/produtos", produtoRoutes);
app.use("/usuarios", usuarioRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
