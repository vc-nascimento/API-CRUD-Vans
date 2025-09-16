const Usuario = require("../models/usuario")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ message: "Email já cadastrado" });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = new Usuario({ nome, email, senha: senhaCriptografada });
    await usuario.save();

    // Envio de e-mail de boas-vindas
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Estoque Vans" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Bem-vindo ao Estoque Vans 🏁",
      text: `Olá ${nome}, seu cadastro foi realizado com sucesso!`,
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
