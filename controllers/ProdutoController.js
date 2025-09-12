const Produto = require("../models/Produto");
 
exports.getAll = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
};
 
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (!produto)
        return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
};
 
exports.create = async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  if (!nome, !descricao || preco == null || estoque == null) {
    return res.status(400).json({ erro: "Campos obrigatórios: nome, preco, estoque" });
  }
 
  try {
    const novoProduto = new Produto({ nome, descricao, preco, estoque });
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};
 
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const produto = await Produto.findByIdAndUpdate(id, { nome, descricao, preco, estoque }, { new: true });
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};
 
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    const produto = new Produto({ nome, descricao, preco, estoque, imagem });
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
 