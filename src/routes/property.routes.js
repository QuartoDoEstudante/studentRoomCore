const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const PropertyController = require("../controllers/PropertyController");
const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const propertyRoutes = Router()

const upload = multer(uploadConfig.MULTER);

const propertyController = new PropertyController();


propertyRoutes.post("/create", ensureAuthenticated, upload.array('files'), propertyController.create);
propertyRoutes.get("/show/:id", ensureAuthenticated, propertyController.show);
propertyRoutes.get("/index", propertyController.index);
propertyRoutes.delete("/delete/:id", ensureAuthenticated, propertyController.delete);


module.exports = propertyRoutes;


