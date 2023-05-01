const fs = require("fs");
const path = require("path");
const uploadConfig = require("../config/upload");

class diskStorage {
   
  async SaveFile(file) {

    //mover o arquivo da pasta tmp para a pasta uploads
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }


  async DeleteFile(file) {

    const filePath = path.resolve(uploadConfig.uploadFolder, file);

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