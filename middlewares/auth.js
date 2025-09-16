const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
