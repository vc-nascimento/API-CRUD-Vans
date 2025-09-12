const Picture = require("../models/Picture");
const path = require("path");

module.exports = {
  async index(req, res) {
    try {
      const pictures = await Picture.find();
      return res.json(pictures);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async create(req, res) {
    try {
      const { name, descricao, preco, estoque } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Imagem é obrigatória" });
      }

      const picture = await Picture.create({
        name,
        descricao,
        preco,
        estoque,
        src: req.file.path.replace("\\", "/")
      });

      return res.json(picture);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, descricao, preco, estoque } = req.body;

      let updateData = { name, descricao, preco, estoque };

      if (req.file) {
        updateData.src = req.file.path.replace("\\", "/");
      }

      const picture = await Picture.findByIdAndUpdate(id, updateData, { new: true });

      if (!picture) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      return res.json(picture);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const picture = await Picture.findByIdAndDelete(id);

      if (!picture) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      return res.json({ message: "Produto excluído com sucesso" });
    } catch (err) {
      return res.status(500).json({ error: "Erro ao excluir produto" });
    }
  }
};
