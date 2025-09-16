const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  imagem: { type: String, required: true } // agora está separado corretamente
});

module.exports = mongoose.model("Produto", ProdutoSchema);
