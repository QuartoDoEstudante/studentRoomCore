const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// Configuração do multer
const MULTER = {
  // Destino dos arquivos
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");

      const fileName = `${fileHash}-${file.originalname}`;
      // Primeiro parâmetro é o erro, como não tem, passa null
      return callback(null, fileName);
    },
    
  }),
  limits: { files: 5 }
}

module.exports ={
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER
}