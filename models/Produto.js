// models/Produto.js
const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true }
    imagem: { type: String, required: true }
});
