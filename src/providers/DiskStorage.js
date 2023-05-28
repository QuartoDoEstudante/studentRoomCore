const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
   
  async saveFile(file) {

    //mover o arquivo da pasta tmp para a pasta uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    );

    return file;
  }


  async deleteFile(file) {

    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try{
      //verificar se o arquivo existe
      //se não existir, não faz nada, pois é lançado um erro
      await fs.promises.stat(filePath);
    } catch {
      return
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;