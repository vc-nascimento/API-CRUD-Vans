const multer = require("multer");
const path = require("path");

// Define onde salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde as imagens vão ser salvas
  },
  filename: (req, file, cb) => {
    // cria um nome único para o arquivo
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // limite 2MB
});

module.exports = upload;
