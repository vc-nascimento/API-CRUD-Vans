const express = require("express");
const cors = require("cors");
require("./config/db");
 
const produtoRoutes = require("./routes/produtoRouter");
 
const app = express();
const PORT = 3000;
 
app.use(cors());
app.use(express.json());
 
app.get("/", (req, res) => {
  res.send("API CRUD de Produtos");
});
 
app.use("/produtos", produtoRoutes);
 
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

