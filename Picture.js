const mongoose = require("mongoose");

const PictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  preco: {
    type: Number,
    required: true
  },
  estoque: {
    type: Number,
    required: true
  },
  src: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Picture", PictureSchema);
