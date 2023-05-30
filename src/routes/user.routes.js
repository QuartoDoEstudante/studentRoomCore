const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UserController = require("../controllers/UserController");
const UserAvatarController = require("../controllers/UserAvatarController");
const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const userRoutes = Router()

const upload = multer(uploadConfig.MULTER);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/create", userController.create);
userRoutes.put("/update", ensureAuthenticated, userController.update);

//carregando imagem do usuario em um arquivo temporario 
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = userRoutes;


